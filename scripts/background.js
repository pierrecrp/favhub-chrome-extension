chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "postFavorites") {
      // Todo Call API
      fetch('http://favhub-212f785f0308.herokuapp.com/api/v1/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorites: request.data }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.status)
      })
      sendResponse('created')
    }
  }
)
