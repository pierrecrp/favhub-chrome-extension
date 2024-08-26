const button = document.querySelector('#clickMe')
button.addEventListener('click', (event) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'selectFavorites' }), function(response) {
      
    };
  });
})