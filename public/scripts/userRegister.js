// Verifica si la variable de consulta  está presente en la URL

if (window.location.search.includes("userNameFound=true")) {
    userFoundModal();
}

function userFoundModal() {
    document.getElementById("userFoundModalWindow").classList.add("active");
}

document.getElementById("userFoundModalButton").addEventListener("click", () => {
    document.getElementById("userFoundModalWindow").classList.remove("active");
});

///////////////