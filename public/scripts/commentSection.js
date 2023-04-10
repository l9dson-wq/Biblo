const loadMoreButton = document.getElementById("load-more");
const firstCommentsContainer = document.getElementById("first-comments");
const remainingCommentsContainer = document.getElementById("remaining-comments");
const hideCommentsBtn = document.getElementById('hideCommentsBtn');
const commentsContainer = document.getElementById('commentsContainer');

// Cuando se hace clic en el botón de cargar más comentarios,
// se oculta el botón y se muestra el contenedor con los restantes comentarios.
loadMoreButton.addEventListener("click", () => {
  loadMoreButton.style.display = "none";
  remainingCommentsContainer.style.display = "block";
  hideCommentsBtn.style.display = "block";
});

hideCommentsBtn.addEventListener('click', () => {
    remainingCommentsContainer.style.display = 'none';
    loadMoreButton.style.display = "block";
    hideCommentsBtn.style.display = "none";
});