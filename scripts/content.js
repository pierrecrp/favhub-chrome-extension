chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let favoritesList = [];
    if (request.action === 'selectFavorites') {
      document.querySelectorAll("div[data-test-id='adcard-outlined']").forEach(favorite => {
        favoritesList.push({
          title: favorite.querySelector("p[data-qa-id='aditem_title']").innerText,
          image: favorite.querySelector("._2JtY0 img").src,
          url: favorite.parentElement.href,
        });
      });
    }
    sendResponse({ favorites: favoritesList });
  }
);
