// Seleccionamos los elementos del DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

// Añadimos un evento de clic para mostrar el formulario de registro y ocultar el formulario de inicio de sesión
registerLink.addEventListener('click', () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

// Añadimos un evento de clic para mostrar el formulario de inicio de sesión y ocultar el formulario de registro
loginLink.addEventListener('click', () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});
