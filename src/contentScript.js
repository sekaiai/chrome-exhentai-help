'use strict'

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')?.[0]?.innerHTML
console.log(`Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`)

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.'
    }
  },
  response => {
    console.log(response.message)
  }
)

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`)
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({})
  return true
})

// 1. 监听页面滚动，返回是否达到底部。
// #djumpbox 首页底部分页

const doms = {
  // 定义所有分页数据, https://exhentai.org/
  home: {
    contentTable: '.gltm', //首页内容，表格显示
    contentBody: '.itg', //首页内容body
    torrentLink: '.gldown', //首页下载种子图标
    bottomNext: '#dnext', //首页底部下一页
    topNext: '#unext' //首页顶部下一页
  },
  // 图片详情列表, https://exhentai.org/g/2374482/33d2ec5afc/
  g: {
    topNav: '.ptt', //顶不分页
    bottomNav: '.ptb', //底部分页
    currentPage: '.ptds', //选中的分页
    ctx: '.itg' //列表内容的容器
  },
  //内容大图查看页, https://exhentai.org/s/d1c20fcadc/2374482-1
  s: {
    pt: '#i2',
    pb: '#i4',
    ps: '#next',
    ctx: '#i3'
  }
}

// 需要加载下载按钮的页面
const includePath = ['^/$', '^/watched', '^/favorites', '^/torrents', '^/uploader', '^/popular']
// 需要自动加载下一页的页面
const autoLoadPath = ['^/$', '^/watched$', '^/favorites.php$', '^/g/', '^/s/', '^/tag/']

// 是否支持 GM_download方法, 主要检查白名单
let isSupportGM_download = true

// ========== 批量下载 start ========================================
// pending, downloading, pause
let downloadAllStatus = 'pending'
createDownloadButton()
// 创建批量下载按钮
function createDownloadButton() {
  const { pathname } = document.location

  if (includePath.some(e => new RegExp(e).test(pathname))) {
    const btn = document.createElement('input')
    btn.type = 'button'
    btn.id = 'btn-download'
    btn.value = 'Download All Torrents'
    btn.addEventListener('click', downloadAllTorrents)

    const form = document.querySelector('form')

    if (form) {
      const buttons = form.querySelectorAll("input[type='button']")
      if (!buttons.length) {
        return
      }
      const dom = buttons[buttons.length - 1]
      dom.parentNode.insertBefore(btn, dom.nextElementSibling)
    } else {
      const dom = document.querySelector('#toppane')
      const div = document.createElement('div')
      div.style = 'text-align:center'
      div.appendChild(btn)
      dom.append(div)
    }
  }
}

// 开始批量下载种子
async function downloadAllTorrents() {
  openModal({ title: `下载种子`, content: true })

  const links = new Set()

  // 1. 先获取本页所有连接
  await selectorAllTorrentLinks(document, links)

  let nextPage = document.querySelector('#unext')
  while (nextPage) {
    let url = nextPage.href
    let page = nextPage.innerText

    _popup.appendContent(`【获取第 ${page} 页数据... <a target='_blank' href='${url}'>${url}</a>`)

    const ctx = await fetchContent(url)
    await selectorAllTorrentLinks(ctx, links)

    nextPage = ctx.querySelector('#unext')
  }
  _popup.appendContent(`【下载完毕，请刷新页面】`)
}

async function selectorAllTorrentLinks(dom, links) {
  // dom?.querySelectorAll(doms.homeTorrentDownLink).forEach(e => e.children[0]?.href && links.add(e.children[0]?.href))

  //  1.正在下载当前页
  // _popup.appendContent(`<b>【开始下载】</b>`)

  // 获取所有下载链接(打开iframe的链接)
  let urls = []

  // 种子下载页面没有下载图标
  const inTorrentsPage = /^\/torrents/.test(location.pathname)
  if (inTorrentsPage) {
    urls = Array.from(dom.querySelector('.itg').querySelectorAll('a[rel="nofollow"]')).map(e =>
      e.href?.replace(/&gtid=\d+/, '')
    )
  } else {
    urls = Array.from(dom.querySelector('.itg').querySelectorAll('.gldown > a')).map(e => e?.href)
  }

  const iframe = createIframe('iframe-download-all')
  for (let i = 0; i < urls.length; i++) {
    if (urls[i]) {
      await onLoadIframe(iframe, urls[i])

      // 获取页面所有种子列表(每个种子对应一个form)
      const forms = iframe.contentDocument.querySelectorAll('form')

      // 选取出时间最新的种子
      let latest = { date: 0 }
      // 获取文件名
      latest.title = iframe.contentDocument.querySelector('h1').innerText
      _popup.appendContent(`> ${latest.title}`)

      forms.forEach(e => {
        // 第一个td就是时间
        let dateTxt = e.querySelector('td > span:last-child')?.textContent
        let dateTime = new Date(dateTxt).getTime()
        // 只有一个a标签
        let a = e.querySelector('a')
        // 选取时间最新的
        if (a && latest.date < dateTime) {
          latest = {
            date: dateTime,
            torrent: a.href,
            name: a.innerText + '.torrent'
          }
        }
      })

      /**
       * 开始下载种子, 记录每个种子的下载情况
       * 下载链接好像是固定的, 那么可以先把下载链接导出来, 然后在异步或多线程一个慢慢下载。
       * 文件名
       * 内容链接
       * 下载状态
       */
      // 获取链接
      // https://exhentai.org/g/2294780/b1432b108f/
      // https://exhentai.org/gallerytorrents.php?gid=2294780&t=b1432b108f
      const [, gid, , t] = iframe.contentDocument.location.search.match(/([0-9A-Za-z]+)/g)
      latest.link = `https://exhentai.org/g/${gid}/${t}`
      // console.log(latest)

      downloadFile(latest.torrent, latest.name)
      await asyncTimeout(1000)
    }
  }
}

function downloadFile(url, name = '') {
  chrome.runtime.sendMessage({
    type: 'DOWNLOAD',
    payload: { url, name }
  })

  // downloadALink(url, name)
}

// 通过a标签下载文件
function downloadALink(href, name = '') {
  let link = document.createElement('a')
  link.download = name

  if (typeof href === 'string') {
    link.href = href
  } else {
    link.href = URL.createObjectURL(href)
  }
  link.click()
  URL.revokeObjectURL(link)
}

function asyncTimeout(timer = 3000) {
  return new Promise(resolve => setTimeout(() => resolve(), timer))
}

// 加载iframe, 加载完毕后返回
function onLoadIframe(iframe, src) {
  return new Promise(resolve => {
    iframe.src = src
    iframe.onload = () => resolve()
  })
}
// 在页面上创建一个iframe
function createIframe(id) {
  let iframe = document.querySelector(`#${id}`)
  if (iframe) {
    return iframe
  }

  iframe = document.createElement('iframe')
  iframe.id = id
  iframe.width = 0
  iframe.height = 0
  iframe.style.display = 'none'
  document.body.append(iframe)
  return iframe
}
// ========== 批量下载 end ========================================

// ========== 批量下载原图 end ========================================

// 详情页缩略图列表
if (new RegExp('^/g/').test(location.pathname)) {
  initDownloadFullImage()
}

// 设置自动加载
function toggleAutoLoad(page) {}

// 插入按钮
function initDownloadFullImage() {
  const css = `
      .custom-btn{
        width: auto !important;
        cursor: pointer;
        padding: 3px 6px !important;
        float: none;
        display: inline-block;
        font-weight: 400;
        font-size:10pt;
      }
      .custom-btn + .custom-btn{margin-left: 12px;}
    `
  insertStyle(css)

  const btn = document.createElement('div')
  btn.setAttribute('class', 'tha nosel custom-btn')
  btn.innerText = 'Download All Image'
  btn.title = '下载全部图片'
  // btn.setAttribute('style', 'position: absolute; right: 135px;')
  btn.addEventListener('click', handleDownloadFullImage, false)

  // // 自动加载开个
  // const btnAuto = document.createElement('div')
  // btnAuto.setAttribute('class', 'tha nosel custom-btn')
  // btnAuto.innerText = 'Auto Page ON'
  // btnAuto.title = '自动加载已关闭（点击开启）'
  // // btnAuto.setAttribute('style', 'position: absolute; left: 262px;')
  // btnAuto.addEventListener('click', toggleAutoLoad, false)

  const box = document.createElement('div')
  box.style = 'text-align:center; margin-top: 4px'
  box.append(btn)

  document.querySelector('.gtb')?.appendChild(box)
}

// 全局
let _popup = {}
// param = {title, content, footer}
function openModal(param) {
  if (_popup.body) {
    delete _popup.title
    delete _popup.content
    delete _popup.footer

    _popup.body.innerHTML = ''
  } else {
    // 创建容器
    const overlay = document.createElement('div')
    overlay.style = `
        background: rgba(0,0,0,.7);
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 9;
      `
    const body = document.createElement('div')
    body.id = 'popup-body'
    body.style = `
        position: absolute;
        background: #363940;
        border-radius: 8px;
        z-index: 999;
        padding: 14px 20px;
        font-size: 16px;
        min-width: 400px;
        min-height: 120px;
        box-shadow: rgb(0 0 0) 0px 0px 12px 0px;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -30%);
        text-align: left;
      `
    _popup.overlay = overlay
    _popup.body = body
    _popup.body.addEventListener(
      'click',
      function (e) {
        e.stopPropagation()
      },
      false
    )
  }

  if (param.maskClose) {
    _popup.overlay.addEventListener('click', closeModal, false)
  } else {
    _popup.overlay.removeEventListener('click', closeModal, false)
  }

  // 插入标题容器
  if (param.title) {
    _popup.title = document.createElement('h3')

    if (typeof param.title === 'string') {
      _popup.title.innerHTML = param.title
    }

    _popup.body.appendChild(_popup.title)
  }

  // 插入内容容器
  if (param.content) {
    _popup.content = document.createElement('div')
    _popup.content.style = `padding-bottom: 20px;
        overflow-y: auto;
        max-height: 80vh;
        `
    if (typeof param.content === 'string') {
      _popup.content.innerHTML = param.content
    } else if (typeof param.content === 'object') {
      _popup.content.append(param.content)
    }
    _popup.body.appendChild(_popup.content)

    _popup.appendContent = function () {
      const els = [...arguments].map(e => createP(e))
      // console.log(els, _popup)
      _popup.content.append(...els)
      _popup.content.scrollTop = _popup.content.scrollHeight
    }
  }

  // 插入脚部
  if (param.footer) {
    _popup.footer = document.createElement('div')
    _popup.footer.style = `display: flex; padding-top: 10px;`
    if (typeof param.footer === 'object') {
      Array.isArray(param.footer) ? _popup.footer.append(...param.footer) : _popup.footer.append(param.footer)
    }
    _popup.body.appendChild(_popup.footer)
  }

  _popup.overlay.appendChild(_popup.body)
  document.body.appendChild(_popup.overlay)
}

function closeModal() {
  document.body.removeChild(_popup.overlay)
  _popup = {}
}

function insertStyle(css) {
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
}

// 点击下载按钮触发
async function handleDownloadFullImage() {
  // 1. 检查是否有种子文件
  const torrentLink = Array.from(document.querySelectorAll('#gd5 a'))?.find(e => /torrent.*\d+/i.test(e.innerText))
  const hasTorrent = torrentLink?.innerText.match(/\d+/)[0] | 0

  if (hasTorrent > 0) {
    const imgBtn = document.createElement('div')
    imgBtn.innerText = '继续下载图片'
    imgBtn.setAttribute('class', 'tha nosel custom-btn')
    imgBtn.addEventListener('click', downloadFullImage, false)

    const torrentBtn = document.createElement('div')
    torrentBtn.innerText = '下载种子文档'
    torrentBtn.setAttribute('class', 'ths nosel custom-btn')
    torrentBtn.addEventListener(
      'click',
      function (link, dom) {
        link.click()
        closeModal()
      }.bind(null, torrentLink),
      false
    )

    openModal({
      maskClose: true,
      title: '提示',
      content: `当前文档有 ${hasTorrent} 个种子文件，推荐下载种子文件。`,
      footer: [imgBtn, torrentBtn]
    })
  } else {
    downloadFullImage()
  }
}

function createP(html, tag = 'p') {
  const p = document.createElement(tag)
  p.innerHTML = html
  return p
}

// 下载图片逻辑
async function downloadFullImage() {
  openModal({ title: `下载图片：${document.querySelector('#gn')?.innerText}`, content: true })

  const errList = []
  // 2. 获取分页内容和分页连接
  const links = await fetchImageLinks()
  console.log(links)

  _popup.appendContent(`获取完成，共获取到${links.size}条数据`, `<b>【准备开始下载】</b>`)
  // 3. 开始下载
  for (let item of links) {
    const ctx = await fetchContent(item)
    const title = Array.from(ctx.querySelectorAll('#i2 > div'))?.pop()?.innerText
    const name = location.pathname.match(/g\/(\d+)/)?.[1] + ' - ' + title?.split('::')[0].replace(' ', '', 'g')
    const link = ctx.querySelector('#i6 > div:last-child a')?.href

    _popup.appendContent(`下载 ${name}...`)

    // 如果没有大图就下载在页面上的图片
    if (!link) {
      errList.push(item)
      _popup.appendContent(`下载失败 ${name}... <a target='_blank' href='${item}'>${item}</a>`)
      continue
    }

    // chrome.runtime.sendMessage({
    //   type: 'NEWTAB',
    //   payload: { url: link }
    // })
    const payload = { url: link, name: name }

    console.log(payload)
    chrome.runtime.sendMessage({
      type: 'DOWNLOAD',
      payload
    })

    await asyncTimeout(1000)
  }
}

// 获取所有图片链接
async function fetchImageLinks() {
  const links = new Set()

  // 1. 先获取本页所有连接
  selectorAllLinks(document, links)

  // 2. 获取分页内容和分页连接
  const uri = location.origin + location.pathname
  const pageBox = document.querySelector('.ptt')

  let total = Array.from(pageBox?.querySelectorAll('td')).slice(-2)[0]?.innerText | 0
  // 选中的页码
  let page = pageBox?.querySelector('.ptds')?.querySelector('a')?.innerText | 0

  _popup.appendContent(`<b>【开始获取数据】</b>`, `从第 ${page} 页开始，共有 ${total} 页数据...`)

  for (; page < total; page++) {
    const url = `${uri}?p=${page}`
    _popup.appendContent(`获取第 ${page} 页数据... <a target='_blank' href='${url}'>${url}</a>`)

    const ctx = await fetchContent(url)
    await asyncTimeout()
    selectorAllLinks(ctx, links)
  }

  return links
}

// 获取列表页所有图片的链接, 每张图片的大图内容页链接
function selectorAllLinks(dom, links) {
  dom
    ?.querySelector('#gdt')
    ?.querySelectorAll('a')
    ?.forEach(e => e.href && links.add(e.href))
}
// ========== 批量下载原图 end ========================================

// ========== 自动 start ========================================
// non, pending, loading, error
let autoLoadPageStatus = 'pending'
let previewCssInserted = false

if (autoLoadPath.some(e => new RegExp(e).test(location.pathname))) {
  initAutoLoadPage()
}

function initAutoLoadPage(height = 1000) {
  let ticking = false

  const path = location.pathname
  window.addEventListener('scroll', function () {
    // console.log(!ticking && autoLoadPageStatus === 'pending')
    if (!ticking && autoLoadPageStatus === 'pending') {
      window.requestAnimationFrame(function () {
        // autoLoadList()

        if (new RegExp('^/g/').test(path)) {
          // 图片详情列表
          autoLoadList()
        } else if (new RegExp('^/s/').test(path)) {
          // 图片大图预览
          autoLoadShow()
        } else {
          // 图片首页等列表
          autoLoadHome()
        }

        setTimeout(() => {
          ticking = false
        }, 300)
      })

      ticking = true
    }
  })
}

// 暂时注释了，分页太多影响返回。
function setHistory(url) {
  // history.pushState({}, '', new URL(url))
}
/**
 * 判断是否达成滚动条件
 * @param {*} pageBox 页码dom
 * @returns 返回 msgBox dom
 */
function checkScroll(pageBox) {
  if (!pageBox) {
    return false
  }

  // 距离底部小于1000像素, 执行加载下一页
  if (pageBox.getBoundingClientRect().y - document.documentElement.clientHeight > 1000) {
    return false
  }

  let pageMsg = document.querySelector('#page-message')
  if (!pageMsg) {
    pageMsg = document.createElement('p')
    // pageMsg.style = 'color: #000;'
    pageMsg.id = 'page-message'
    pageMsg.style.textAlign = 'center'
    pageBox?.parentNode?.insertBefore(pageMsg, pageBox)
  }

  return pageMsg
}

/**
 * 自动加载首页
 * @param {*} params
 */
async function autoLoadHome() {
  const pageBox = document.querySelectorAll('.searchnav')?.[1]
  const pageMsg = checkScroll(pageBox)

  if (!pageMsg) {
    return
  }

  const link = document.querySelector('#dnext')?.href

  if (link) {
    try {
      autoLoadPageStatus = 'loading'
      pageMsg.innerText = '加载中'

      // 获取下一页内容
      const ctx = await fetchContent(link)

      // 设置历史记录
      setHistory(link)

      // 设置页码
      // 要先设置页码, 再添加内容, 因为preview页面的标题在页码里面。
      const pageNode = ctx.querySelectorAll('.searchnav')?.[1]
      if (pageNode) {
        pageBox.innerHTML = pageNode.innerHTML
      }

      // 设置内容
      const content = ctx.querySelector('.itg')?.children

      if (content) {
        document.querySelector('.itg')?.append(...content)
      }

      // 中途没有改变状态，那么恢复默认状态
      if (autoLoadPageStatus == 'loading') {
        autoLoadPageStatus = 'pending'
        pageMsg.innerText = '加载失败，请尝试滚动页面'
      }
    } catch (error) {
      console.log(error)
      autoLoadPageStatus = 'error'
      pageMsg.innerText = '出现错误啦 '
    }
  } else {
    // 没有下一页了，或者下一页获取失败
    autoLoadPageStatus = 'non'
    pageMsg.innerText = '大概没有下一页了'
  }
}

async function autoLoadList() {
  const pageBox = document.querySelector('.ptb')
  const pageMsg = checkScroll(pageBox)
  if (!pageMsg) {
    return
  }

  const link = pageBox.querySelectorAll('td:last-child')?.[0]?.querySelector('a')?.href
  if (link) {
    try {
      autoLoadPageStatus = 'loading'
      pageMsg.innerText = '加载中'

      // 获取下一页内容
      const ctx = await fetchContent(link)

      // 设置历史记录
      setHistory(link)
      // 设置页码
      // 要先设置页码, 再添加内容, 因为preview页面的标题在页码里面。
      pageBox.innerHTML = ctx.querySelector('.ptb').innerHTML

      // 设置内容
      const list = ctx.querySelector('#gdt')?.children

      if (list) {
        const content = document.querySelector('#gdt')
        Array.from(list).forEach(child => {
            content.appendChild(child); 
        });
      }

      // 中途没有改变状态，那么恢复默认状态
      if (autoLoadPageStatus == 'loading') {
        autoLoadPageStatus = 'pending'
        pageMsg.innerText = '加载失败，请尝试滚动页面'
      }
    } catch (error) {
      console.log(error)
      autoLoadPageStatus = 'error'
      pageMsg.innerText = '出现错误啦 '
    }
  } else {
    // 没有下一页了，或者下一页获取失败
    autoLoadPageStatus = 'non'
    pageMsg.innerText = '大概没有下一页了'
  }
}

async function autoLoadShow() {
  const pageBox = document.querySelectorAll('.sn')
  const pageMsg = checkScroll(pageBox[1])
  if (!pageMsg) {
    return
  }

  const link = pageBox[1].querySelector('#next')?.href
 const [a, b] =  Array.from(document.querySelector('.sn > div').querySelectorAll('span')).map(e => e.innerText)

  if (a !== b) {
    try {
      autoLoadPageStatus = 'loading'
      pageMsg.innerText = '加载中'

      // 获取下一页内容
      const ctx = await fetchContent(link)

      // 设置历史记录
      // setHistory(link)
      // 设置页码
      // 要先设置页码, 再添加内容, 因为preview页面的标题在页码里面。

      const page = ctx.querySelector('.sn')
      const info = page.nextElementSibling
      pageBox.forEach(e => (e.innerHTML = page.innerHTML))

      // 设置内容
      const doc = document.querySelector('#i3')
      doc.appendChild(page.nextElementSibling)
      doc.appendChild(ctx.querySelector('#i3').firstChild)

      if (!previewCssInserted) {
        const style = document.createElement('style')
        style.textContent = `#i3 > div {color: #222;}`
        document.head.appendChild(style)
        previewCssInserted = true
      }

      // 中途没有改变状态，那么恢复默认状态
      if (autoLoadPageStatus == 'loading') {
        autoLoadPageStatus = 'pending'
        pageMsg.innerText = '加载失败，请尝试滚动页面'
      }
    } catch (error) {
      console.log(error)
      autoLoadPageStatus = 'error'
      pageMsg.innerText = '出现错误啦 '
    }
  } else {
    // 没有下一页了，或者下一页获取失败
    autoLoadPageStatus = 'non'
    pageMsg.innerText = '大概没有下一页了'
  }
}

// 获取并返回指定页面的dom数据
function fetchContent(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(res => {
        const content = document.createElement('html')
        content.innerHTML = res
        // console.log(content.querySelector('div.itg'))
        resolve(content)
      })
      .catch(err => reject(err))
  })
}
