'use strict'

/**
 * 多语言文本常量定义
 * 分为界面文本和下载选项文本两部分
 */
const TEXT_CONSTANTS = {
  zh: {
    // 主界面文本
    downloadAllTorrentBtn: '下载全部种子',
    downloadAllTorrentTitle: '下载全部种子',
    downloadAllImagesBtn: '下载所有图片',
    downloadAllImagesTitle: '下载当前画廊的所有原图',
    downloadModalTitle: '下载种子',
    downloadCompleteMsg: '所有种子下载链接处理完毕，请刷新页面查看结果',
    pageLabel: '#页码 ${currentPage}',
    collectingLinks: '开始收集图片链接',
    startFromPage: '从第 ${currentPage} 页开始，共 ${totalPages} 页',
    collectingPage: '正在收集第 ${currentPage} 页...',
    viewPage: '查看页面',
    linksCollected: '链接收集完成，共获取到 ${imageLinks.size} 张图片',
    startDownloadImages: '开始下载图片',
    downloadingFile: '正在下载：${fileName}',
    downloadFailed: '下载失败：${link} <br> 错误：${error.message}',
    partialDownloadComplete: '下载完成，共 ${errorLinks.length} 个文件下载失败',
    allDownloadComplete: '所有文件下载完成！',
    downloadSelectionTitle: '下载选择',
    downloadSelectionContent: '当前画廊有 ${torrentCount} 个种子文件，推荐下载种子文件（速度更快）。',
    continueDownloadImages: '继续下载图片',
    downloadTorrentFile: '下载种子文件',
    loadingNextPage: '正在加载下一页...',
    scrollToLoadMore: '滚动可加载更多内容',
    loadFailedRetry: '加载失败，尝试滚动重试',
    allContentLoaded: '已加载全部内容',
    loadingNextImage: '正在加载下一张图片...',
    allImagesLoaded: '已加载全部图片',
    torrentExist: '已存在',
    torrentSkip: '跳过',
    torrentOver: '结束',
    torrentContinue: '下载',

    // 新增的错误和通用文本
    exceedMaxDownloads: '已下载超过指定数量 ${maxDownloads}',
    reachMaxPages: '已到指定最大页数 ${maxPages} - ${stopAllDownloads}',
    reachSpecifiedGallery: '已到指定画廊',
    stopAtExistingTorrent: '已存在触发结束下载',
    torrentFileNotFound: '未找到种子文件 - ${url}',
    unknownGallery: '未知画廊',
    originalImageLinkNotFound: '未找到原图链接',
    unknownImage: '未知图片',
    nextPageLinkNotFound: '未找到下一页链接',
    imageExistSkip: '[已存在 - 跳过] ${fileName}',
    imageExist: '[已存在] ${fileName}',
    saveToFolder: '保存到文件夹 ${downloadPath}'
  },
  en: {
    // Main interface text
    downloadAllTorrentBtn: 'Download All Torrents',
    downloadAllTorrentTitle: 'Download all torrents',
    downloadAllImagesBtn: 'Download All Images',
    downloadAllImagesTitle: 'Download all original images in this gallery',
    downloadModalTitle: 'Download Torrents',
    downloadCompleteMsg: 'All torrent download links processed, please refresh the page to view results',
    pageLabel: '#page ${currentPage}',
    collectingLinks: 'Start collecting image links',
    startFromPage: 'Starting from page ${currentPage}, total ${totalPages} pages',
    collectingPage: 'Collecting page ${currentPage}...',
    viewPage: 'View page',
    linksCollected: 'Link collection completed, total ${imageLinks.size} images found',
    startDownloadImages: 'Start downloading images',
    downloadingFile: 'Downloading: ${fileName}',
    downloadFailed: 'Download failed: ${link} <br> Error: ${error.message}',
    partialDownloadComplete: 'Download completed, ${errorLinks.length} files failed to download',
    allDownloadComplete: 'All files downloaded successfully!',
    downloadSelectionTitle: 'Download Selection',
    downloadSelectionContent:
      'This gallery has ${torrentCount} torrent files. It is recommended to download the torrent (faster speed).',
    continueDownloadImages: 'Continue downloading images',
    downloadTorrentFile: 'Download torrent file',
    loadingNextPage: 'Loading next page...',
    scrollToLoadMore: 'Scroll to load more content',
    loadFailedRetry: 'Load failed, try scrolling to retry',
    allContentLoaded: 'All content loaded',
    loadingNextImage: 'Loading next image...',
    allImagesLoaded: 'All images loaded',
    torrentExist: 'exists',
    torrentSkip: 'skip',
    torrentOver: 'over',
    torrentContinue: 'download',

    // New error and general text
    exceedMaxDownloads: 'Exceeded the specified number of downloads ${maxDownloads}',
    reachMaxPages: 'Reached the maximum specified pages ${maxPages} - ${stopAllDownloads}',
    reachSpecifiedGallery: 'Reached the specified gallery',
    stopAtExistingTorrent: 'Stop downloading due to existing torrent',
    torrentFileNotFound: 'Torrent file not found - ${url}',
    unknownGallery: 'Unknown gallery',
    originalImageLinkNotFound: 'Original image link not found',
    unknownImage: 'Unknown image',
    nextPageLinkNotFound: 'Next page link not found',
    imageExistSkip: '[Exists - Skip] ${fileName}',
    imageExist: '[Exists] ${fileName}',
    saveToFolder: 'Save to folder ${downloadPath}'
  }
}

const TEXT_DOWNLOAD_OPTIONS = {
  zh: {
    // 下载配置文本
    downloadConfig: '下载配置',
    startDownload: '开始下载',
    cancel: '取消',

    // 下载限制选项
    maxDownloads: '最多下载',
    torrents: '个种子',
    maxPages: '最多下载',
    pages: '页',

    // 停止条件选项
    stopAtTorrentTitle: '下载到该画廊结束任务\n不包括该画廊\n填写画廊链接',
    stopAtTorrentLabel: '下载到',
    stopAtTorrentEnd: '结束',

    // 下载记录管理
    skipDownloaded: '跳过下载过的种子',
    stopDownloaded: '遇到下载过的种子结束下载',
    clearDownloaded: '清除已下载记录',
    clearDownloadedConfirm: '【跳过下载过的种子】依赖该数据，\n确定清除已下载记录吗？',
    downloadedCount: '已下载',
    torrentsCount: '个种子',

    // 下载路径选项
    downloadPathInfo: '保存到新文件夹（修改保存位置：设置→下载内容→位置）',
    defaultPathTip: '这是浏览器默认下载路径，若要更改请在浏览器设置中修改',
    folderPlaceholder: '文件夹，没有则新建。不填则默认',

    // 通用操作文本
    download: '下载',
    gallery: '画廊',
    stopAllDownloads: '停止所有下载',
    showDefaultFolder: '打开文件夹',

    // 图片下载选项
    thumbDownload: '下载缩略图',
    fullDownload: '下载原图',
    skipDownloadedImages: '跳过下载过的图片'
  },
  en: {
    // Download configuration text
    downloadConfig: 'Download Configuration',
    startDownload: 'Download',
    cancel: 'Cancel',

    // Download limit options
    maxDownloads: 'Max',
    torrents: 'torrents',
    maxPages: 'Max',
    pages: 'pages',

    // Stop condition options
    stopAtTorrentTitle: 'Stop all downloads upon this gallery',
    stopAtTorrentLabel: 'Stop at',
    stopAtTorrentEnd: 'end',

    // Download record management
    skipDownloaded: 'Skip downloaded torrents',
    stopDownloaded: 'Abort downloads on downloaded torrents',
    clearDownloaded: 'Clear download records',
    clearDownloadedConfirm:
      '【Skip downloaded torrents】 depends on this data,\nare you sure you want to clear the download records?',
    downloadedCount: 'Downloaded',
    torrentsCount: 'torrents',

    // Download path options
    downloadPathInfo: 'Save to new folder (save location: Settings → Downloads → Location)',
    defaultPathTip: 'This is the browser default download path. To change it, please modify in browser settings',
    folderPlaceholder: 'Folder, create if not exists. Leave empty for default',

    // General operation text
    download: 'Download',
    gallery: 'Gallery',
    stopAllDownloads: 'Stop all downloads',
    showDefaultFolder: 'Open Folder',

    // Image download options
    thumbDownload: 'Download thumbnail',
    fullDownload: 'Download original image',
    skipDownloadedImages: 'Skip downloaded images'
  }
}

/**
 * 国际化服务类
 * 统一管理所有多语言文本，提供方便的文本获取和参数替换功能
 */
class I18nService {
  constructor() {
    this.language = this.detectLanguage()
    this.texts = this.loadTexts()
  }

  /**
   * 检测当前语言
   * @returns {string} 语言代码
   */
  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage
    return browserLang.includes('zh') ? 'zh' : 'en'
  }

  /**
   * 加载所有文本资源
   * @returns {Object} 文本资源对象
   */
  loadTexts() {
    return {
      common: TEXT_CONSTANTS,
      download: TEXT_DOWNLOAD_OPTIONS
    }
  }

  /**
   * 获取文本
   * @param {string} category - 文本分类：'common' | 'download'
   * @param {string} key - 文本键名
   * @param {Object} params - 替换参数
   * @returns {string} 格式化后的文本
   */
  get(category, key, params = {}) {
    const categoryTexts = this.texts[category]
    if (!categoryTexts) {
      console.warn(`I18n category not found: ${category}`)
      return key
    }

    const text = categoryTexts[this.language]?.[key] || categoryTexts.en?.[key]
    if (!text) {
      console.warn(`I18n key not found: ${category}.${key}`)
      return key
    }

    return this.format(text, params)
  }

  /**
   * 获取通用文本（快捷方法）
   * @param {string} key - 文本键名
   * @param {Object} params - 替换参数
   * @returns {string} 格式化后的文本
   */
  t(key, params = {}) {
    return this.get('common', key, params)
  }

  /**
   * 获取下载选项文本（快捷方法）
   * @param {string} key - 文本键名
   * @param {Object} params - 替换参数
   * @returns {string} 格式化后的文本
   */
  dt(key, params = {}) {
    return this.get('download', key, params)
  }

  /**
   * 格式化文本，替换参数
   * @param {string} text - 原始文本
   * @param {Object} params - 替换参数对象
   * @returns {string} 格式化后的文本
   */
  format(text, params = {}) {
    return text.replace(/\${([^}]+)}/g, (match, key) => {
      return params[key.trim()] !== undefined ? params[key.trim()] : match
    })
  }

  /**
   * 获取当前语言
   * @returns {string} 当前语言代码
   */
  getCurrentLanguage() {
    return this.language
  }
}

// 创建全局国际化实例
const i18n = new I18nService()

/**
 * 页面DOM选择器常量配置
 * 按不同页面类型分类存储选择器
 */
const PAGE_DOM_SELECTORS = {
  // 首页相关选择器 (https://exhentai.org/)
  home: {
    contentTable: '.gltm', // 首页内容表格
    contentBody: '.itg', // 首页内容主体
    bottomNext: '#dnext', // 底部下一页按钮
    topNext: '#unext', // 顶部下一页按钮
    topPane: '#toppane', // 顶部搜索块
    searchNav: '.searchnav', // 分页导航栏
    torrentIcon: '.gldown > a', // 下载种子icon
    torrentName: '.glink' // 种子名称
  },
  // 图片详情列表页选择器 (https://exhentai.org/g/2374482/33d2ec5afc/)
  gallery: {
    topNav: '.ptt', // 顶部分页导航
    bottomNav: '.ptb', // 底部分页导航
    currentPage: '.ptds', // 当前选中页码
    contentContainer: '#gdt', // 列表内容容器
    asidePane: '#gd5 a', // 画廊详情页侧边栏
    title: '#gn' // 画廊标题
  },
  // 图片查看页选择器 (https://exhentai.org/s/d1c20fcadc/2374482-1)
  imageView: {
    pt: '#i2', // 顶部信息区
    pb: '#i4', // 底部信息区
    nextButton: '#next', // 下一页按钮
    contentContainer: '#i3', // 图片容器
    title: '#i2 > div', // 图片标题
    imageUrl: '#i6 > div:last-child a', // 图片地址
    imageThumb: '#img', // 缩略图
    navBar: '.sn', // 翻页工具栏
    pageNumber: '.sn > div' // 翻页工具栏中的页码
  }
}

/**
 * 页面路径配置常量
 */
const PAGE_PATH_CONFIGS = {
  // 需要加载下载按钮的页面路径
  INCLUDE_DOWNLOAD_BUTTON_PATHS: [
    '^/$', // 首页
    '^/watched', // 已观看页面
    '^/favorites', // 收藏页面
    '^/torrents', // 种子页面
    '^/uploader', // 上传者页面
    '^/popular' // 热门页面
  ],

  // 需要自动加载下一页的页面路径
  AUTO_LOAD_PATHS: [
    '^/$', // 首页
    '^/watched', // 已观看页面
    '^/favorites', // 收藏页面
    '^/g/', // 画廊详情页
    '^/s/', // 图片详情页
    '^/tag/' // 标签页面
  ]
}

/**
 * 工具类 - 提供通用辅助方法
 */
class Utils {
  /**
   * 异步延迟函数
   * @param {number} timer - 延迟毫秒数，默认3000ms
   * @returns {Promise} 延迟后的Promise
   */
  static asyncTimeout(timer = 3000) {
    return new Promise(resolve => setTimeout(resolve, timer))
  }

  /**
   * 向页面插入CSS样式
   * @param {string} css - CSS代码
   */
  static insertStyle(css) {
    const styleElement = document.createElement('style')
    styleElement.textContent = css
    document.head.appendChild(styleElement)
  }

  /**
   * 创建按钮元素
   * @param {string} value - 按钮显示文本
   * @param {Function} onClick - 点击事件处理函数
   * @param {string} title - 按钮标题提示
   * @returns {HTMLInputElement} 创建的按钮元素
   */
  static createButton(value, onClick, title) {
    const button = document.createElement('input')
    button.type = 'button'
    button.value = value
    if (title) button.title = title
    button.addEventListener('click', onClick, false)
    return button
  }

  /**
   * 获取输入框值
   * @param {string} id - 元素ID
   * @returns {string} 输入框的值
   */
  static getInputValue(id) {
    const element = document.getElementById(id)
    return element ? element.value.trim() : ''
  }

  /**
   * 获取复选框状态
   * @param {string} id - 元素ID
   * @returns {boolean} 复选框是否选中
   */
  static getCheckboxState(id) {
    const element = document.getElementById(id)
    return element ? element.checked : false
  }

  /**
   * 创建带内容的HTML元素
   * @param {string} html - HTML内容
   * @param {string} tag - 元素标签，默认'p'
   * @returns {HTMLElement} 创建的元素
   */
  static createElementWithContent(html, tag = 'p') {
    const element = document.createElement(tag)
    element.innerHTML = html
    return element
  }

  /**
   * 获取指定URL的页面内容
   * @param {string} url - 页面URL
   * @returns {Promise<Document>} 页面DOM对象
   */
  static async fetchPageContent(url) {
    if (!url) return document

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

      const html = await response.text()
      const tempDoc = document.createElement('html')
      tempDoc.innerHTML = html
      return tempDoc
    } catch (error) {
      throw new Error(`Failed to fetch page: ${error.message}`)
    }
  }

  /**
   * 通过a标签下载文件（备用方法）
   * @param {string|Blob} href - 下载链接或Blob对象
   * @param {string} name - 文件名
   */
  static downloadViaLink(href, name = '') {
    const link = document.createElement('a')
    link.download = name

    if (typeof href === 'string') {
      link.href = href
    } else {
      link.href = URL.createObjectURL(href)
    }

    link.click()
    if (typeof href !== 'string') {
      URL.revokeObjectURL(link.href)
    }
  }

  /**
   * 操作用户数据数据库
   * @param {Object} payload - 数据库操作参数
   * @returns {Promise<any>} 数据库操作结果
   */
  static useDatabase(payload) {
    return new Promise(resolve => {
      chrome.runtime.sendMessage(
        {
          type: 'DB',
          payload
        },
        res => {
          if (res.success) {
            resolve(res.data)
          } else {
            resolve(false)
          }
        }
      )
    })
  }
}

/**
 * 模态框管理器 - 处理模态框的创建、显示和关闭
 */
class ModalManager {
  constructor() {
    this.maskClose = false
    this.popup = {}
  }

  /**
   * 打开模态框
   * @param {Object} options - 模态框配置选项
   * @param {string|HTMLElement} options.title - 标题内容
   * @param {string|HTMLElement|boolean} options.content - 内容区域
   * @param {string|HTMLElement|Array} options.footer - 底部内容
   * @param {boolean} options.maskClose - 点击遮罩是否关闭
   * @returns {Object} 模态框对象
   */
  openModal(options) {
    // 清理现有模态框
    if (this.popup.body) {
      this.popup.body.innerHTML = ''
      delete this.popup.title
      delete this.popup.content
      delete this.popup.footer
    } else {
      this.createModalStructure()
    }

    // 配置遮罩点击关闭
    this.configureMaskClose(options.maskClose)

    // 添加各区域内容
    if (options.title) this.addTitle(options.title)
    if (options.content) this.addContent(options.content)
    if (options.footer) this.addFooter(options.footer)

    // 显示模态框
    this.popup.overlay.appendChild(this.popup.body)
    document.body.appendChild(this.popup.overlay)

    return this.popup
  }

  getElementBgColor(selector) {
    const element = document.querySelector(selector)
    if (!element) return null
    return window.getComputedStyle(element).backgroundColor
  }

  /**
   * 创建模态框基本结构
   */
  createModalStructure() {
    const bgColor = this.getElementBgColor('.ido') || this.getElementBgColor('#gdt') || '#363940'
    const overlay = document.createElement('div')
    overlay.style = `
      background: rgba(0,0,0,.7);
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 9999;
    `

    const modalBody = document.createElement('div')
    modalBody.id = 'popup-body'
    modalBody.style = `
      position: absolute;
      background: ${bgColor};
      border-radius: 8px;
      z-index: 10000;
      padding: 14px 20px;
      font-size: 16px;
      min-width: 400px;
      min-height: 120px;
      box-shadow: 0 0 12px rgba(0,0,0,0.8);
      left: 50%;
      top: 30%;
      transform: translate(-50%, -30%);
      text-align: left;
    `

    // 阻止模态框内部点击事件冒泡到遮罩
    modalBody.addEventListener('click', e => e.stopPropagation(), false)

    this.popup.overlay = overlay
    this.popup.body = modalBody
  }

  /**
   * 配置遮罩点击关闭
   * @param {boolean} maskClose - 是否启用遮罩点击关闭
   */
  configureMaskClose(maskClose) {
    if (maskClose) {
      this.maskClose = true
      this.popup.overlay.addEventListener('click', () => this.closeModal(), false)
    } else {
      this.maskClose = false
      this.popup.overlay.removeEventListener('click', () => this.closeModal(), false)
    }
  }

  /**
   * 添加标题区域
   * @param {string|HTMLElement} title - 标题内容
   */
  addTitle(title) {
    this.popup.title = document.createElement('h3')
    this.popup.title.style.margin = '0 0 15px 0'
    // this.popup.title.style.color = '#fff'

    if (typeof title === 'string') {
      this.popup.title.innerHTML = title
    } else {
      this.popup.title.appendChild(title)
    }

    this.popup.body.appendChild(this.popup.title)
  }

  /**
   * 添加内容区域
   * @param {string|HTMLElement|boolean} content - 内容
   */
  addContent(content) {
    this.popup.content = document.createElement('div')
    this.popup.content.style = `
      padding-bottom: 20px;
      overflow-y: auto;
      max-height: 60vh;
    `

    if (typeof content === 'string') {
      this.popup.content.innerHTML = content
    } else if (content !== true) {
      this.popup.content.appendChild(content)
    }

    this.popup.body.appendChild(this.popup.content)

    // 添加动态内容追加方法
    this.popup.appendContent = (...args) => {
      const elements = args.map(content => Utils.createElementWithContent(content))
      this.popup.content.append(...elements)
      // this.popup.content.scrollTop = this.popup.content.scrollHeight;
    }
  }

  /**
   * 添加底部区域
   * @param {string|HTMLElement|Array} footer - 底部内容
   */
  addFooter(footer) {
    this.popup.footer = document.createElement('div')
    this.popup.footer.style = 'display: flex; padding-top: 10px; gap: 10px; justify-content: center'

    if (Array.isArray(footer)) {
      footer.forEach(item => this.popup.footer.appendChild(item))
    } else {
      this.popup.footer.appendChild(footer)
    }

    this.popup.body.appendChild(this.popup.footer)
  }

  /**
   * 关闭模态框
   */
  closeModal() {
    if (!this.maskClose) return

    if (this.popup.overlay && document.body.contains(this.popup.overlay)) {
      document.body.removeChild(this.popup.overlay)
    }
    this.popup = {}
  }

  /**
   * 获取当前模态框实例
   * @returns {Object} 模态框对象
   */
  getCurrentPopup() {
    return this.popup
  }
}

/**
 * 种子下载管理器 - 处理种子批量下载功能
 */
class TorrentDownloader {
  constructor(modalManager) {
    this.taskID = ''
    this.maxDownloads = 0
    this.downloadParams = {}
    this.status = 'pending'
    this.modalManager = modalManager
    this.i18n = i18n // 使用国际化服务
    this.init()
  }

  /**
   * 初始化种子下载功能
   */
  init() {
    this.createDownloadButton()
  }

  /**
   * 创建批量下载按钮并添加到页面
   */
  createDownloadButton() {
    const { pathname } = document.location

    const shouldAddButton = PAGE_PATH_CONFIGS.INCLUDE_DOWNLOAD_BUTTON_PATHS.some(pattern =>
      new RegExp(pattern).test(pathname)
    )

    if (!shouldAddButton) return

    const downloadBtn = Utils.createButton(
      this.i18n.t('downloadAllTorrentBtn'),
      () => this.openDownloadModal(),
      this.i18n.t('downloadAllTorrentTitle')
    )

    // 尝试在表单中插入按钮
    const formElement = document.querySelector('form')
    if (formElement) {
      const existingButtons = formElement.querySelectorAll("input[type='button']")
      if (existingButtons.length) {
        const lastButton = existingButtons[existingButtons.length - 1]
        lastButton.parentNode.insertBefore(downloadBtn, lastButton.nextElementSibling)
      }
    } else {
      // 表单不存在时，在顶部面板添加按钮
      const topPane = document.querySelector(PAGE_DOM_SELECTORS.home.topPane)
      if (topPane) {
        const buttonContainer = document.createElement('div')
        buttonContainer.style = 'text-align:center'
        buttonContainer.appendChild(downloadBtn)
        topPane.appendChild(buttonContainer)
      }
    }
  }

  /**
   * 打开批量下载配置模态框
   */
  async openDownloadModal() {
    // 获取已下载种子数量
    const downloadedCount = await this.getDownloadedCount()

    // 创建按钮
    const startBtn = Utils.createButton(this.i18n.dt('startDownload'), () => {
      const params = this.collectDownloadParams()
      this.downloadAllTorrents(params)
    })

    const cancelBtn = Utils.createButton(this.i18n.dt('cancel'), () => this.modalManager.closeModal())

    this.modalManager.openModal({
      maskClose: true,
      title: this.i18n.dt('downloadConfig'),
      content: this.createModalContent(downloadedCount),
      footer: [startBtn, cancelBtn]
    })
  }

  /**
   * 获取已下载种子数量
   * @returns {Promise<number>} 已下载数量
   */
  async getDownloadedCount() {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ type: 'DB', payload: { module: 'torrent', action: 'getTotalCount' } }, res =>
        resolve(res.success ? res.data : 0)
      )
    })
  }

  /**
   * 收集下载参数
   * @returns {Object} 下载参数对象
   */
  collectDownloadParams() {
    return {
      maxDownloads: parseInt(Utils.getInputValue('max-downloads')) || 0,
      maxPages: parseInt(Utils.getInputValue('max-pages')) || 0,
      stopAtTorrent: Utils.getInputValue('stop-at-torrent'),
      skipDownloaded: Utils.getCheckboxState('skip-downloaded'),
      stopDownloaded: Utils.getCheckboxState('stop-downloaded'),
      downloadPath: Utils.getInputValue('download-path')
    }
  }

  /**
   * 创建模态框内容
   * @param {number} downloadedCount - 已下载数量
   * @returns {HTMLElement} 模态框内容元素
   */
  createModalContent(downloadedCount) {
    const content = document.createElement('div')
    content.className = 'searchadv'
    content.innerHTML = `
      <div>
        <div>${this.i18n.dt(
          'maxDownloads'
        )} <input type="text" id="max-downloads" size="4" maxlength="4"/> ${this.i18n.dt('torrents')}</div>
        <div>${this.i18n.dt('maxPages')} <input type="text" id="max-pages" size="4" maxlength="4" /> ${this.i18n.dt(
          'pages'
        )}</div>
        <div title="${this.i18n.dt('stopAtTorrentTitle')}">
          ${this.i18n.dt(
            'stopAtTorrentLabel'
          )} <input type="text" id="stop-at-torrent" placeholder="url" style="width:60px" /> ${this.i18n.dt(
            'stopAtTorrentEnd'
          )}
        </div>
      </div>

      <div>
        <div><label class="lc"><input checked type="checkbox" id="skip-downloaded"><span></span> ${this.i18n.dt(
          'skipDownloaded'
        )}</label></div>
        <div><label class="lc"><input type="checkbox" id="stop-downloaded"><span></span> ${this.i18n.dt(
          'stopDownloaded'
        )}</label></div>
      </div>

      <div>
        ${this.i18n.dt('downloadedCount')} <span id="downloaded-count">${downloadedCount}</span> ${this.i18n.dt(
          'torrentsCount'
        )}. 
        [<a href="javascript:void(0);" id="clear-downloaded">${this.i18n.dt('clearDownloaded')}</a>]
      </div>

      <div title="${this.i18n.dt('defaultPathTip')}">
        <div style="user-select: text">
          [<a href="javascript:void(0);" id="show-default-folder">${this.i18n.dt('showDefaultFolder')}</a>]
          ${this.i18n.dt('downloadPathInfo')} 
        </div>
      </div>
      
      <div>
        <input type="text" id="download-path" placeholder="${this.i18n.dt('folderPlaceholder')}" style="width:200px" />
      </div>
    `

    this.bindModalEvents(content)
    return content
  }

  /**
   * 绑定模态框事件
   * @param {HTMLElement} content - 模态框内容元素
   */
  bindModalEvents(content) {
    setTimeout(() => {
      // 清除下载记录事件
      const clearBtn = content.querySelector('#clear-downloaded')
      if (clearBtn) {
        clearBtn.addEventListener('click', e => {
          e.preventDefault()
          if (confirm(this.i18n.dt('clearDownloadedConfirm'))) {
            chrome.runtime.sendMessage({
              type: 'DB',
              payload: { module: 'torrent', action: 'clearData' }
            })

            const countSpan = content.querySelector('#downloaded-count')
            if (countSpan) countSpan.textContent = '0'
          }
        })
      }

      // 显示默认文件夹事件
      const selectPathBtn = content.querySelector('#show-default-folder')
      if (selectPathBtn) {
        selectPathBtn.addEventListener('click', e => {
          e.preventDefault()
          chrome.runtime.sendMessage({ type: 'DOWNLOAD_PATH' })
        })
      }
    }, 0)
  }

  /**
   * 批量下载所有种子的主函数
   * @param {Object} params - 下载参数
   */
  async downloadAllTorrents(params) {
    // 创建任务
    this.downloadParams = params
    const payload = { module: 'torrentTask', action: 'createTask', data: { params } }
    this.taskID = await Utils.useDatabase(payload)

    // 打开下载进度模态框
    const popup = this.openDownloadProgressModal(params)
    let currentPage = 1
    let currentDom = document

    // 循环处理所有分页
    while (currentDom) {
      popup.appendContent(this.i18n.t('pageLabel', { currentPage }))

      try {
        await this.collectTorrentLinks(currentDom, popup)
      } catch (err) {
        currentDom = null
        popup.appendContent(`<li>${err.message} - ${this.i18n.dt('stopAllDownloads')}</li>`)
        break
      }

      // 获取下一页
      const nextPageElement = currentDom.querySelector(PAGE_DOM_SELECTORS.home.topNext)
      const nextPageUrl = nextPageElement?.href

      if (nextPageUrl) {
        currentPage++

        if (params.maxPages && currentPage > params.maxPages) {
          currentDom = null
          popup.appendContent(
            `<li>${this.i18n.t('reachMaxPages', {
              maxPages: params.maxPages,
              stopAllDownloads: this.i18n.dt('stopAllDownloads')
            })}</li>`
          )
          break
        }

        currentDom = await Utils.fetchPageContent(nextPageUrl)
      } else {
        currentDom = null
      }
    }

    popup.appendContent(this.i18n.t('downloadCompleteMsg'))
  }

  /**
   * 打开下载进度模态框
   * @param {Object} params - 下载参数
   * @returns {Object} 模态框对象
   */
  openDownloadProgressModal(params) {
    let content = '<div style="font-size: 10pt; text-align: center;">'

    if (params.maxDownloads > 0) {
      content += `<span style='padding: 2px 6px; display:inline-block'>[${this.i18n.dt('maxDownloads')} ${
        params.maxDownloads
      } ${this.i18n.dt('torrents')}]</span>`
    }
    if (params.maxPages > 0) {
      content += `<span style='padding: 2px 6px; display:inline-block'>[${this.i18n.dt('maxPages')} ${
        params.maxPages
      } ${this.i18n.dt('pages')}]</span>`
    }
    if (params.stopAtTorrent) {
      content += `<span style='padding: 2px 6px; display:inline-block'>[${this.i18n.dt('stopAtTorrentLabel')} ${
        params.stopAtTorrent
      } ${this.i18n.dt('stopAtTorrentEnd')}]</span>`
      params.stopAtTorrent = this.extractGalleryIdFromUrl(params.stopAtTorrent, 'pathname')
    }
    if (params.downloadPath) {
      content += `<span style='padding: 2px 6px; display:inline-block'>[${this.i18n.t('saveToFolder', {
        downloadPath: params.downloadPath
      })}]</span>`
    }
    if (params.skipDownloaded) {
      content += `<span style='padding: 2px 6px; display:inline-block'>[${this.i18n.dt('skipDownloaded')}]</span>`
    }
    content += '</div>'

    return this.modalManager.openModal({
      title: this.i18n.t('downloadModalTitle'),
      content: content
    })
  }

  /**
   * 从指定DOM中收集所有种子下载链接
   * @param {Document} dom - 页面DOM对象
   * @param {Object} popup - 模态框对象
   */
  async collectTorrentLinks(dom, popup) {
    const urls = this.extractTorrentUrls(dom)
    const iframe = this.createIframe('iframe-download-all')

    for (const item of urls) {
      if (!item.id) continue

      // 检查下载数量限制
      if (this.downloadParams.maxDownloads && this.maxDownloads >= this.downloadParams.maxDownloads) {
        throw new Error(
          this.i18n.t('exceedMaxDownloads', {
            maxDownloads: this.downloadParams.maxDownloads
          })
        )
      }

      // const torrentID = this.extractGalleryIdFromUrl(item.tLink);
      // if (!torrentID) continue;

      // 检查停止条件
      if (this.checkStopCondition(item.id)) {
        throw new Error(this.i18n.t('reachSpecifiedGallery'))
      }

      if (!item.tLink) continue

      // 检查种子是否已存在
      const isExist = await this.checkTorrentExists(item.id)
      if (isExist) {
        await this.handleExistingTorrent(popup, item)

        if (this.downloadParams.skipDownloaded) {
          continue
        }
      }

      // 下载种子
      await this.downloadTorrent(iframe, popup, item, isExist)

      this.maxDownloads++
      await Utils.asyncTimeout(1000)
    }
  }

  /**
   * 提取种子URL
   * @param {Document} dom - 页面DOM对象
   * @returns {Array<string>} 种子URL数组
   */
  extractTorrentUrls(dom) {
    const isTorrentPage = location.pathname.startsWith('/torrents')

    if (isTorrentPage) {
      return Array.from(
        dom.querySelector(PAGE_DOM_SELECTORS.home.contentBody).querySelectorAll('a[rel="nofollow"]')
      ).map(link => {
        const url = link.href?.replace(/&gtid=\d+/, '')
        return {
          tLink: url,
          gLink: url,
          id: this.extractGalleryIdFromUrl(url),
          name: link.textContent?.trim()
        }
      })
    } else {
      const body = dom.querySelector(PAGE_DOM_SELECTORS.home.contentBody)
      const parentTagName = body.tagName === 'TABLE' ? 'tr' : 'div'
      const list = body.querySelectorAll(PAGE_DOM_SELECTORS.home.torrentName)

      return Array.from(list).map(el => {
        // torrent link, gallery link,
        const name = el.textContent?.trim()
        const gLink = el.parentElement?.href

        const dom = el.parentElement.closest(parentTagName)
        const tLink = dom.querySelector(PAGE_DOM_SELECTORS.home.torrentIcon)?.href
        const id = this.extractGalleryIdFromUrl(gLink, 'pathname')

        return {
          tLink,
          gLink,
          id,
          name
        }
      })
    }
  }

  /**
   * 从URL提取画廊ID
   * @param {string} url - 画廊URL
   * @returns {string|null} 画廊ID
   */
  extractGalleryIdFromUrl(url, type = 'search') {
    try {
      if (type === 'search') {
        const [, galleryId, , galleryToken] = new URL(url).search.match(/([0-9A-Za-z]+)/g) || []
        return galleryId && galleryToken ? `${galleryId}-${galleryToken}` : null
      } else if (type === 'pathname') {
        const [, a, b] = new URL(url).pathname.match(/([0-9A-Za-z]+)/g)
        return a && b ? `${a}-${b}` : null
      }
    } catch (error) {
      console.log('extractGalleryIdFromUrl', error)
      return null
    }
  }

  /**
   * 检查停止条件
   * @param {string} torrentID - 画廊ID
   * @returns {boolean} 是否应该停止
   */
  checkStopCondition(torrentID) {
    return this.downloadParams.stopAtTorrent && torrentID === this.downloadParams.stopAtTorrent
  }

  /**
   * 检查种子是否已存在
   * @param {string} torrentID - 画廊ID
   * @returns {Promise<boolean>} 是否存在
   */
  async checkTorrentExists(torrentID) {
    return await Utils.useDatabase({ module: 'torrent', action: 'isTorrentExist', data: torrentID })
  }

  /**
   * 处理已存在的种子
   * @param {string} torrentID - 画廊ID
   * @param {Object} popup - 模态框对象
   * @param {string} url - 画廊URL
   * @returns {Promise<void>}
   */
  async handleExistingTorrent(popup, item) {
    // 已存在且设置停止下载
    if (this.downloadParams.stopDownloaded) {
      await Utils.useDatabase({
        module: 'torrentTask',
        action: 'updateTask',
        data: [this.taskID, { skipCountAdd: 1, status: 'completed' }]
      })
      popup.appendContent(
        `<small>[${this.i18n.t('torrentExist')} ${this.i18n.t('torrentOver')}] - <a href="${
          item.gLink
        }" target="_blank">${item.name} </a></small>`
      )
      throw new Error(this.i18n.t('stopAtExistingTorrent'))
    }

    // 已存在且设置跳过
    if (this.downloadParams.skipDownloaded) {
      await Utils.useDatabase({
        module: 'torrentTask',
        action: 'updateTask',
        data: [this.taskID, { skipCountAdd: 1 }]
      })
      popup.appendContent(
        `<small>[${this.i18n.t('torrentExist')} ${this.i18n.t('torrentSkip')}] - <a href="${
          item.gLink
        }" target="_blank">${item.name} </a></small>`
      )
    } else {
      // 已存在但不跳过，仍然显示存在信息
      popup.appendContent(
        `<small>[${this.i18n.t('torrentExist')} ${this.i18n.t('torrentContinue')}] - <a href="${
          item.gLink
        }" target="_blank">${item.name} </a></small>`
      )
    }
  }

  /**
   * 下载种子文件
   * @param {HTMLIFrameElement} iframe - iframe元素
   * @param {string} url - 画廊URL
   * @param {Object} popup - 模态框对象
   * @param {string} torrentID - 画廊ID
   * @returns {Promise<void>}
   */
  async downloadTorrent(iframe, popup, item, isExist) {
    await this.loadIframeContent(iframe, item.tLink)
    const latestTorrent = this.extractLatestTorrent(iframe.contentDocument)

    if (!latestTorrent.torrentUrl) {
      popup.appendContent(`<li>${this.i18n.t('torrentFileNotFound', { url: item.gLink })}</li>`)
      return
    }

    const pageTitle = item.name || item.gLink

    if (!isExist) {
      popup.appendContent(`<small><a href="${item.gLink}" target="_blank">${pageTitle} </a></small>`)
    }

    this.downloadFile(latestTorrent.torrentUrl, latestTorrent.fileName)

    // 记录到数据库
    await Utils.useDatabase({
      module: 'torrent',
      action: 'createTorrent',
      data: { id: item.id, name: pageTitle }
    })

    await Utils.useDatabase({
      module: 'torrentTask',
      action: 'updateTask',
      data: [this.taskID, { completedCountAdd: 1 }]
    })
  }

  /**
   * 从iframe中提取最新的种子信息
   * @param {Document} iframeDoc - iframe文档对象
   * @returns {Object} 种子信息
   */
  extractLatestTorrent(iframeDoc) {
    const torrentForms = iframeDoc.querySelectorAll('form')
    let latestTorrent = { date: 0, torrentUrl: '', fileName: '' }

    torrentForms.forEach(form => {
      const dateText = form.querySelector('td > span:last-child')?.textContent
      const dateTime = new Date(dateText).getTime()
      const torrentLink = form.querySelector('a')

      if (torrentLink && latestTorrent.date < dateTime) {
        latestTorrent = {
          date: dateTime,
          torrentUrl: torrentLink.href,
          fileName: torrentLink.innerText + '.torrent'
        }
      }
    })

    return latestTorrent
  }

  /**
   * 发送下载请求到扩展主程序
   * @param {string} url - 下载链接
   * @param {string} filename - 文件名
   */
  downloadFile(url, filename = '') {
    chrome.runtime.sendMessage({
      type: 'DOWNLOAD',
      payload: { url, filename, filepath: this.downloadParams.downloadPath }
    })
  }

  /**
   * 加载iframe内容
   * @param {HTMLIFrameElement} iframe - iframe元素
   * @param {string} src - 要加载的URL
   * @returns {Promise<void>}
   */
  loadIframeContent(iframe, src) {
    return new Promise(resolve => {
      iframe.src = src
      iframe.onload = () => resolve()
    })
  }

  /**
   * 创建隐藏的iframe
   * @param {string} id - iframe的ID
   * @returns {HTMLIFrameElement} iframe元素
   */
  createIframe(id) {
    let iframe = document.querySelector(`#${id}`)
    if (iframe) return iframe

    iframe = document.createElement('iframe')
    iframe.id = id
    iframe.width = 0
    iframe.height = 0
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    return iframe
  }
}

/**
 * 图片下载管理器 - 处理原图批量下载功能
 */
class ImageDownloader {
  constructor(modalManager) {
    this.modalManager = modalManager
    this.downloadParams = {}
    this.i18n = i18n // 使用国际化服务
    this.init()
  }

  /**
   * 初始化图片下载功能
   */
  init() {
    if (new RegExp('^/g/').test(location.pathname)) {
      this.initDownloadFullImage()
    }
  }

  /**
   * 初始化下载原图功能，添加下载按钮到页面
   */
  initDownloadFullImage() {
    // 添加自定义按钮样式
    Utils.insertStyle(`
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
    `)

    // 创建下载按钮
    const downloadBtn = document.createElement('div')
    downloadBtn.className = 'tha nosel custom-btn'
    downloadBtn.innerText = this.i18n.t('downloadAllImagesBtn')
    downloadBtn.title = this.i18n.t('downloadAllImagesTitle')
    downloadBtn.addEventListener('click', () => this.handleDownloadFullImage(), false)

    // 创建按钮容器
    const buttonContainer = document.createElement('div')
    buttonContainer.style = 'text-align:center; margin-bottom: 5px'
    buttonContainer.appendChild(downloadBtn)

    // 将按钮插入到顶部导航上方
    const topNav = document.querySelector(PAGE_DOM_SELECTORS.gallery.topNav)
    topNav?.parentNode?.insertBefore(buttonContainer, topNav)
  }

  /**
   * 处理下载原图的点击事件
   */
  async handleDownloadFullImage() {
    const torrentCount = this.getTorrentCount()

    if (torrentCount > 0) {
      this.showDownloadSelectionModal(torrentCount)
    } else {
      this.openDownloadModal()
    }
  }

  /**
   * 获取当前画廊的种子数量
   * @returns {number} 种子数量
   */
  getTorrentCount() {
    const torrentLinks = Array.from(document.querySelectorAll(PAGE_DOM_SELECTORS.gallery.asidePane))
    const torrentLink = torrentLinks.find(link => /torrent.*\d+/i.test(link.innerText))
    return torrentLink ? parseInt(torrentLink.innerText.match(/\d+/)[0], 10) : 0
  }

  /**
   * 显示下载选择模态框
   * @param {number} torrentCount - 种子数量
   */
  showDownloadSelectionModal(torrentCount) {
    // 创建继续下载图片按钮
    const imageBtn = document.createElement('div')
    imageBtn.innerText = this.i18n.t('continueDownloadImages')
    imageBtn.className = 'tha nosel custom-btn'
    imageBtn.addEventListener('click', () => this.openDownloadModal(), false)

    // 创建下载种子按钮
    const torrentBtn = document.createElement('div')
    torrentBtn.innerText = this.i18n.t('downloadTorrentFile')
    torrentBtn.className = 'ths nosel custom-btn'
    torrentBtn.addEventListener(
      'click',
      () => {
        const torrentLink = this.findTorrentLink()
        if (torrentLink) torrentLink.click()
        this.modalManager.closeModal()
      },
      false
    )

    this.modalManager.openModal({
      maskClose: true,
      title: this.i18n.t('downloadSelectionTitle'),
      content: this.i18n.t('downloadSelectionContent', { torrentCount }),
      footer: [imageBtn, torrentBtn]
    })
  }

  /**
   * 查找种子下载链接
   * @returns {HTMLElement|null} 种子链接元素
   */
  findTorrentLink() {
    const torrentLinks = Array.from(document.querySelectorAll(PAGE_DOM_SELECTORS.gallery.asidePane))
    return torrentLinks.find(link => /torrent.*\d+/i.test(link.innerText))
  }

  /**
   * 打开图片下载配置模态框
   */
  openDownloadModal() {
    const startBtn = Utils.createButton(this.i18n.dt('startDownload'), () => {
      this.downloadParams = {
        downloadType: document.querySelector('input[name="download"]:checked')?.value || 'thumb',
        skipDownloaded: Utils.getCheckboxState('skip-downloaded'),
        downloadPath: Utils.getInputValue('download-path')
      }
      this.downloadFullImage()
    })

    const cancelBtn = Utils.createButton(this.i18n.dt('cancel'), () => this.modalManager.closeModal())

    this.modalManager.openModal({
      maskClose: true,
      title: this.i18n.dt('downloadConfig'),
      content: this.createModalContent(),
      footer: [startBtn, cancelBtn]
    })
  }

  /**
   * 创建模态框内容
   * @returns {HTMLElement} 模态框内容元素
   */
  createModalContent() {
    const content = document.createElement('div')
    content.className = 'searchadv'
    content.innerHTML = `
      <div>
        <div><label class="lc"><input name="download" value="thumb" checked type="radio"><span></span> ${this.i18n.dt(
          'thumbDownload'
        )}</label></div>
        <div><label class="lc"><input name="download" value="full" type="radio"><span></span> ${this.i18n.dt(
          'fullDownload'
        )}</label></div>
        <div><label class="lc"><input type="checkbox" id="skip-downloaded"><span></span> ${this.i18n.dt(
          'skipDownloadedImages'
        )}</label></div>
      </div>

      <div title="${this.i18n.dt('defaultPathTip')}">
        <div style="user-select: text">
          [<a href="javascript:void(0);" id="show-default-folder">${this.i18n.dt('showDefaultFolder')}</a>]
          ${this.i18n.dt('downloadPathInfo')} 
        </div>
      </div>
      
      <div>
        <input type="text" id="download-path" placeholder="${this.i18n.dt('folderPlaceholder')}" style="width:220px" />
      </div>
    `

    this.bindModalEvents(content)
    return content
  }

  /**
   * 绑定模态框事件
   * @param {HTMLElement} content - 模态框内容元素
   */
  bindModalEvents(content) {
    setTimeout(() => {
      const selectPathBtn = content.querySelector('#show-default-folder')
      if (selectPathBtn) {
        selectPathBtn.addEventListener('click', e => {
          e.preventDefault()
          chrome.runtime.sendMessage({ type: 'DOWNLOAD_PATH' })
        })
      }
    }, 0)
  }

  /**
   * 下载所有原图的主函数
   */
  async downloadFullImage() {
    const pageTitle =
      document.querySelector(PAGE_DOM_SELECTORS.gallery.title)?.innerText || this.i18n.t('unknownGallery')

    const popup = this.modalManager.openModal({
      title: `${this.i18n.t('downloadAllImagesBtn')}：${pageTitle}`,
      content: true
    })

    const errorLinks = []
    const imageLinks = await this.collectImageLinks(popup)

    popup.appendContent(
      this.i18n.t('linksCollected', { 'imageLinks.size': imageLinks.size }),
      `<b>${this.i18n.t('startDownloadImages')}</b>`
    )

    const { downloadType, skipDownloaded, downloadPath } = this.downloadParams

    // 依次下载每张图片
    for (const link of imageLinks) {
      try {
        const pageDom = await Utils.fetchPageContent(link)

        // 获取图片标题和文件名
        const titleElement = Array.from(pageDom.querySelectorAll(PAGE_DOM_SELECTORS.imageView.title)).pop()
        const titleText = titleElement?.innerText || this.i18n.t('unknownImage')
        const fileName = titleText.split('::')[0].replace(/ /g, '') || this.i18n.t('unknownImage')

        // 生成唯一标识符
        const key = new URL(link).pathname.replace('/s/', '').replace('/', '-') + '-' + downloadType

        // 检查图片是否已存在
        const isExist = await Utils.useDatabase({
          module: 'image',
          action: 'isImageExist',
          data: key
        })

        // 判断是否跳过已下载图片
        if (isExist) {
          if (skipDownloaded) {
            const dom = this.i18n.t('downloadingFile', {
              fileName: this.i18n.t('imageExistSkip', { fileName })
            })
            popup.appendContent(`<small>${dom}</small>`)
            continue
          } else {
            const dom = this.i18n.t('downloadingFile', {
              fileName: this.i18n.t('imageExist', { fileName })
            })
            popup.appendContent(`<small>${dom}</small>`)
          }
        } else {
          const dom = this.i18n.t('downloadingFile', { fileName })
          popup.appendContent(`<small>${dom}</small>`)
        }

        // 获取图片URL
        let imageUrl
        if (downloadType === 'full') {
          // 原图下载逻辑
          imageUrl = pageDom.querySelector(PAGE_DOM_SELECTORS.imageView.imageUrl)?.href
        } else {
          // 缩略图下载逻辑
          imageUrl = pageDom.querySelector(PAGE_DOM_SELECTORS.imageView.imageThumb)?.src
        }

        if (!imageUrl) {
          throw new Error(this.i18n.t('originalImageLinkNotFound'))
        }

        // 发送下载请求
        chrome.runtime.sendMessage({
          type: 'DOWNLOAD',
          payload: { url: imageUrl, filename: fileName, filepath: downloadPath || pageTitle }
        })

        // 记录到数据库
        await Utils.useDatabase({
          module: 'image',
          action: 'createImage',
          data: { id: key, name: fileName, link: link }
        })

        // 控制下载速度
        await Utils.asyncTimeout(1000)
      } catch (error) {
        errorLinks.push(link)
        popup.appendContent(
          this.i18n.t('downloadFailed', {
            link: link,
            'error.message': error.message
          })
        )
      }
    }

    // 显示下载结果
    if (errorLinks.length > 0) {
      popup.appendContent(
        `<b>${this.i18n.t('partialDownloadComplete', { 'errorLinks.length': errorLinks.length })}</b>`
      )
    } else {
      popup.appendContent(`<b>${this.i18n.t('allDownloadComplete')}</b>`)
    }
  }

  /**
   * 收集所有图片详情页链接
   * @param {Object} popup - 模态框对象
   * @returns {Promise<Set>} 图片链接集合
   */
  async collectImageLinks(popup) {
    const imageLinks = new Set()

    // 收集当前页链接
    this.collectPageImageLinks(document, imageLinks)

    // 获取分页信息
    const paginationBox = document.querySelector(PAGE_DOM_SELECTORS.gallery.topNav)
    if (!paginationBox) return imageLinks

    const baseUri = `${location.origin}${location.pathname}`
    const totalPages = parseInt(Array.from(paginationBox.querySelectorAll('td')).slice(-2)[0]?.innerText || '1', 10)
    let currentPage = parseInt(
      paginationBox.querySelector(PAGE_DOM_SELECTORS.gallery.currentPage)?.querySelector('a')?.innerText || '0',
      10
    )

    popup.appendContent(
      `<b>${this.i18n.t('collectingLinks')}</b>`,
      this.i18n.t('startFromPage', { currentPage, totalPages })
    )

    // 遍历所有分页收集链接
    for (; currentPage < totalPages; currentPage++) {
      const pageUrl = `${baseUri}?p=${currentPage}`
      popup.appendContent(
        `${this.i18n.t('collectingPage', { currentPage })} <a target='_blank' href='${pageUrl}'>${this.i18n.t(
          'viewPage'
        )}</a>`
      )

      const pageDom = await Utils.fetchPageContent(pageUrl)
      await Utils.asyncTimeout(500)
      this.collectPageImageLinks(pageDom, imageLinks)
    }

    return imageLinks
  }

  /**
   * 从单页中收集图片详情页链接
   * @param {Document} dom - 页面DOM
   * @param {Set} linksSet - 存储链接的集合
   */
  collectPageImageLinks(dom, linksSet) {
    dom
      .querySelector(PAGE_DOM_SELECTORS.gallery.contentContainer)
      ?.querySelectorAll('a')
      ?.forEach(link => {
        if (link.href) linksSet.add(link.href)
      })
  }
}

/**
 * 自动加载管理器 - 处理页面滚动自动加载下一页功能
 */
class AutoLoader {
  constructor() {
    this.status = 'pending'
    this.previewStyleInserted = false
    this.i18n = i18n // 使用国际化服务
    this.init()
  }

  /**
   * 初始化自动加载功能
   */
  init() {
    const shouldAutoLoad = PAGE_PATH_CONFIGS.AUTO_LOAD_PATHS.some(pattern =>
      new RegExp(pattern).test(location.pathname)
    )

    if (shouldAutoLoad) {
      this.initAutoLoad()
    }
  }

  /**
   * 初始化自动加载功能
   * @param {number} threshold - 触发加载的滚动阈值（像素），默认1000
   */
  initAutoLoad(threshold = 1000) {
    let isProcessing = false
    const currentPath = location.pathname

    window.addEventListener('scroll', () => {
      if (!isProcessing && this.status === 'pending') {
        window.requestAnimationFrame(() => {
          if (new RegExp('^/g/').test(currentPath)) {
            this.autoLoadGalleryList()
          } else if (new RegExp('^/s/').test(currentPath)) {
            this.autoLoadImagePage()
          } else {
            this.autoLoadHomePage()
          }

          setTimeout(() => {
            isProcessing = false
          }, 300)
        })

        isProcessing = true
      }
    })
  }

  /**
   * 检查是否满足滚动加载条件
   * @param {HTMLElement} paginationBox - 分页容器元素
   * @returns {HTMLElement|null} 状态消息元素
   */
  checkScrollCondition(paginationBox) {
    if (!paginationBox) return null

    const distanceToBottom = paginationBox.getBoundingClientRect().y - document.documentElement.clientHeight
    if (distanceToBottom > 1000) return null

    let statusMessage = document.querySelector('#page-message')
    if (!statusMessage) {
      statusMessage = document.createElement('p')
      statusMessage.id = 'page-message'
      statusMessage.style.textAlign = 'center'
      paginationBox?.parentNode?.insertBefore(statusMessage, paginationBox)
    }

    return statusMessage
  }

  /**
   * 自动加载首页内容
   */
  async autoLoadHomePage() {
    const paginationBox = document.querySelectorAll(PAGE_DOM_SELECTORS.home.searchNav)?.[1]
    const statusMessage = this.checkScrollCondition(paginationBox)

    if (!statusMessage) return

    const nextPageLink = document.querySelector(PAGE_DOM_SELECTORS.home.bottomNext)?.href
    if (!nextPageLink) {
      this.status = 'non'
      statusMessage.innerText = this.i18n.t('allContentLoaded')
      return
    }

    try {
      this.status = 'loading'
      statusMessage.innerText = this.i18n.t('loadingNextPage')

      const nextPageDom = await Utils.fetchPageContent(nextPageLink)

      // 更新分页导航
      const newPagination = nextPageDom.querySelectorAll(PAGE_DOM_SELECTORS.home.searchNav)?.[1]
      if (newPagination) {
        paginationBox.innerHTML = newPagination.innerHTML
      }

      // 添加新内容
      const newContent = nextPageDom.querySelector(PAGE_DOM_SELECTORS.home.contentBody)?.children
      if (newContent) {
        document.querySelector(PAGE_DOM_SELECTORS.home.contentBody)?.append(...newContent)
      }

      if (this.status === 'loading') {
        this.status = 'pending'
        statusMessage.innerText = this.i18n.t('scrollToLoadMore')
      }
    } catch (error) {
      console.error('Auto load failed:', error)
      this.status = 'error'
      statusMessage.innerText = this.i18n.t('loadFailedRetry')
    }
  }

  /**
   * 自动加载画廊列表页内容
   */
  async autoLoadGalleryList() {
    const paginationBox = document.querySelector(PAGE_DOM_SELECTORS.gallery.bottomNav)
    const statusMessage = this.checkScrollCondition(paginationBox)

    if (!statusMessage) return

    const nextPageLink = paginationBox.querySelectorAll('td:last-child')?.[0]?.querySelector('a')?.href
    if (!nextPageLink) {
      this.status = 'non'
      statusMessage.innerText = this.i18n.t('allContentLoaded')
      return
    }

    try {
      this.status = 'loading'
      statusMessage.innerText = this.i18n.t('loadingNextPage')

      const nextPageDom = await Utils.fetchPageContent(nextPageLink)

      // 更新分页导航
      paginationBox.innerHTML = nextPageDom.querySelector(PAGE_DOM_SELECTORS.gallery.bottomNav).innerHTML

      // 添加新图片到列表
      const newImages = nextPageDom.querySelector(PAGE_DOM_SELECTORS.gallery.contentContainer)?.children
      if (newImages) {
        const contentContainer = document.querySelector(PAGE_DOM_SELECTORS.gallery.contentContainer)
        Array.from(newImages).forEach(child => contentContainer.appendChild(child))
      }

      if (this.status === 'loading') {
        this.status = 'pending'
        statusMessage.innerText = this.i18n.t('scrollToLoadMore')
      }
    } catch (error) {
      console.error('Auto load failed:', error)
      this.status = 'error'
      statusMessage.innerText = this.i18n.t('loadFailedRetry')
    }
  }

  /**
   * 自动加载图片查看页
   */
  async autoLoadImagePage() {
    const paginationBoxes = document.querySelectorAll(PAGE_DOM_SELECTORS.imageView.navBar)
    if (paginationBoxes.length < 2) return

    const statusMessage = this.checkScrollCondition(paginationBoxes[1])
    if (!statusMessage) return

    const [currentPage, totalPages] = Array.from(
      document.querySelector(PAGE_DOM_SELECTORS.imageView.pageNumber).querySelectorAll('span')
    ).map(span => span.innerText)

    if (currentPage === totalPages) {
      this.status = 'non'
      statusMessage.innerText = this.i18n.t('allImagesLoaded')
      return
    }

    const nextPageLink = paginationBoxes[1].querySelector(PAGE_DOM_SELECTORS.imageView.nextButton)?.href
    if (!nextPageLink) {
      throw new Error(this.i18n.t('nextPageLinkNotFound'))
    }

    try {
      this.status = 'loading'
      statusMessage.innerText = this.i18n.t('loadingNextImage')

      const nextPageDom = await Utils.fetchPageContent(nextPageLink)

      // 更新分页信息
      const newPagination = nextPageDom.querySelector(PAGE_DOM_SELECTORS.imageView.navBar)
      paginationBoxes.forEach(box => (box.innerHTML = newPagination.innerHTML))

      // 添加新图片内容
      const contentContainer = document.querySelector(PAGE_DOM_SELECTORS.imageView.contentContainer)
      const newContent = nextPageDom.querySelector(PAGE_DOM_SELECTORS.imageView.contentContainer).firstChild
      contentContainer.appendChild(newPagination.nextElementSibling)
      contentContainer.appendChild(newContent)

      // 添加预览样式（仅一次）
      if (!this.previewStyleInserted) {
        const style = document.createElement('style')
        style.textContent = `#i3 > div {color: #222;}`
        document.head.appendChild(style)
        this.previewStyleInserted = true
      }

      if (this.status === 'loading') {
        this.status = 'pending'
        statusMessage.innerText = this.i18n.t('scrollToLoadMore')
      }
    } catch (error) {
      console.error('Auto load failed:', error)
      this.status = 'error'
      statusMessage.innerText = this.i18n.t('loadFailedRetry')
    }
  }
}

// 创建模态框管理器实例
const modalManager = new ModalManager()

// 初始化各个功能模块
new TorrentDownloader(modalManager)
new ImageDownloader(modalManager)
new AutoLoader()
