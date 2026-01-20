'use strict'
import { TaskIndexedDB } from './db.js'
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

// ========== DB请求处理方法 ==========
async function handleDBRequest(request, sendResponse) {
  try {
    const { module, action, data } = request.payload
    if (!module || !action) {
    console.log('request.payload',!module,!action)
      sendResponse({ success: false, error: 'payload必须包含module(模块名)和action(方法名)' })
      return
    }
    const dbModule = TaskIndexedDB[module]
    if (!dbModule) {
      sendResponse({ success: false, error: `不存在的数据库模块: ${module}` })
      return
    }
    const dbAction = dbModule[action]
    if (!dbAction || typeof dbAction !== 'function') {
      sendResponse({ success: false, error: `模块【${module}】不存在方法: ${action}` })
      return
    }
    console.log(module, 'action:', dbAction)
    const result = await dbAction(...(Array.isArray(data) ? data : [data]))
    sendResponse({ success: true, data: result})
  } catch (err) {
    sendResponse({ success: false,  error: err.message || '数据库操作失败' })
  }
}

/**
 * 处理下载请求
 * @param {Object} request - 包含下载信息的请求对象
 * @param {function} sendResponse - 用于发送响应的回调函数
 */
function handleDownloadRequest(request, sendResponse) {
  try {
    const { url, filename, filepath } = request.payload

    // 验证下载URL
    if (!url || typeof url !== 'string') {
      throw new Error('无效的下载URL')
    }

    const downloadOptions = {
      url,
      filename: (filepath ? `${filepath}/` : '') + filename,
      saveAs: false
    }

    chrome.downloads.download(downloadOptions, downloadId => {
      if (chrome.runtime.lastError) {
        // console.error('下载启动失败:', chrome.runtime.lastError);
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message
        })
        return
      }

      // console.log(`下载已启动，ID: ${downloadId}`);
      sendResponse({
        success: true,
        downloadId
      })
    })
  } catch (error) {
    // console.error('处理下载请求时出错:', error);
    sendResponse({
      success: false,
      error: error.message
    })
  }

  // 表明将异步发送响应
  return true
}

async function chooseDefaultPath() {
  console.log(chrome.downloads)
  chrome.downloads.showDefaultFolder()
  return true
}

/**
 * 处理所有消息请求
 * @param {Object} request - 消息请求对象
 * @param {Object} sender - 发送者信息
 * @param {function} sendResponse - 响应回调函数
 */
function handleMessage(request, sender, sendResponse) {
  switch (request.type) {
    case 'DOWNLOAD':
      return handleDownloadRequest(request, sendResponse)

    case 'DOWNLOAD_PATH':
      return chooseDefaultPath(request, sendResponse)
    case 'DB':
      handleDBRequest(request, sendResponse)
      return true
    default:
      console.warn(`未处理的消息类型: ${request.type}`)
      sendResponse({ success: false, error: '未处理的消息类型' })
      return false
  }
}

// 注册事件监听器
chrome.runtime.onMessage.addListener(handleMessage)
// chrome.action.onClicked.addListener(() => chrome.tabs.create({ url: 'https://exhentai.org/' }))
