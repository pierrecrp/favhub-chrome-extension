chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "postFavorites") {
      // Todo Call API
      console.log(request.data) // favoris sélectionnés à envoyer dans le post
      sendResponse('created')
    }
  }
)
