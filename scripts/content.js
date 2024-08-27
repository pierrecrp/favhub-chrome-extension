chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request)
    
    let favoritesList = [];
    // Changer le nom de l'action

    if (request.action === 'selectLeBonCoinFavorites') {
      document.querySelectorAll("div[data-test-id='adcard-outlined']").forEach(favorite => {
        const image = favorite.querySelector("._2JtY0 img")
        const srcImage = image?.src ? image.src : "../images/logo-favhub.png";
        favoritesList.push({
          title: favorite.querySelector("p[data-qa-id='aditem_title']").innerText,
          image: srcImage,
          url: favorite.parentElement.href,
          source: "leboncoin",
        });
      });
  
      console.log(favoritesList)
      sendResponse({ favorites: favoritesList });

    
  } else if (request.action === 'selectVintedFavorites') {
      document.querySelectorAll(".feed-grid__item-content").forEach(favorite => {
        console.log(favorite.querySelector("div[data-testid='product-item']"))
        favoritesList.push({
          title: favorite.querySelector(".new-item-box__description p").innerText,
          image: favorite.querySelector(".new-item-box__image .web_ui__Image__content").src,
          url: favorite.querySelector(".u-position-relative a").href,
          source: "leboncoin",
        });
      });

      console.log(favoritesList)
      sendResponse({ favorites: favoritesList });
    }

    
    
  }
);
