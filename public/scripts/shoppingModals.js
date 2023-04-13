// Verifica si la variable de consulta "runFunction" está presente en la URL
if (window.location.search.includes("runFunction=true")) {
  successModal();
}

//Verifico si la variable del erro al agregar al carrito esta presente en la URL
if (window.location.search.includes("errorAddingToCar=true")){
  errorAddToCar();
}

//Este es el modal que sale verificando la compra del libro
function successModal() {
  // Código de la función aquí
  document.getElementsByClassName("popup")[0].classList.add("active");
}

//modal que sale cuando se intenta añadir una cantidad del libro mayor a la disponible
function errorAddToCar() {
  //codigo de mi funcion aqui
  document.getElementById("errorAddingToCarModal").classList.add("active");
}

function validarCantidad() {
  var cantidad = document.getElementById("cantidad").value;
  let bookStock = document.getElementById("inputBookStock").value;

  cantidad = Number(cantidad);
  bookStock = Number(bookStock);

//   alert(typeof bookStock);
//   alert(typeof cantidad);

  if (cantidad <= 0 || isNaN(cantidad)) {
    document.getElementById("myModal2").style.display = "block";
    return false; // cancela el envío del formulario
  } else if (cantidad > bookStock) {
    document.getElementById("myModal2").style.display = "block";
    return false; // cancela el envío del formulario
  } else {
    return true; // permite enviar el formulario al servidor
  }
} 