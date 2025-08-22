const rope = document.querySelector('.rope-container');
const guy = document.querySelector('.guy');
const fallingContainer = document.querySelector('.falling-container');

let isDragging = false;
let startY = 0;

rope.addEventListener("touchstart", (e) => {
  isDragging = true;
  startY = e.touches[0].clientY;
});

rope.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentY = e.touches[0].clientY;
  const diff = currentY - startY;

  if (diff > 30) {  // user dragged down enough
    triggerRopePull();
    isDragging = false;
  }
});

rope.addEventListener("touchend", () => {
  isDragging = false;
});

function triggerRopePull() {
  // Rope goes up
  rope.style.transition = "transform 2s ease";
  rope.style.transform = "translateY(-100px)";

  // Balloons & sprinkles
  spawnBalloonsAndSprinkles();

  // Slide guy in
  setTimeout(() => {
    guy.classList.remove('hidden');
    guy.style.right = "20px";
  }, 1000);
}

function spawnBalloonsAndSprinkles() {
  for (let i = 0; i < 15; i++) {
    // Balloon
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * 90 + "vw";
    balloon.style.background = getRandomPastel();
    fallingContainer.appendChild(balloon);

    // Sprinkle
    const sprinkle = document.createElement('div');
    sprinkle.classList.add('sprinkle');
    sprinkle.style.left = Math.random() * 90 + "vw";
    sprinkle.style.background = getRandomPastel();
    fallingContainer.appendChild(sprinkle);

    // Cleanup
    setTimeout(() => {
      balloon.remove();
      sprinkle.remove();
    }, 7000);
  }
}

function getRandomPastel() {
  const colors = ["#FDF6E3", "#FAE3B0", "#C8D8EB", "#C7E9D0", "#F7C5C5"];
  return colors[Math.floor(Math.random() * colors.length)];
}