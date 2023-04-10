$(document).ready(function () {
  // Mostrar el modal
  $("#successModal").modal("show");

  // Redirigir después de 5 segundos
  setTimeout(function () {
    window.location.href = "/nueva-ruta"; // Reemplaza "nueva-ruta" con la URL de la nueva ruta a la que quieres redirigir al usuario
  }, 5000); // 5000 ms = 5 segundos
});