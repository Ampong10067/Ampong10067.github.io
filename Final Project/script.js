document.addEventListener("DOMContentLoaded", () => {
  // set year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // logo hover movement
  const logo = document.getElementById("logo");
  const logotext = document.getElementById("logotext");
  function animateIn(el) {
    if (!el) return;
    el.style.transform = "scale(1.06) rotate(3deg)";
    el.style.transition = "transform .18s ease";
  }
  function animateOut(el) {
    if (!el) return;
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

  // moving subheader subtle movement
  const dynamic = document.getElementById("dynamic-subheader");
  if (dynamic) {
    dynamic.addEventListener("mousemove", (e) => {
      const rect = dynamic.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      dynamic.style.transform = `translateX(${x * 8}px)`;
    });
    dynamic.addEventListener("mouseleave", () => {
      dynamic.style.transform = "translateX(0)";
    });
  }

  // moving heading micro-3d
  const movingText = document.getElementById("moving-text");
  if (movingText) {
    movingText.addEventListener("mousemove", (e) => {
      const { offsetX, offsetY, target } = e;
      const x = (offsetX / target.offsetWidth - 0.5) * 10;
      const y = (offsetY / target.offsetHeight - 0.5) * 10;
      target.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
      target.style.transition = "transform .08s ease";
    });
    movingText.addEventListener("mouseleave", (e) => {
      e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  // burger menu toggle
  const burger = document.getElementById("burger");
  const navList = document.querySelector(".nav-list");
  if (burger && navList) {
    burger.addEventListener("click", () => {
      navList.classList.toggle("active");
      burger.classList.toggle("toggle");
    });
  }

  // highlight active nav link (works for simple filename paths)
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // play/pause gallery videos on hover
  document.querySelectorAll(".gallery-grid video, .card video").forEach(v => {
    v.addEventListener("mouseenter", () => {
      v.play().catch(() => {});
    });
    v.addEventListener("mouseleave", () => {
      v.pause();
      v.currentTime = 0;
    });
  });

  // -------------------------
  // Signup/Login (localStorage)
  // -------------------------
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // signup
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (document.getElementById("signup-email").value || "").trim();
      const password = (document.getElementById("signup-password").value || "");
      const message = document.getElementById("signup-message");
      if (!isValidEmail(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "tomato";
        return;
      }
      if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "tomato";
        return;
      }
      const users = JSON.parse(localStorage.getItem("ks_users") || "{}");
      if (users[email]) {
        message.textContent = "This email already exists. Try logging in.";
        message.style.color = "tomato";
        return;
      }
      users[email] = { password };
      localStorage.setItem("ks_users", JSON.stringify(users));
      message.textContent = "Account created successfully! You can now log in.";
      message.style.color = "lightgreen";
      signupForm.reset();
    });
  }

  // login
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (document.getElementById("login-email").value || "").trim();
      const password = (document.getElementById("login-password").value || "");
      const message = document.getElementById("login-message");
      if (!isValidEmail(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "tomato";
        return;
      }
      const users = JSON.parse(localStorage.getItem("ks_users") || "{}");
      if (!users[email]) {
        message.textContent = "No account found with that email.";
        message.style.color = "tomato";
        return;
      }
      if (users[email].password !== password) {
        message.textContent = "Incorrect password.";
        message.style.color = "tomato";
        return;
      }
      // logged in (mock)
      localStorage.setItem("ks_logged_in", JSON.stringify({ email }));
      message.textContent = "Logged in successfully!";
      message.style.color = "lightgreen";
      setTimeout(() => { window.location.href = "index.html"; }, 700);
    });
  }
});
