// db.js - Chrome插件专用 IndexedDB封装 (✅ 已修改：创建任务返回【自增唯一ID】，完整版，直接复制替换)
export const TaskIndexedDB = (() => {
  const DB_CONFIG = {
    dbName: 'task_torrent_image_db',
    version: 1,
    tables: {
      torrentTask: 'torrent_task_store',
      torrent: 'torrent_store',
      imageTask: 'image_task_store',
      image: 'image_store'
    }
  }
  let db = null

  const init = () => {
    return new Promise((resolve, reject) => {
      if (!indexedDB) return reject('当前环境不支持IndexedDB')
      if (db) return resolve(db)
      const request = indexedDB.open(DB_CONFIG.dbName, DB_CONFIG.version)

      request.onupgradeneeded = e => {
        db = e.target.result
        const { tables } = DB_CONFIG
        // 种子任务表 - 主键id 👉 自动自增、数字、唯一、从1开始递增
        !db.objectStoreNames.contains(tables.torrentTask) &&
          db.createObjectStore(tables.torrentTask, { keyPath: 'id', autoIncrement: true })
        // 种子表 - 主键id 👉 手动传入 gid-tid 格式字符串，唯一
        !db.objectStoreNames.contains(tables.torrent) && db.createObjectStore(tables.torrent, { keyPath: 'id' })
        // 图片任务表 - 主键taskId 👉 自动自增、数字、唯一、从1开始递增
        !db.objectStoreNames.contains(tables.imageTask) &&
          db.createObjectStore(tables.imageTask, { keyPath: 'taskId', autoIncrement: true })
        // 图片表 - 主键id 👉 手动传入 gid-tid 格式字符串，唯一
        !db.objectStoreNames.contains(tables.image) && db.createObjectStore(tables.image, { keyPath: 'id' })
      }

      request.onsuccess = e => {
        db = e.target.result
        resolve(db)
      }
      request.onerror = e => reject(`数据库连接失败: ${e.target.error.message}`)
    })
  }

  // ========== 种子任务表 torrentTaskStore ==========
  const torrentTaskStore = {
    /**
     * ✅ 修改核心：创建种子任务 → 返回【自动生成的唯一自增ID】(数字类型，如1、2、3...)
     * 可重复插入，ID永远唯一自增，从1开始，前端创建后可拿到ID用于后续更新
     */
    createTask: (plan = {}) =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const task = {
              status: plan.status || 'progress',
              params: plan.params || {},
              createTime: plan.createTime || Date.now(),
              completeTime: plan.completeTime || 0,
              completedCount: plan.completedCount || 0,
              skipCount: plan.skipCount || 0
            }
            const req = db
              .transaction(DB_CONFIG.tables.torrentTask, 'readwrite')
              .objectStore(DB_CONFIG.tables.torrentTask)
              .add(task)
            req.onsuccess = () => resolve(req.result) // ✅ 关键修改：返回自动生成的自增ID
            req.onerror = e => reject(e.target.error.message)
          })
      ),
    getTaskList: (page = 1, pageSize = 10) =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const store = db
              .transaction(DB_CONFIG.tables.torrentTask, 'readonly')
              .objectStore(DB_CONFIG.tables.torrentTask)
            store.count().onsuccess = e => {
              const total = e.target.result,
                offset = (page - 1) * pageSize,
                list = []
              store.openCursor(null, 'prev').onsuccess = ev => {
                const cursor = ev.target.result
                cursor
                  ? (cursor.key > offset && list.length < pageSize && list.push(cursor.value), cursor.continue())
                  : resolve({ total, list })
              }
            }
            store.onerror = e => reject(e.target.error.message)
          })
      ),
    updateTask: (taskId, data = {}) =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const store = db
              .transaction(DB_CONFIG.tables.torrentTask, 'readwrite')
              .objectStore(DB_CONFIG.tables.torrentTask)
            store.get(taskId).onsuccess = e => {
              const task = e.target.result
              if (!task) return reject(`种子任务ID【${taskId}】不存在`)
              task.completedCount += Number(data.completedCountAdd) || 0
              task.skipCount += Number(data.skipCountAdd) || 0
              data.status && (task.status = data.status)
              data.completeTime && (task.completeTime = data.completeTime)
              store.put(task).onsuccess = () => resolve(true)
            }
            store.onerror = e => reject(e.target.error.message)
          })
      ),
    clearData: () =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const req = db
              .transaction(DB_CONFIG.tables.torrentTask, 'readwrite')
              .objectStore(DB_CONFIG.tables.torrentTask)
              .clear()
            req.onsuccess = () => resolve(true)
            req.onerror = e => reject(e.target.error.message)
          })
      )
  }

  // ========== 种子表 torrentStore ==========
  const torrentStore = {
    createTorrent: (plan = {}) =>
      init().then(async db => {
        const isExist = await torrentStore.isTorrentExist(plan.id)
        if (isExist) return false
        return new Promise((resolve, reject) => {
          const torrent = {
            id: plan.id,
            name: plan.name,
            createTime: plan.createTime || Date.now(),
            // link: plan.link || '',
            // cover: plan.cover || '',
            // date: plan.date || '',
            // pages: plan.pages || ''
          }
          const req = db
            .transaction(DB_CONFIG.tables.torrent, 'readwrite')
            .objectStore(DB_CONFIG.tables.torrent)
            .add(torrent)
          req.onsuccess = () => resolve(true)
          req.onerror = e => reject(e.target.error.message)
        })
      }),
    getTorrentList: (page = 1, pageSize = 10, taskId = '', name = '') =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const store = db.transaction(DB_CONFIG.tables.torrent, 'readonly').objectStore(DB_CONFIG.tables.torrent)
            store.count().onsuccess = e => {
              const total = e.target.result,
                offset = (page - 1) * pageSize,
                list = []
              store.openCursor(null, 'prev').onsuccess = ev => {
                const cursor = ev.target.result
                if (cursor) {
                  const item = cursor.value
                  const matchTaskId = !taskId || item.id.includes(taskId)
                  const matchName = !name || item.name.indexOf(name) > -1
                  matchTaskId && matchName && cursor.key > offset && list.length < pageSize && list.push(item)
                  cursor.continue()
                } else resolve({ total, list })
              }
            }
            store.onerror = e => reject(e.target.error.message)
          })
      ),
    isTorrentExist: id =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const req = db
              .transaction(DB_CONFIG.tables.torrent, 'readonly')
              .objectStore(DB_CONFIG.tables.torrent)
              .get(id)
            req.onsuccess = () => resolve(!!req.result)
            req.onerror = e => reject(e.target.error.message)
          })
      ),
    clearData: () =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const req = db
              .transaction(DB_CONFIG.tables.torrent, 'readwrite')
              .objectStore(DB_CONFIG.tables.torrent)
              .clear()
            req.onsuccess = () => resolve(true)
            req.onerror = e => reject(e.target.error.message)
          })
      ),
       getTotalCount: () =>
    init().then(
      db =>
        new Promise((resolve, reject) => {
          const req = db
            .transaction(DB_CONFIG.tables.torrent, 'readonly')
            .objectStore(DB_CONFIG.tables.torrent)
            .count()
          req.onsuccess = () => resolve(req.result)
          req.onerror = e => reject(e.target.error.message)
        })
    )
  }

  // ========== 图片任务表 imageTaskStore ==========
  const imageTaskStore = {
    /**
     * 可重复插入，taskId永远唯一自增，从1开始，前端创建后可拿到ID用于后续更新
     */
    createTask: (plan = {}) =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const task = {
              id: plan.id,
              name: plan.name,
              status: plan.status || 'progress',
              params: plan.params || {},
              createTime: plan.createTime || Date.now(),
              completeTime: plan.completeTime || 0,
              completedCount: plan.completedCount || 0,
              skipCount: plan.skipCount || 0
            }
            const req = db
              .transaction(DB_CONFIG.tables.imageTask, 'readwrite')
              .objectStore(DB_CONFIG.tables.imageTask)
              .add(task)
            req.onsuccess = () => resolve(req.result) // ✅ 关键修改：返回自动生成的自增taskId
            req.onerror = e => reject(e.target.error.message)
          })
      ),
    getTaskList: (page = 1, pageSize = 10, id = '', name = '') =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const store = db.transaction(DB_CONFIG.tables.imageTask, 'readonly').objectStore(DB_CONFIG.tables.imageTask)
            store.count().onsuccess = e => {
              const total = e.target.result,
                offset = (page - 1) * pageSize,
                list = []
              store.openCursor(null, 'prev').onsuccess = ev => {
                const cursor = ev.target.result
                if (cursor) {
                  const item = cursor.value
                  const matchId = !id || item.id === id
                  const matchName = !name || item.name.indexOf(name) > -1
                  matchId && matchName && cursor.key > offset && list.length < pageSize && list.push(item)
                  cursor.continue()
                } else resolve({ total, list })
              }
            }
            store.onerror = e => reject(e.target.error.message)
          })
      ),
    updateTask: (taskId, data = {}) =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const store = db
              .transaction(DB_CONFIG.tables.imageTask, 'readwrite')
              .objectStore(DB_CONFIG.tables.imageTask)
            store.get(taskId).onsuccess = e => {
              const task = e.target.result
              if (!task) return reject(`图片任务ID【${taskId}】不存在`)
              task.completedCount += Number(data.completedCountAdd) || 0
              task.skipCount += Number(data.skipCountAdd) || 0
              data.status && (task.status = data.status)
              data.completeTime && (task.completeTime = data.completeTime)
              store.put(task).onsuccess = () => resolve(true)
            }
            store.onerror = e => reject(e.target.error.message)
          })
      ),
    clearData: () =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const req = db
              .transaction(DB_CONFIG.tables.imageTask, 'readwrite')
              .objectStore(DB_CONFIG.tables.imageTask)
              .clear()
            req.onsuccess = () => resolve(true)
            req.onerror = e => reject(e.target.error.message)
          })
      )
  }

  // ========== 图片表 imageStore ==========
  const imageStore = {
    createImage: (plan = {}) =>
      init().then(async db => {
        const isExist = await imageStore.isImageExist(plan.id)
        if (isExist) return false
        return new Promise((resolve, reject) => {
          const image = { id: plan.id, link: plan.link, name: plan.name, createTime: plan.createTime || Date.now() }
          const req = db.transaction(DB_CONFIG.tables.image, 'readwrite').objectStore(DB_CONFIG.tables.image).add(image)
          req.onsuccess = () => resolve(true)
          req.onerror = e => reject(e.target.error.message)
        })
      }),
    getImageList: (page = 1, pageSize = 10, taskId = '', name = '') =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const store = db.transaction(DB_CONFIG.tables.image, 'readonly').objectStore(DB_CONFIG.tables.image)
            store.count().onsuccess = e => {
              const total = e.target.result,
                offset = (page - 1) * pageSize,
                list = []
              store.openCursor(null, 'prev').onsuccess = ev => {
                const cursor = ev.target.result
                if (cursor) {
                  const item = cursor.value
                  const matchTaskId = !taskId || item.id.includes(taskId)
                  const matchName = !name || item.name.indexOf(name) > -1
                  matchTaskId && matchName && cursor.key > offset && list.length < pageSize && list.push(item)
                  cursor.continue()
                } else resolve({ total, list })
              }
            }
            store.onerror = e => reject(e.target.error.message)
          })
      ),
    isImageExist: id =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const req = db.transaction(DB_CONFIG.tables.image, 'readonly').objectStore(DB_CONFIG.tables.image).get(id)
            req.onsuccess = () => resolve(!!req.result)
            req.onerror = e => reject(e.target.error.message)
          })
      ),
    clearData: () =>
      init().then(
        db =>
          new Promise((resolve, reject) => {
            const req = db.transaction(DB_CONFIG.tables.image, 'readwrite').objectStore(DB_CONFIG.tables.image).clear()
            req.onsuccess = () => resolve(true)
            req.onerror = e => reject(e.target.error.message)
          })
      )
  }

  return { torrentTask: torrentTaskStore, torrent: torrentStore, imageTask: imageTaskStore, image: imageStore }
})()

// 1. 创建种子任务
// {type:'DB',payload:{module:'torrentTask',action:'createTask',data:{params:{gid:1,tid:2}}}

// 2. 分页查询种子任务 (第1页，每页10条)
// {type:'DB',payload:{module:'torrentTask',action:'getTaskList',data:[1,10]}

// 3. 更新种子任务：累加完成数2、跳过数1，更新状态为完成 (taskId=1)
// {type:'DB',payload:{module:'torrentTask',action:'updateTask',data:[1,{completedCountAdd:2,skipCountAdd:1,status:'completed'}]}

// 4. 判断种子是否存在 (id='gid-tid')
// {type:'DB',payload:{module:'torrent',action:'isTorrentExist',data:'123-456'}

// 5. 创建种子 (不可重复)
// {type:'DB',payload:{module:'torrent',action:'createTorrent',data:{id:'123-456',name:'测试种子'}}

// 6. 分页查询图片列表 + 筛选taskId + 搜索名称
// {type:'DB',payload:{module:'image',action:'getImageList',data:[1,10,'123','测试']}

// 7. 清空所有图片数据
// {type:'DB',payload:{module:'image',action:'clearData'}

// 8. 判断图片是否存在
// {type:'DB',payload:{module:'image',action:'isImageExist',data:'789-000'}}
