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

// Question

document.getElementById("validate").addEventListener("click", () => {
  const answer = document.getElementById("user_answer").value.trim().toLowerCase();
  const feedback = document.getElementById("feedback");

  if (answer === "snake") {
    let snake = document.getElementById("snake");
    snake.classList.remove('hidden');
    snake.classList.add('visible');
  } else if (answer === "linux") {
    feedback.textContent = "Bravo, tu as trouvé la bonne réponse !";
    feedback.style.color = "green";
  }
  
  else {
    feedback.textContent = "Mauvaise réponse, essaie encore...";
    feedback.style.color = "red";
  }
});

