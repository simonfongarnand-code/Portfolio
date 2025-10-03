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


function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const PM = (hours >= 12);
    if (PM) {
        document.getElementById('taskbarClock').textContent = `${hours-12}:${minutes} PM`;
    } else {
        document.getElementById('taskbarClock').textContent = `${hours}:${minutes} AM`;
    }
}

updateTime()
setInterval(updateTime, 1000);
