document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const logo = document.getElementById("logo");
  const logotext = document.getElementById("logotext");

  if (logo) {
    logo.addEventListener("mouseenter", () => {
      logo.style.transform = "scale(1.1) rotate(5deg)";
      logo.style.transition = "0.3s ease";
    });
    logo.addEventListener("mouseleave", () => {
      logo.style.transform = "scale(1) rotate(0deg)";
    });
  }

  if (logotext) {
    logotext.addEventListener("mouseenter", () => {
      logotext.style.transform = "translateY(-3px)";
      logotext.style.transition = "0.3s ease";
    });
    logotext.addEventListener("mouseleave", () => {
      logotext.style.transform = "translateY(0)";
    });
  }

  const movingText = document.getElementById("moving-text");
  if (movingText) {
    movingText.addEventListener("mousemove", (e) => {
      const { offsetX, offsetY, target } = e;
      const x = (offsetX / target.offsetWidth - 0.5) * 10;
      const y = (offsetY / target.offsetHeight - 0.5) * 10;
      movingText.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
    movingText.addEventListener("mouseleave", () => {
      movingText.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  const burger = document.getElementById("burger");
  const navList = document.querySelector(".nav-list");
  if (burger && navList) {
    burger.addEventListener("click", () => {
      navList.classList.toggle("active");
      burger.classList.toggle("toggle");
    });
  }
});
