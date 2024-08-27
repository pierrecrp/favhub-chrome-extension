const button = document.querySelector('#clickMe');
const favoriteTemplate = document.querySelector('#favoriteTemplate');
const favoritesList = document.querySelector('#favoritesList');
const submitButton = document.querySelector('#submit');

button.addEventListener('click', (event) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = tabs[0].url

    if (url.includes("vinted.fr")) {
    // if (tabs[0]// IF tabs[0] === url vinted à mettre ici et changer le nom de l'action
      chrome.tabs.sendMessage(tabs[0].id, { action: 'selectVintedFavorites' }, function(response) {
        if (chrome.runtime.lastError) {
          console.error('Erreur:', chrome.runtime.lastError.message);
        } else {
          console.log(response);
          console.log(favoritesList);
          favoritesList.innerHTML = '';

          response.favorites.forEach(favorite => {
            const favoriteElement = favoriteTemplate.content.cloneNode(true);

            const imgElement = favoriteElement.querySelector('img');
            imgElement.src = favorite.image;
            imgElement.alt = favorite.title;

            const pElement = favoriteElement.querySelector('p');
            pElement.textContent = favorite.title;

            favoritesList.appendChild(favoriteElement);
          });
        }
      });

    } else if (url.includes("leboncoin.fr")) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'selectLeBonCoinFavorites' }, function(response) {
        if (chrome.runtime.lastError) {
          console.error('Erreur:', chrome.runtime.lastError.message);
        } else {
          console.log(response);
          favoritesList.innerHTML = '';

          response.favorites.forEach(favorite => {
            const favoriteElement = favoriteTemplate.content.cloneNode(true);

            const imgElement = favoriteElement.querySelector('img');
            imgElement.src = favorite.image;
            imgElement.alt = favorite.title;

            const pElement = favoriteElement.querySelector('p');
            pElement.textContent = favorite.title;

            favoritesList.appendChild(favoriteElement);
          });
        }
      });
    }
  });
});

submitButton.addEventListener('click', () => {
  const selectedFavorites = Array.from(favoritesList.querySelectorAll('.favorite'))
    .filter(favorite => favorite.querySelector('input[type="checkbox"]').checked)
    .map(favorite => ({
      title: favorite.querySelector('p').textContent,
      image: favorite.querySelector('img').src
    }));
});
