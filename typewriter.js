let text;

const nom = document.getElementById("nom");
text = "> Simon Fongarnand";
nom.innerHTML = text;
nom.style.setProperty("--characters", text.length);

nom.style.animationComposition = "3s"

const profession = document.getElementById("profession");
text = "> AI Engineer";
profession.innerHTML = text;
profession.style.setProperty("--characters", text.length);

profession.style.animationDelay = "3s";
