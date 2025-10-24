document.addEventListener("DOMContentLoaded", () => {
  // dynamic year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // logo hover movement
  const logo = document.getElementById("logo");
  const logotext = document.getElementById("logotext");

  function animateIn(el) {
    el.style.transform = "scale(1.05) rotate(3deg)";
    el.style.transition = "transform .18s ease";
  }
  function animateOut(el) {
    el.style.transform = "scale(1) rotate(0)";
  }

  if (logo) {
    logo.addEventListener("mouseenter", () => animateIn(logo));
    logo.addEventListener("mouseleave", () => animateOut(logo));
  }
  if (logotext) {
    logotext.addEventListener("mouseenter", () => animateIn(logotext));
    logotext.addEventListener("mouseleave", () => animateOut(logotext));
  }

  // moving subheader (Gumroad-like) - subtle 3D on mouse move
  const dynamic = document.getElementById("dynamic-subheader");
  const movingText = document.getElementById("moving-text");
  function subheaderMove(e) {
    const box = dynamic.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    dynamic.style.transform = `translateX(${x * 8}px)`;
  }
  if (dynamic) {
    dynamic.addEventListener("mousemove", subheaderMove);
    dynamic.addEventListener("mouseleave", () => dynamic.style.transform = "translateX(0)");
  }
  if (movingText) {
    movingText.addEventListener("mousemove", (e) => {
      const { offsetX, offsetY, target } = e;
      const x = (offsetX / target.offsetWidth - 0.5) * 10;
      const y = (offsetY / target.offsetHeight - 0.5) * 10;
      target.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
    movingText.addEventListener("mouseleave", (e) => {
      e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  // burger toggle
  const burger = document.getElementById("burger");
  const navList = document.querySelector(".nav-list");
  if (burger && navList) {
    burger.addEventListener("click", () => {
      navList.classList.toggle("active");
      burger.classList.toggle("toggle");
    });
  }

  // highlight active nav link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach(a => {
    if (a.getAttribute("href") === currentPath) {
      a.classList.add("active");
    }
  });

  // -------------------------
  // Signup / Login (localStorage-based)
  // -------------------------
  function isValidEmail(email) {
    // simple regex check for format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Signup form
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;
      const message = document.getElementById("signup-message");

      if (!isValidEmail(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return;
      }
      if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "red";
        return;
      }

      // users saved in localStorage under 'ks_users' as object { email:password }
      const users = JSON.parse(localStorage.getItem("ks_users") || "{}");
      if (users[email]) {
        message.textContent = "This email already exists. Try logging in.";
        message.style.color = "red";
        return;
      }

      users[email] = { password };
      localStorage.setItem("ks_users", JSON.stringify(users));
      message.textContent = "Account created successfully! You can now log in.";
      message.style.color = "green";
      signupForm.reset();
    });
  }

  // Login form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      const message = document.getElementById("login-message");

      if (!isValidEmail(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return;
      }

      const users = JSON.parse(localStorage.getItem("ks_users") || "{}");
      if (!users[email]) {
        message.textContent = "No account found with that email.";
        message.style.color = "red";
        return;
      }
      if (users[email].password !== password) {
        message.textContent = "Incorrect password.";
        message.style.color = "red";
        return;
      }

      // Mock "logged in" state
      localStorage.setItem("ks_logged_in", JSON.stringify({ email }));
      message.textContent = "Logged in successfully!";
      message.style.color = "green";

      // optional: redirect to home after login
      setTimeout(() => { window.location.href = "index.html"; }, 700);
    });
  }

  // small helper: play/pause video on hover for gallery
  document.querySelectorAll(".gallery-grid video").forEach(v => {
    v.addEventListener("mouseenter", () => { v.play(); });
    v.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
  });
});
