/* script.js — full site behavior + gallery filtering/modal
   Replace your existing script.js with this file (top-level Final Project/script.js)
*/
document.addEventListener("DOMContentLoaded", () => {
  // set copyright year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // basic elements
  const burger = document.getElementById("burger");
  const navList = document.querySelector(".nav-list");
  if (burger && navList) {
    burger.addEventListener("click", () => {
      navList.classList.toggle("active");
      burger.classList.toggle("toggle");
    });
  }

  // active nav link highlight
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // logo & text micro animations
  const logo = document.getElementById("logo");
  const logotext = document.getElementById("logotext");
  function hoverIn(el) { if (!el) return; el.style.transform = "translateY(-4px) scale(1.03)"; el.style.transition = "transform .18s ease"; }
  function hoverOut(el) { if (!el) return; el.style.transform = "translateY(0) scale(1)"; }
  [logo, logotext].forEach(el => {
    if (!el) return;
    el.addEventListener("mouseenter", () => hoverIn(el));
    el.addEventListener("mouseleave", () => hoverOut(el));
  });

  // dynamic/moving subheader
  const dynamic = document.getElementById("dynamic-subheader");
  if (dynamic) {
    dynamic.addEventListener("mousemove", (e) => {
      const rect = dynamic.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      dynamic.style.transform = `translateX(${x * 6}px)`;
    });
    dynamic.addEventListener("mouseleave", () => {
      dynamic.style.transform = "translateX(0)";
    });
  }

  // small 3D effect for IDs with moving-text
  const movingText = document.getElementById("moving-text");
  if (movingText) {
    movingText.addEventListener("mousemove", (e) => {
      const { offsetX, offsetY, target } = e;
      const x = (offsetX / target.offsetWidth - 0.5) * 6;
      const y = (offsetY / target.offsetHeight - 0.5) * 6;
      target.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
      target.style.transition = "transform .08s ease";
    });
    movingText.addEventListener("mouseleave", () => {
      movingText.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  // ---------------------------------------------------
  // GALLERY: filtering, search (category OR creator), modal
  // ---------------------------------------------------
  const grid = document.getElementById("art-grid");
  const tiles = grid ? Array.from(grid.querySelectorAll(".tile")) : [];
  const catButtons = Array.from(document.querySelectorAll(".cat-btn"));
  const searchInput = document.getElementById("gallery-search");

  // Helper: show/hide tiles based on predicate
  function applyFilter({ category = "all", search = "" } = {}) {
    const s = search.trim().toLowerCase();
    tiles.forEach(tile => {
      const tileCat = (tile.dataset.category || "").toLowerCase();
      const tileCreator = (tile.dataset.creator || "").toLowerCase();
      // category match: if 'all' or equals
      const catMatch = (category === "all") || (tile.dataset.category === category);
      // search match: only category or creator name per your request
      const searchMatch = !s || tileCat.includes(s) || tileCreator.includes(s);
      const visible = catMatch && searchMatch;
      tile.style.display = visible ? "" : "none";
    });
  }

  // initial: show all
  applyFilter({ category: "all", search: "" });

  // category buttons
  catButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      applyFilter({ category: cat, search: searchInput.value || "" });
      // scroll grid to top for better UX
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // search input: filters by category OR creator name only
  if (searchInput) {
    let searchTimer = null;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      const q = e.target.value;
      searchTimer = setTimeout(() => {
        // find currently active category
        const active = document.querySelector(".cat-btn.active");
        const currentCat = active ? active.dataset.cat : "all";
        applyFilter({ category: currentCat, search: q });
      }, 180);
    });
  }

  // hover play for videos in grid
  tiles.forEach(tile => {
    const vid = tile.querySelector("video");
    if (vid) {
      // set src from data-src if present
      const dataSrc = vid.dataset.src;
      if (dataSrc && !vid.getAttribute("src")) vid.src = dataSrc;
      tile.addEventListener("mouseenter", () => {
        vid.play().catch(()=>{/* autoplay may be blocked */});
        tile.classList.add("hovered");
      });
      tile.addEventListener("mouseleave", () => {
        vid.pause();
        vid.currentTime = 0;
        tile.classList.remove("hovered");
      });
    }
  });

  // LIGHTBOX / modal
  const lightbox = document.getElementById("lightbox");
  const lbContent = document.getElementById("lb-content");
  const lbClose = document.getElementById("lb-close");

  function openLightboxFor(tile) {
    if (!lightbox || !lbContent) return;
    lbContent.innerHTML = ""; // clear
    const isVideo = !!tile.querySelector("video");
    const title = tile.querySelector("h3") ? tile.querySelector("h3").textContent : "";
    const creator = tile.dataset.creator || "";
    const category = tile.dataset.category || "";
    const dataSrcImg = tile.querySelector("img") ? tile.querySelector("img").getAttribute("src") : null;
    const dataSrcVid = tile.querySelector("video") ? (tile.querySelector("video").dataset.src || tile.querySelector("video").src) : null;

    if (isVideo && dataSrcVid) {
      const v = document.createElement("video");
      v.setAttribute("controls", "");
      v.setAttribute("autoplay", "");
      v.src = dataSrcVid;
      v.style.maxWidth = "100%";
      v.style.maxHeight = "80vh";
      lbContent.appendChild(v);
    } else if (dataSrcImg) {
      const i = document.createElement("img");
      i.src = dataSrcImg;
      i.alt = title;
      i.style.maxWidth = "100%";
      i.style.maxHeight = "80vh";
      lbContent.appendChild(i);
    } else {
      lbContent.textContent = "Preview not available.";
    }

    const info = document.createElement("div");
    info.className = "lb-info";
    info.innerHTML = `<h3>${escapeHtml(title)}</h3><p class="credit">${escapeHtml(creator)} • ${escapeHtml(category)}</p>`;
    lbContent.appendChild(info);

    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lbContent) return;
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    lbContent.innerHTML = "";
    document.body.style.overflow = "";
  }

  // click on any tile opens lightbox
  tiles.forEach(tile => {
    tile.addEventListener("click", () => openLightboxFor(tile));
  });

  // close handlers
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // small helper: escape html for safety in modal text
  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  // ---------------------
  // Additional: login/signup basic (localStorage)
  // ---------------------
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
      message.style.color = "green";
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
      localStorage.setItem("ks_logged_in", JSON.stringify({ email }));
      message.textContent = "Logged in successfully!";
      message.style.color = "green";
      setTimeout(() => window.location.href = "index.html", 700);
    });
  }
});
