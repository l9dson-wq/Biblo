$(document).ready(function() {
    var maxCharCount = 190; // Número máximo de caracteres a mostrar antes de "Mostrar más"
    var description = $('#description').text().trim(); // Obtener el contenido de la etiqueta p y quitar espacios en blanco
    var shortDescription, longDescription; // Variables para almacenar el texto corto y completo
    var isExpanded = false; // Establecer el estado inicial
    
    if (description.length > maxCharCount) {
      shortDescription = description.substr(0, maxCharCount); // Obtener solo los primeros maxCharCount caracteres y agregar puntos suspensivos
      longDescription = description; // Obtener todo el contenido del elemento
      
      $('#description').text(shortDescription); // Reemplazar el contenido de la etiqueta p con el texto corto y agregar la clase CSS para el efecto de desvanecimiento
      
      // Agregar un enlace "Mostrar más"
      var showMoreLink = $('<a href="#" style="color: #D9017A;">Mostrar más</a>');
      showMoreLink.click(function(e) {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        if (isExpanded) {
          $('#description').text(shortDescription).removeClass('description-fade'); // Reemplazar el contenido de la etiqueta p con el texto corto y agregar la clase CSS para el efecto de desvanecimiento
          showMoreLink.text('Mostrar más'); // Cambiar el texto del enlace a "Mostrar más"
          isExpanded = false; // Cambiar el estado a no expandido
        } else {
          $('#description').text(longDescription).addClass('description-fade'); // Reemplazar el contenido de la etiqueta p con el texto completo y eliminar la clase CSS para el efecto de desvanecimiento
          showMoreLink.text('Mostrar menos'); // Cambiar el texto del enlace a "Mostrar menos"
          isExpanded = true; // Cambiar el estado a expandido
        }
      });
      
      $('#description').after(showMoreLink); // Agregar el enlace después del elemento p
    }
  });

//Codigo para mostrar el formulario para introducir un comentario
var form = document.getElementById("comment-form");
var toggleButton = document.getElementById("toggle-form");

toggleButton.addEventListener("click", function() {
  form.classList.toggle("d-none");
  if (form.classList.contains("d-none")) {
    toggleButton.textContent = "Mostrar formulario";
  } else {
    toggleButton.textContent = "Ocultar formulario";
  }
});