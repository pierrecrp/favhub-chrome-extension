const button = document.querySelector('#clickMe');
const favoriteTemplate = document.querySelector('#favoriteTemplate');
const favoritesList = document.querySelector('#favoritesList');
const submitButton = document.querySelector('#submit');
const favoritesContainer = document.querySelector('.favorites-container');
const confirmationMessage = document.querySelector('#confirmation-message');
const errorMessage = document.querySelector('#error-message');

button.addEventListener('click', (event) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = tabs[0].url;
    let action;

    if (url.includes("vinted.fr")) {
      action = 'selectVintedFavorites';
    } else if (url.includes("leboncoin.fr")) {
      action = 'selectLeBonCoinFavorites';
    } else {
      console.error('Site non supporté');
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, { action: action }, function(response) {
      if (chrome.runtime.lastError) {
        console.error('Erreur:', chrome.runtime.lastError.message);
      } else {
        console.log(response);
        favoritesList.innerHTML = '';

        response.favorites.forEach(favorite => {
          const favoriteElement = favoriteTemplate.content.cloneNode(true);
          const favoriteDiv = favoriteElement.querySelector(".favorite");
          favoriteDiv.dataset.source = favorite.source;
          favoriteDiv.dataset.url = favorite.url;

          const imgElement = favoriteElement.querySelector('img');
          imgElement.src = favorite.image;
          imgElement.alt = favorite.title;

          const pElement = favoriteElement.querySelector('p');
          pElement.textContent = favorite.title;

          favoritesList.appendChild(favoriteElement);
        });
      }
    });
  });
});

submitButton.addEventListener('click', () => {
  const selectedFavorites = Array.from(favoritesList.querySelectorAll('.favorite'))
    .filter(favorite => favorite.querySelector('input[type="checkbox"]').checked)
    .map(favorite => ({
      title: favorite.querySelector('p').textContent,
      source: favorite.dataset.source,
      url: favorite.dataset.url,
    }));

  chrome.runtime.sendMessage({ action: 'postFavorites', data: selectedFavorites }, function(response) {
    if (response === 'created') {
      console.log(response);
      favoritesContainer.classList.add('d-none');
      confirmationMessage.classList.remove('d-none');
      submitButton.classList.add('d-none');


      const checkmarkContainer = document.querySelector('.checkmark-container');
      checkmarkContainer.style.display = 'flex';


    } else {
      console.error('Erreur lors de l\'ajout des favoris:', response);
      errorMessage.classList.remove('d-none');

      setTimeout(() => {
        errorMessage.classList.add('d-none');
      }, 3000);
    }
  });
});
