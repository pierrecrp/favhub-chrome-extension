const button = document.querySelector('#clickMe');
const favoriteTemplate = document.querySelector('#favoriteTemplate');
const favoritesList = document.querySelector('#favoritesList');
const submitButton = document.querySelector('#submit');

button.addEventListener('click', (event) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'selectFavorites' }, function(response) {
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
