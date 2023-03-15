chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "open_popup") {
      chrome.action.openPopup();
    }
  });
  