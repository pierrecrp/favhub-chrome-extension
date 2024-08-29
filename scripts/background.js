chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "postFavorites") {
      // Todo Call API

      fetch('http://localhost:3000/api/v1/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorites: request.data }),
      })
      .then(response => response.json())
      .then(data => {
        sendResponse(data.status)
      })
    }
  }
)
