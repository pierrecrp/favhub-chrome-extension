chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let favoritesList = [];
    if (request.action === 'selectFavorites') {
      document.querySelectorAll("div[data-test-id='adcard-outlined']").forEach(favorite => {
        const image = favorite.querySelector("._2JtY0 img")
        const srcImage = image?.src ? image.src : "../images/logo-favhub.png";
        favoritesList.push({
          title: favorite.querySelector("p[data-qa-id='aditem_title']").innerText,
          image: srcImage,
          url: favorite.parentElement.href,
        });
      });
    }
    sendResponse({ favorites: favoritesList });
  }
);
