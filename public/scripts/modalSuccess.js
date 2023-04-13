document.getElementById("dismiss-popup-btn").addEventListener("click", () => {
    document.getElementsByClassName("popup")[0].classList.remove("active");
});

document.getElementById("errorAddingToCarBtn").addEventListener("click", () => {
    document.getElementById("errorAddingToCarModal").classList.remove("active");
});