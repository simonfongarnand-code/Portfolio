const startMenu = document.getElementById("startMenu");
const startMenuButton = document.getElementById("startMenuButton");

startMenuButton.className = "startMenuButton-idle";

startMenu.addEventListener("mouseover", () => {
    startMenuButton.className = "startMenuButton-onHover";
});

startMenu.addEventListener("mouseout", () => {
    startMenuButton.className = "startMenuButton-idle";
});

startMenu.addEventListener("click", () => {
    startMenuButton.className = "startMenuButton-onClick";
})