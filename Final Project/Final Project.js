const burger = document.getElementById("burger");
const navList = document.querySelector(".nav-list");

if (burger) {
  burger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const movingText = document.getElementById("moving-text");
if (movingText) {
  movingText.addEventListener("mouseenter", () => {
    movingText.style.transform = "translateY(-5px) rotate(-2deg)";
  });
  movingText.addEventListener("mouseleave", () => {
    movingText.style.transform = "translateY(0) rotate(0)";
  });
}

const logo = document.getElementById("logo");
const logotext = document.getElementById("logotext");

function animateLogo(el) {
  el.addEventListener("mouseenter", () => {
    el.style.transform = "rotate(6deg) scale(1.1)";
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotate(0) scale(1)";
  });
}

if (logo) animateLogo(logo);
if (logotext) animateLogo(logotext);

const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.muted = true;
    video.play().catch(() => {});
  });
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

async function verifyEmail(email) {
  try {
    const response = await fetch(`https://isitarealemail.com/api/email/validate?email=${email}`, {
      headers: { Authorization: "Bearer test" }
    });
    const data = await response.json();
    return data.status === "valid";
  } catch (error) {
    console.error("Email verification error:", error);
    return false;
  }
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const message = document.getElementById("signup-message");

    if (!email || !password) {
      message.textContent = "Please fill out all fields.";
      message.style.color = "red";
      return;
    }

    message.textContent = "Verifying email...";
    const isValid = await verifyEmail(email);

    if (!isValid) {
      message.textContent = "Invalid or non-existent email. Please use a valid one.";
      message.style.color = "red";
    } else {
      message.textContent = "Signup successful! Redirecting...";
      message.style.color = "green";
      setTimeout(() => (window.location.href = "login.html"), 1500);
    }
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const message = document.getElementById("login-message");

    if (!email || !password) {
      message.textContent = "Please fill out all fields.";
      message.style.color = "red";
      return;
    }

    message.textContent = "Checking email...";
    const isValid = await verifyEmail(email);

    if (!isValid) {
      message.textContent = "Invalid email or does not exist.";
      message.style.color = "red";
    } else {
      message.textContent = "Login successful!";
      message.style.color = "green";
      setTimeout(() => (window.location.href = "gallery.html"), 1500);
    }
  });
}

const featuredGrid = document.getElementById("featured-grid");
if (featuredGrid) {
  const featuredItems = [
    { file: "YumsTypography1.jpg", creator: "Ann Gail Miomie Ampong", caption: "Typography concept design." },
    { file: "KayDigitalDrawings1.PNG", creator: "Kaela Vita", caption: "Digital drawing concept." },
    { file: "YumsPhotography2.jpg", creator: "Ann Gail Miomie Ampong", caption: "Photography concept." },
  ];

  featuredItems.forEach((item) => {
    const fig = document.createElement("figure");
    fig.innerHTML = `
      <img src="assets/${item.file}" alt="${item.caption}">
      <figcaption>${item.caption}<br><small>Created by ${item.creator}</small></figcaption>
    `;
    featuredGrid.appendChild(fig);
  });
}
