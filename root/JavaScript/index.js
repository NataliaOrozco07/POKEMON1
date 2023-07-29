document.addEventListener("DOMContentLoaded", function() {
    const darkModeButton = document.querySelector(".dark_mode");
    const body = document.querySelector("body");

    // Obtener preferencia del modo actual
    const currentMode = localStorage.getItem("mode");

    // Verificar la preferencia del modo y aplicarlo
    if (currentMode === "dark") {
        body.classList.add("darkMode");
    }

    darkModeButton.addEventListener("click", function() {
        // Alternar el modo y guardar la preferencia en el Local Storage
        if (body.classList.contains("darkMode")) {
            body.classList.remove("darkMode");
            localStorage.setItem("mode", "light");
            darkModeButton.textContent = 'Dark Mode';
        } else {
            body.classList.add("darkMode");
            localStorage.setItem("mode", "dark");
            darkModeButton.textContent = 'Light Mode';
        }
    });
});

