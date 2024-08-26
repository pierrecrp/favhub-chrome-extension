chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'selectFavorites') {
      // Initialiser un tableau vide
      // Pour tous les favoris 
        // Récupérer le titre
        // L'image
        // L'url 
        // (Sous de form de hash (object))
        // Le rentrer dans un tableau

      // Envoyer la liste des favoris au popup avec le la méthode sendResponse
    }
  }
);