const ordinateur = document.getElementById('ordinateur');
const poubelle = document.getElementById('poubelle');
const reparation = document.getElementById('reparation');
const section = document.getElementById('gagne');

ordinateur.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "ordinateur");
});

poubelle.addEventListener("dragover", e => {
    if (poubelle.className === "bottom") {
        poubelle.setAttribute("class", "top");
    } else {
        poubelle.setAttribute("class", "bottom")
    }
});

// Quand on passe au-dessus de la reparation
reparation.addEventListener("dragover", (e) => {
  e.preventDefault();
  reparation.classList.add("over");
});

// Quand on quitte la zone
reparation.addEventListener("dragleave", () => {
  reparation.classList.remove("over");
});

// Quand on lâche dans la reparation
reparation.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  if (data === "ordinateur") {
    ordinateur.style.display = "none"; // le déchet disparaît
  }
  reparation.classList.remove("over");
  section.classList.add("visible");
});
