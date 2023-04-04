// Agrega una entrada en el historial del navegador cuando el usuario accede a la pantalla principal de tu aplicación
window.history.replaceState({ page: 'home' }, 'Home', '/');

// Agrega una entrada en el historial del navegador cuando se muestra un mensaje de error
window.history.pushState({ page: 'error' }, 'Error', '/error');

// Detecta cuando el usuario presiona el botón de "atrás" del navegador
window.addEventListener('popstate', (event) => {
  // Si la entrada actual en el historial es una pantalla de error, redirige al usuario a la pantalla principal de tu aplicación
  if (event.state && event.state.page === 'error') {
    window.location.href = '/';
  }
});