'use strict';

/**
 * 文字常量定义 - 包含中英文版本
 */
const TEXT_CONSTANTS = {
  zh: {
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
    linksCollected: '链接收集完成，共获取到${imageLinks.size}张图片',
    startDownloadImages: '开始下载图片',
    downloadingFile: '正在下载：${fileName}',
    downloadFailed: '下载失败：${link} <br> 错误：${error.message}',
    partialDownloadComplete: '下载完成，共 ${errorLinks.length} 个文件下载失败】',
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
    allImagesLoaded: '已加载全部图片'
  },
  en: {
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
    downloadSelectionContent: 'This gallery has ${torrentCount} torrent files. It is recommended to download the torrent (faster speed).',
    continueDownloadImages: 'Continue downloading images',
    downloadTorrentFile: 'Download torrent file',
    loadingNextPage: 'Loading next page...',
    scrollToLoadMore: 'Scroll to load more content',
    loadFailedRetry: 'Load failed, try scrolling to retry',
    allContentLoaded: 'All content loaded',
    loadingNextImage: 'Loading next image...',
    allImagesLoaded: 'All images loaded'
  }
};

/**
 * 获取当前语言（根据浏览器设置）
 * @returns {string} 语言代码 'zh' 或 'en'
 */
const getCurrentLang = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.includes('zh') ? 'zh' : 'en';
};

// 当前语言
const CURRENT_LANG = getCurrentLang();
// 当前语言对应的文本
const TEXT = TEXT_CONSTANTS[CURRENT_LANG];

/**
 * 页面DOM选择器常量配置
 * 按不同页面类型分类存储选择器
 */
const PAGE_DOM_SELECTORS = {
  // 首页相关选择器 (https://exhentai.org/)
  home: {
    contentTable: '.gltm',       // 首页内容表格
    contentBody: '.itg',         // 首页内容主体
    bottomNext: '#dnext',        // 底部下一页按钮
    topNext: '#unext',           // 顶部下一页按钮
    topPane: '#toppane',         // 顶部搜索块
    searchNav: '.searchnav',      // 分页导航栏
    torrentIcon: '.gldown > a',  // 下载种子icon
  },
  // 图片详情列表页选择器 (https://exhentai.org/g/2374482/33d2ec5afc/)
  gallery: {
    topNav: '.ptt',              // 顶部分页导航
    bottomNav: '.ptb',           // 底部分页导航
    currentPage: '.ptds',        // 当前选中页码
    contentContainer: '#gdt',     // 列表内容容器
    asidePane: '#gd5 a',        // 画廊详情页侧边栏
    title: '#gn', //画廊标题
  },
  // 图片查看页选择器 (https://exhentai.org/s/d1c20fcadc/2374482-1)
  imageView: {
    pt: '#i2',                   // 顶部信息区
    pb: '#i4',                   // 底部信息区
    nextButton: '#next',         // 下一页按钮
    contentContainer: '#i3',      // 图片容器
    title: '#i2 > div', //图片标题
    imageUrl: '#i6 > div:last-child a', //图片地址
    navBar: '.sn', //翻页工具栏
    pageNumber: '.sn > div', //翻页工具栏中的页码
  }
};

/**
 * 需要加载下载按钮的页面路径正则常量
 */
const INCLUDE_DOWNLOAD_BUTTON_PATHS = [
  '^/$',               // 首页
  '^/watched',         // 已观看页面
  '^/favorites',       // 收藏页面
  '^/torrents',        // 种子页面
  '^/uploader',        // 上传者页面
  '^/popular'          // 热门页面
];

/**
 * 需要自动加载下一页的页面路径正则常量
 */
const AUTO_LOAD_PATHS = [
  '^/$',               // 首页
  '^/watched',         // 已观看页面
  '^/favorites',       // 收藏页面
  '^/g/',              // 画廊详情页
  '^/s/',              // 图片详情页
  '^/tag/'             // 标签页面
];


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
    return new Promise(resolve => setTimeout(resolve, timer));
  }

  /**
   * 向页面插入CSS样式
   * @param {string} css - CSS代码
   */
  static insertStyle(css) {
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  }

  /**
   * 创建带内容的元素
   * @param {string} html - HTML内容
   * @param {string} tag - 元素标签，默认p
   * @returns {HTMLElement} 创建的元素
   */
  static createElementWithContent(html, tag = 'p') {
    const element = document.createElement(tag);
    element.innerHTML = html;
    return element;
  }

  /**
   * 获取指定URL的页面内容
   * @param {string} url - 页面URL
   * @returns {Promise<Document>} 页面DOM对象
   */
  static fetchPageContent(url) {
    if (!url) return document
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
          return response.text();
        })
        .then(html => {
          const tempDoc = document.createElement('html');
          tempDoc.innerHTML = html;
          resolve(tempDoc);
        })
        .catch(error => reject(error));
    });
  }

  /**
   * 通过a标签下载文件（备用方法）
   * @param {string|Blob} href - 下载链接或Blob对象
   * @param {string} name - 文件名
   */
  static downloadViaLink(href, name = '') {
    const link = document.createElement('a');
    link.download = name;

    if (typeof href === 'string') {
      link.href = href;
    } else {
      link.href = URL.createObjectURL(href);
    }

    link.click();
    URL.revokeObjectURL(link.href);  // 释放资源
  }
}


/**
 * 模态框管理器 - 处理模态框的创建、显示和关闭
 */
class ModalManager {
  constructor() {
    this.popup = {};  // 存储模态框相关DOM元素
  }

  /**
   * 打开模态框
   * @param {Object} options - 模态框配置
   * @param {string|HTMLElement} options.title - 标题
   * @param {string|HTMLElement|boolean} options.content - 内容，true表示需要动态添加
   * @param {string|HTMLElement|Array} options.footer - 底部内容
   * @param {boolean} options.maskClose - 点击遮罩是否关闭
   */
  openModal(options) {
    // 清除现有模态框内容
    if (this.popup.body) {
      this.popup.body.innerHTML = '';
      delete this.popup.title;
      delete this.popup.content;
      delete this.popup.footer;
    } else {
      // 创建模态框基本结构
      const overlay = document.createElement('div');
      overlay.style = `
        background: rgba(0,0,0,.7);
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 9999;
      `;

      const modalBody = document.createElement('div');
      modalBody.id = 'popup-body';
      modalBody.style = `
        position: absolute;
        background: #363940;
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
        color: #fff;
      `;

      // 阻止模态框内部点击事件冒泡到遮罩
      modalBody.addEventListener('click', e => e.stopPropagation(), false);

      this.popup.overlay = overlay;
      this.popup.body = modalBody;
    }

    // 配置遮罩点击关闭功能
    if (options.maskClose) {
      this.popup.overlay.addEventListener('click', () => this.closeModal(), false);
    } else {
      this.popup.overlay.removeEventListener('click', () => this.closeModal(), false);
    }

    // 添加标题
    if (options.title) {
      this.popup.title = document.createElement('h3');
      this.popup.title.style.margin = '0 0 15px 0';
      this.popup.title.style.color = '#fff';

      if (typeof options.title === 'string') {
        this.popup.title.innerHTML = options.title;
      } else {
        this.popup.title.appendChild(options.title);
      }

      this.popup.body.appendChild(this.popup.title);
    }

    // 添加内容区域
    if (options.content) {
      this.popup.content = document.createElement('div');
      this.popup.content.style = `
        padding-bottom: 20px;
        overflow-y: auto;
        max-height: 60vh;
        color: #ddd;
      `;

      // 处理内容
      if (typeof options.content === 'string') {
        this.popup.content.innerHTML = options.content;
      } else if (options.content !== true) {
        this.popup.content.appendChild(options.content);
      }

      this.popup.body.appendChild(this.popup.content);

      // 添加动态内容追加方法
      this.popup.appendContent = (...args) => {
        const elements = args.map(content => Utils.createElementWithContent(content));
        this.popup.content.append(...elements);
        // 自动滚动到底部
        this.popup.content.scrollTop = this.popup.content.scrollHeight;
      };
    }

    // 添加底部内容
    if (options.footer) {
      this.popup.footer = document.createElement('div');
      this.popup.footer.style = 'display: flex; padding-top: 10px; gap: 10px; justify-content: center';

      if (Array.isArray(options.footer)) {
        options.footer.forEach(item => this.popup.footer.appendChild(item));
      } else {
        this.popup.footer.appendChild(options.footer);
      }

      this.popup.body.appendChild(this.popup.footer);
    }

    // 显示模态框
    this.popup.overlay.appendChild(this.popup.body);
    document.body.appendChild(this.popup.overlay);

    return this.popup;
  }

  /**
   * 关闭模态框
   */
  closeModal() {
    if (this.popup.overlay && document.body.contains(this.popup.overlay)) {
      document.body.removeChild(this.popup.overlay);
    }
    this.popup = {};  // 清空引用
  }

  /**
   * 获取当前模态框实例
   */
  getCurrentPopup() {
    return this.popup;
  }
}


/**
 * 种子下载管理器 - 处理种子批量下载功能
 */
class TorrentDownloader {
  constructor(modalManager) {
    this.status = 'pending';  // 状态: pending, downloading, pause
    this.modalManager = modalManager;
    this.init();
  }

  /**
   * 初始化种子下载功能
   */
  init() {
    this.createDownloadButton();
  }

  /**
   * 创建批量下载按钮并添加到页面
   */
  createDownloadButton() {
    const { pathname } = document.location;

    // 检查当前页面是否需要添加下载按钮
    if (INCLUDE_DOWNLOAD_BUTTON_PATHS.some(pattern => new RegExp(pattern).test(pathname))) {
      const downloadBtn = document.createElement('input');
      downloadBtn.type = 'button';
      downloadBtn.id = 'btn-download';
      downloadBtn.value = TEXT.downloadAllTorrentBtn;
      downloadBtn.title = TEXT.downloadAllTorrentTitle;
      downloadBtn.addEventListener('click', () => this.downloadAllTorrents());

      // 尝试在表单中插入按钮
      const formElement = document.querySelector('form');
      if (formElement) {
        const existingButtons = formElement.querySelectorAll("input[type='button']");
        if (existingButtons.length) {
          const lastButton = existingButtons[existingButtons.length - 1];
          lastButton.parentNode.insertBefore(downloadBtn, lastButton.nextElementSibling);
        }
      } else {
        // 表单不存在时，在顶部面板添加按钮
        const topPane = document.querySelector(PAGE_DOM_SELECTORS.home.topPane);
        if (topPane) {
          const buttonContainer = document.createElement('div');
          buttonContainer.style = 'text-align:center';
          buttonContainer.appendChild(downloadBtn);
          topPane.appendChild(buttonContainer);
        }
      }
    }
  }

  /**
   * 批量下载所有种子的主函数
   */
  async downloadAllTorrents() {
    // 打开下载进度模态框
    const popup = this.modalManager.openModal({
      title: TEXT.downloadModalTitle,
      content: true
    });

    let currentPage = 1;
    let currentDom = document; // 当前页面DOM引用，初始为当前文档

    // 循环处理所有分页，直到没有下一页
    while (currentDom) {
      popup.appendContent(`<small>${TEXT.pageLabel.replace('${currentPage}', currentPage)}</small>`);

      // 收集当前页的种子链接
      await this.collectTorrentLinks(currentDom, popup);

      // 获取下一页元素及链接
      const nextPageElement = currentDom.querySelector(PAGE_DOM_SELECTORS.home.topNext);
      const nextPageUrl = nextPageElement?.href;

      // 准备处理下一页或结束循环
      if (nextPageUrl) {
        currentDom = await Utils.fetchPageContent(nextPageUrl);
        currentPage++;
      } else {
        currentDom = null; // 无下一页时终止循环
      }
    }

    popup.appendContent(TEXT.downloadCompleteMsg);
  }

  /**
   * 从指定DOM中收集所有种子下载链接
   * @param {Document} dom - 页面DOM对象
   * @param {Object} popup - 模态框对象
   */
  async collectTorrentLinks(dom, popup) {
    let urls = [];
    const isTorrentPage = location.pathname.startsWith('/torrents');

    // 种子页面和普通页面的链接选择方式不同
    if (isTorrentPage) {
      urls = Array.from(dom.querySelector(PAGE_DOM_SELECTORS.home.contentBody).querySelectorAll('a[rel="nofollow"]'))
        .map(link => link.href?.replace(/&gtid=\d+/, ''));
    } else {
      urls = Array.from(dom.querySelector(PAGE_DOM_SELECTORS.home.contentBody).querySelectorAll(PAGE_DOM_SELECTORS.home.torrentIcon))
        .map(link => link?.href);
    }

    // 创建隐藏的iframe用于解析种子页面
    const iframe = this.createIframe('iframe-download-all');
    for (let i = 0; i < urls.length; i++) {
      if (urls[i]) {
        // 加载iframe并等待完成
        await this.loadIframeContent(iframe, urls[i]);

        // 获取种子页面中的所有表单（每个表单对应一个种子）
        const torrentForms = iframe.contentDocument.querySelectorAll('form');

        // 获取当前种子页面标题
        const pageTitle = iframe.contentDocument.querySelector('h1').innerText;
        popup.appendContent(`<li>${pageTitle}</li>`);

        // 筛选最新的种子（按时间排序）
        let latestTorrent = { date: 0 };
        torrentForms.forEach(form => {
          // 获取种子时间
          const dateText = form.querySelector('td > span:last-child')?.textContent;
          const dateTime = new Date(dateText).getTime();

          // 获取种子下载链接
          const torrentLink = form.querySelector('a');

          // 更新最新种子信息
          if (torrentLink && latestTorrent.date < dateTime) {
            latestTorrent = {
              date: dateTime,
              torrentUrl: torrentLink.href,
              fileName: torrentLink.innerText + '.torrent'
            };
          }
        });

        // 提取画廊链接信息
        const [, galleryId, , galleryToken] = iframe.contentDocument.location.search.match(/([0-9A-Za-z]+)/g) || [];
        latestTorrent.galleryLink = `https://exhentai.org/g/${galleryId}/${galleryToken}`;

        // 发送下载请求
        this.downloadFile(latestTorrent.torrentUrl, latestTorrent.fileName);

        // 避免请求过于频繁
        await Utils.asyncTimeout(1000);
      }
    }
  }

  /**
   * 发送下载请求到扩展主程序
   * @param {string} url - 下载链接
   * @param {string} filename - 文件名
   */
  downloadFile(url, filename = '') {
    chrome.runtime.sendMessage({
      type: 'DOWNLOAD',
      payload: { url, filename }
    });
  }

  /**
   * 加载iframe内容并等待完成
   * @param {HTMLIFrameElement} iframe - iframe元素
   * @param {string} src - 要加载的URL
   * @returns {Promise} 加载完成的Promise
   */
  loadIframeContent(iframe, src) {
    return new Promise(resolve => {
      iframe.src = src;
      iframe.onload = () => resolve();
    });
  }

  /**
   * 创建隐藏的iframe用于页面解析
   * @param {string} id - iframe的ID
   * @returns {HTMLIFrameElement} 创建的iframe元素
   */
  createIframe(id) {
    let iframe = document.querySelector(`#${id}`);
    if (iframe) {
      return iframe;
    }

    iframe = document.createElement('iframe');
    iframe.id = id;
    iframe.width = 0;
    iframe.height = 0;
    iframe.style.display = 'none';  // 隐藏iframe
    document.body.appendChild(iframe);
    return iframe;
  }
}


/**
 * 图片下载管理器 - 处理原图批量下载功能
 */
class ImageDownloader {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.init();
  }

  /**
   * 初始化图片下载功能
   */
  init() {
    // 在画廊详情页（/g/路径）初始化下载原图功能
    if (new RegExp('^/g/').test(location.pathname)) {
      this.initDownloadFullImage();
    }
  }

  /**
   * 初始化下载原图功能，添加下载按钮到页面
   */
  initDownloadFullImage() {
    // 添加自定义按钮样式
    const customCss = `
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
    `;
    Utils.insertStyle(customCss);

    // 创建下载按钮
    const downloadBtn = document.createElement('div');
    downloadBtn.className = 'tha nosel custom-btn';
    downloadBtn.innerText = TEXT.downloadAllImagesBtn;
    downloadBtn.title = TEXT.downloadAllImagesTitle;
    downloadBtn.addEventListener('click', () => this.handleDownloadFullImage(), false);

    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style = 'text-align:center; margin-bottom: 5px';
    buttonContainer.appendChild(downloadBtn);

    // 将按钮插入到顶部导航上方
    const topNav = document.querySelector(PAGE_DOM_SELECTORS.gallery.topNav);
    topNav?.parentNode?.insertBefore(buttonContainer, topNav);
  }

  /**
   * 处理下载原图的点击事件
   */
  async handleDownloadFullImage() {
    // 检查是否有可用的种子文件
    const torrentLinks = Array.from(document.querySelectorAll(PAGE_DOM_SELECTORS.gallery.asidePane));
    const torrentLink = torrentLinks.find(link => /torrent.*\d+/i.test(link.innerText));
    const torrentCount = torrentLink ? parseInt(torrentLink.innerText.match(/\d+/)[0], 10) : 0;

    if (torrentCount > 0) {
      // 有种子文件时，显示选择对话框
      const imageBtn = document.createElement('div');
      imageBtn.innerText = TEXT.continueDownloadImages;
      imageBtn.className = 'tha nosel custom-btn';
      imageBtn.addEventListener('click', () => this.downloadFullImage(), false);

      const torrentBtn = document.createElement('div');
      torrentBtn.innerText = TEXT.downloadTorrentFile;
      torrentBtn.className = 'ths nosel custom-btn';
      torrentBtn.addEventListener('click', () => {
        torrentLink.click();
        this.modalManager.closeModal();
      }, false);

      this.modalManager.openModal({
        maskClose: true,
        title: TEXT.downloadSelectionTitle,
        content: TEXT.downloadSelectionContent.replace('${torrentCount}', torrentCount),
        footer: [imageBtn, torrentBtn]
      });
    } else {
      // 没有种子文件，直接下载图片
      this.downloadFullImage();
    }
  }

  /**
   * 下载所有原图的主函数
   */
  async downloadFullImage() {
    // 打开下载进度模态框
    const popup = this.modalManager.openModal({
      title: `${TEXT.downloadAllImagesBtn}：${document.querySelector(PAGE_DOM_SELECTORS.gallery.title)?.innerText || '未知画廊'}`,
      content: true
    });

    const errorLinks = [];  // 存储下载失败的链接
    // 1. 获取所有图片详情页链接
    const imageLinks = await this.collectImageLinks(popup);
    popup.appendContent(
      TEXT.linksCollected.replace('${imageLinks.size}', imageLinks.size), 
      `<b>${TEXT.startDownloadImages}</b>`
    );

    // 2. 依次下载每张图片
    for (const link of imageLinks) {
      try {
        const pageDom = await Utils.fetchPageContent(link);
        // 获取图片标题和文件名
        const titleElement = Array.from(pageDom.querySelectorAll(PAGE_DOM_SELECTORS.imageView.title)).pop();
        const titleText = titleElement?.innerText || '未知图片';
        const galleryId = location.pathname.match(/g\/(\d+)/)?.[1] || 'unknown';
        const fileName = `${galleryId} - ${titleText.split('::')[0].replace(/ /g, '')}.jpg`;

        // 获取原图链接
        const imageUrl = pageDom.querySelector(PAGE_DOM_SELECTORS.imageView.imageUrl)?.href;

        popup.appendContent(TEXT.downloadingFile.replace('${fileName}', fileName));

        if (!imageUrl) {
          throw new Error(CURRENT_LANG === 'zh' ? '未找到原图链接' : 'Original image link not found');
        }

        // 发送下载请求
        chrome.runtime.sendMessage({
          type: 'DOWNLOAD',
          payload: { url: imageUrl, filename: fileName }
        });

        // 控制下载速度，避免请求过于频繁
        await Utils.asyncTimeout(1000);
      } catch (error) {
        errorLinks.push(link);
        popup.appendContent(
          TEXT.downloadFailed
            .replace('${link}', link)
            .replace('${error.message}', error.message)
        );
      }
    }

    if (errorLinks.length > 0) {
      popup.appendContent(`<b>${TEXT.partialDownloadComplete.replace('${errorLinks.length}', errorLinks.length)}</b>`);
    } else {
      popup.appendContent(`<b>${TEXT.allDownloadComplete}</b>`);
    }
  }

  /**
   * 收集所有图片详情页链接（包括分页）
   * @param {Object} popup - 模态框对象
   * @returns {Promise<Set>} 图片链接集合
   */
  async collectImageLinks(popup) {
    const imageLinks = new Set();

    // 1. 收集当前页链接
    this.collectPageImageLinks(document, imageLinks);

    // 2. 获取分页信息
    const baseUri = `${location.origin}${location.pathname}`;
    const paginationBox = document.querySelector(PAGE_DOM_SELECTORS.gallery.topNav);

    if (!paginationBox) {
      return imageLinks;
    }

    // 解析总页数和当前页
    const totalPages = parseInt(Array.from(paginationBox.querySelectorAll('td')).slice(-2)[0]?.innerText || '1', 10);
    let currentPage = parseInt(paginationBox.querySelector(PAGE_DOM_SELECTORS.gallery.currentPage)?.querySelector('a')?.innerText || '0', 10);

    popup.appendContent(
      `<b>${TEXT.collectingLinks}</b>`, 
      TEXT.startFromPage
        .replace('${currentPage}', currentPage)
        .replace('${totalPages}', totalPages)
    );

    // 3. 遍历所有分页收集链接
    for (; currentPage < totalPages; currentPage++) {
      const pageUrl = `${baseUri}?p=${currentPage}`;
      popup.appendContent(
        `${TEXT.collectingPage.replace('${currentPage}', currentPage)} <a target='_blank' href='${pageUrl}'>${TEXT.viewPage}</a>`
      );

      const pageDom = await Utils.fetchPageContent(pageUrl);
      await Utils.asyncTimeout(500);  // 短暂延迟，避免请求过快
      this.collectPageImageLinks(pageDom, imageLinks);
    }

    return imageLinks;
  }

  /**
   * 从单页中收集图片详情页链接
   * @param {Document} dom - 页面DOM
   * @param {Set} linksSet - 存储链接的集合
   */
  collectPageImageLinks(dom, linksSet) {
    dom
      ?.querySelector(PAGE_DOM_SELECTORS.gallery.contentContainer)  // 图片列表容器
      ?.querySelectorAll('a')  // 所有图片链接
      ?.forEach(link => link.href && linksSet.add(link.href));
  }
}


/**
 * 自动加载管理器 - 处理页面滚动自动加载下一页功能
 */
class AutoLoader {
  constructor() {
    this.status = 'pending';  // 状态: non, pending, loading, error
    this.previewStyleInserted = false;
    this.init();
  }

  /**
   * 初始化自动加载功能
   */
  init() {
    // 在匹配的页面初始化自动加载功能
    if (AUTO_LOAD_PATHS.some(pattern => new RegExp(pattern).test(location.pathname))) {
      this.initAutoLoad();
    }
  }

  /**
   * 初始化自动加载功能
   * 监听滚动事件，当接近页面底部时加载下一页
   * @param {number} threshold - 触发加载的滚动阈值（像素）
   */
  initAutoLoad(threshold = 1000) {
    let isProcessing = false;  // 防止重复触发

    const currentPath = location.pathname;

    // 监听滚动事件
    window.addEventListener('scroll', () => {
      // 仅在等待状态且未在处理中时触发
      if (!isProcessing && this.status === 'pending') {
        window.requestAnimationFrame(() => {
          // 根据页面类型执行不同的加载逻辑
          if (new RegExp('^/g/').test(currentPath)) {
            // 画廊列表页
            this.autoLoadGalleryList();
          } else if (new RegExp('^/s/').test(currentPath)) {
            // 图片详情页
            this.autoLoadImagePage();
          } else {
            // 首页等其他列表页
            this.autoLoadHomePage();
          }

          // 短暂延迟后允许再次触发
          setTimeout(() => {
            isProcessing = false;
          }, 300);
        });

        isProcessing = true;
      }
    });
  }

  /**
   * 检查是否满足滚动加载条件
   * @param {HTMLElement} paginationBox - 分页容器元素
   * @returns {HTMLElement|null} 状态消息元素，不满足条件时返回null
   */
  checkScrollCondition(paginationBox) {
    if (!paginationBox) {
      return null;
    }

    // 计算分页容器距离底部的距离
    const distanceToBottom = paginationBox.getBoundingClientRect().y - document.documentElement.clientHeight;
    // 距离底部超过阈值则不加载
    if (distanceToBottom > 1000) {
      return null;
    }

    // 创建或获取状态消息元素
    let statusMessage = document.querySelector('#page-message');
    if (!statusMessage) {
      statusMessage = document.createElement('p');
      statusMessage.id = 'page-message';
      statusMessage.style.textAlign = 'center';
      paginationBox?.parentNode?.insertBefore(statusMessage, paginationBox);
    }

    return statusMessage;
  }

  /**
   * 自动加载首页内容
   */
  async autoLoadHomePage() {
    const paginationBox = document.querySelectorAll(PAGE_DOM_SELECTORS.home.searchNav)?.[1];
    const statusMessage = this.checkScrollCondition(paginationBox);

    if (!statusMessage) {
      return;
    }

    // 获取下一页链接
    const nextPageLink = document.querySelector(PAGE_DOM_SELECTORS.home.bottomNext)?.href;
    if (nextPageLink) {
      try {
        this.status = 'loading';
        statusMessage.innerText = TEXT.loadingNextPage;

        // 获取下一页内容
        const nextPageDom = await Utils.fetchPageContent(nextPageLink);

        // 更新分页导航
        const newPagination = nextPageDom.querySelectorAll(PAGE_DOM_SELECTORS.home.searchNav)?.[1];
        if (newPagination) {
          paginationBox.innerHTML = newPagination.innerHTML;
        }

        // 添加新内容到当前页
        const newContent = nextPageDom.querySelector(PAGE_DOM_SELECTORS.home.contentBody)?.children;
        if (newContent) {
          document.querySelector(PAGE_DOM_SELECTORS.home.contentBody)?.append(...newContent);
        }

        // 恢复等待状态（如果未被其他操作改变）
        if (this.status === 'loading') {
          this.status = 'pending';
          statusMessage.innerText = TEXT.scrollToLoadMore;
        }
      } catch (error) {
        console.error('Auto load failed:', error);
        this.status = 'error';
        statusMessage.innerText = TEXT.loadFailedRetry;
      }
    } else {
      // 没有下一页
      this.status = 'non';
      statusMessage.innerText = TEXT.allContentLoaded;
    }
  }

  /**
   * 自动加载画廊列表页内容
   */
  async autoLoadGalleryList() {
    const paginationBox = document.querySelector(PAGE_DOM_SELECTORS.gallery.bottomNav);
    const statusMessage = this.checkScrollCondition(paginationBox);

    if (!statusMessage) {
      return;
    }

    // 获取下一页链接
    const nextPageLink = paginationBox.querySelectorAll('td:last-child')?.[0]?.querySelector('a')?.href;
    if (nextPageLink) {
      try {
        this.status = 'loading';
        statusMessage.innerText = TEXT.loadingNextPage;

        // 获取下一页内容
        const nextPageDom = await Utils.fetchPageContent(nextPageLink);

        // 更新分页导航
        paginationBox.innerHTML = nextPageDom.querySelector(PAGE_DOM_SELECTORS.gallery.bottomNav).innerHTML;

        // 添加新图片到列表
        const newImages = nextPageDom.querySelector(PAGE_DOM_SELECTORS.gallery.contentContainer)?.children;
        if (newImages) {
          const contentContainer = document.querySelector(PAGE_DOM_SELECTORS.gallery.contentContainer);
          Array.from(newImages).forEach(child => {
            contentContainer.appendChild(child);
          });
        }

        // 恢复等待状态
        if (this.status === 'loading') {
          this.status = 'pending';
          statusMessage.innerText = TEXT.scrollToLoadMore;
        }
      } catch (error) {
        console.error('Auto load failed:', error);
        this.status = 'error';
        statusMessage.innerText = TEXT.loadFailedRetry;
      }
    } else {
      // 没有下一页
      this.status = 'non';
      statusMessage.innerText = TEXT.allContentLoaded;
    }
  }

  /**
   * 自动加载图片查看页（下一张图片）
   */
  async autoLoadImagePage() {
    const paginationBoxes = document.querySelectorAll(PAGE_DOM_SELECTORS.imageView.navBar);
    if (paginationBoxes.length < 2) return;

    const statusMessage = this.checkScrollCondition(paginationBoxes[1]);
    if (!statusMessage) {
      return;
    }

    // 检查是否有下一页
    const [currentPage, totalPages] = Array.from(document.querySelector(PAGE_DOM_SELECTORS.imageView.pageNumber).querySelectorAll('span'))
      .map(span => span.innerText);

    if (currentPage !== totalPages) {
      try {
        this.status = 'loading';
        statusMessage.innerText = TEXT.loadingNextImage;

        // 获取下一页链接并加载内容
        const nextPageLink = paginationBoxes[1].querySelector(PAGE_DOM_SELECTORS.imageView.nextButton)?.href;
        if (!nextPageLink) throw new Error(CURRENT_LANG === 'zh' ? '未找到下一页链接' : 'Next page link not found');

        const nextPageDom = await Utils.fetchPageContent(nextPageLink);

        // 更新分页信息
        const newPagination = nextPageDom.querySelector(PAGE_DOM_SELECTORS.imageView.navBar);
        paginationBoxes.forEach(box => {
          box.innerHTML = newPagination.innerHTML;
        });

        // 添加新图片内容
        const contentContainer = document.querySelector(PAGE_DOM_SELECTORS.imageView.contentContainer);
        const newContent = nextPageDom.querySelector(PAGE_DOM_SELECTORS.imageView.contentContainer).firstChild;
        contentContainer.appendChild(newPagination.nextElementSibling);
        contentContainer.appendChild(newContent);

        // 添加预览样式（仅一次）
        if (!this.previewStyleInserted) {
          const style = document.createElement('style');
          style.textContent = `#i3 > div {color: #222;}`;
          document.head.appendChild(style);
          this.previewStyleInserted = true;
        }

        // 恢复等待状态
        if (this.status === 'loading') {
          this.status = 'pending';
          statusMessage.innerText = TEXT.scrollToLoadMore;
        }
      } catch (error) {
        console.error('Auto load failed:', error);
        this.status = 'error';
        statusMessage.innerText = TEXT.loadFailedRetry;
      }
    } else {
      // 没有下一页
      this.status = 'non';
      statusMessage.innerText = TEXT.allImagesLoaded;
    }
  }
}


// 创建模态框管理器实例（作为公共依赖）
const modalManager = new ModalManager();

// 初始化各个功能模块
new TorrentDownloader(modalManager);
new ImageDownloader(modalManager);
new AutoLoader();