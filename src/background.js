'use strict'

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`

    // Log message coming from the `request` parameter
    console.log(request.payload.message)
    // Send a response message
    sendResponse({
      message
    })
  }

  if (request.type === 'DOWNLOAD') {
    const { url, name } = request.payload
    chrome.downloads.download(
      {
        url,
        filename: name || '',
        saveAs: false
      },
      function (downloadId) {
        console.log({ downloadId })
      }
    )
  }

  // 下载原图，这个默认打开图片会自己下载，然后自动关闭
  if (request.type === 'NEWTAB') {
    const { url } = request.payload
    chrome.tabs.create({ url, active: false })
  }
})
