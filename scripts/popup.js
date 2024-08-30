const button = document.querySelector('#clickMe');
const favoriteTemplate = document.querySelector('#favoriteTemplate');
const favoritesList = document.querySelector('#favoritesList');
const submitButton = document.querySelector('#submit');
const favoritesContainer = document.querySelector('.favorites-container');
const confirmationMessage = document.querySelector('#confirmation-message');
const errorMessage = document.querySelector('#error-message');

const signIn = document.querySelector(".form-wrapper")
const welcome = document.querySelector(".welcome-wrapper")

const signInFetch = (signIn) => {
  signIn.addEventListener("submit", (event) => {
    event.preventDefault()
    const email = signIn.querySelector("input[name='email']").value
    const password = signIn.querySelector("input[name='password']").value
    fetch('http://favhub-212f785f0308.herokuapp.com/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      debugger
      chrome.storage.local.set({
        token: data.token,
        user: data.user
      })
      signIn.classList.add('d-none')
      welcome.classList.remove('d-none')
    })
  })
}

chrome.storage.local.get(['token'], function(result) {
  console.log(result.token)
  if (result.token) {
    signIn.classList.add('d-none')
    welcome.classList.remove('d-none')
  } else {
    signInFetch(signIn)
  }
})


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

        submitButton.classList.remove('d-none');
      }
    });
  });
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault()
  const selectedFavorites = Array.from(favoritesList.querySelectorAll('.favorite'))
    .filter(favorite => favorite.querySelector('input[type="checkbox"]').checked)
    .map(favorite => ({
      title: favorite.querySelector('p').textContent,
      source: favorite.dataset.source,
      url: favorite.dataset.url,
    }))

  chrome.runtime.sendMessage({ action: 'postFavorites', data: selectedFavorites }, function(response) {
    console.log(response)
    if (response === 'created') {
      console.log(response);
      favoritesContainer.classList.add('d-none');
      confirmationMessage.classList.remove('d-none');
      submitButton.classList.add('d-none');

      const checkmarkContainer = document.querySelector('.checkmark-container');
      checkmarkContainer.style.display = 'flex';

      document.documentElement.classList.add("little-box")

      document.getElementById('dashboardButton').classList.remove('d-none');
    } else {
      console.error('Erreur lors de l\'ajout des favoris:', response);
      errorMessage.classList.remove('d-none');

      setTimeout(() => {
        errorMessage.classList.add('d-none');
      }, 3000);
    }
  });
});

document.getElementById('dashboardButton').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://favhub-212f785f0308.herokuapp.com/dashboards' });
});

// http://favhub-212f785f0308.herokuapp.com/dashboards