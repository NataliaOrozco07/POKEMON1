document.addEventListener("DOMContentLoaded", function() {
    const darkModeButton = document.querySelector(".dark_mode");
    const body = document.querySelector("body");

    darkModeButton.addEventListener("click", function() {
        body.classList.toggle("darkMode");
    });
});