chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "postFavorites") {
      // Todo Call API

      fetch('http://localhost:3000/api/v1/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request.data }),
      })
      .then(response => response.json())
      .then(data => {

      })

      console.log(request.data) // favoris sélectionnés à envoyer dans le post
      sendResponse('created')
    }
  }
)
