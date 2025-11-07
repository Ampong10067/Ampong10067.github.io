// script.js - burger, search, category navigation, footer year, improved nav UX

document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // BURGER MENU
  // ========================
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.main-nav ul');

  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('show'); // your original
      navList.classList.toggle('active'); // improved smooth animation
    });

    // Close menu on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        navList.classList.remove('show', 'active');
      }
    });
  }

  // ========================
  // SEARCH FILTER
  // ========================
  const searchInput = document.getElementById('gallery-search');
  function doSearch() {
    const value = (searchInput?.value || '').trim().toLowerCase();
    const tiles = document.querySelectorAll('.tile');
    if (!tiles) return;

    tiles.forEach(tile => {
      const category = (tile.dataset.category || '').toLowerCase();
      const creator = (tile.dataset.creator || '').toLowerCase();
      const title = (tile.dataset.title || tile.querySelector('h3')?.textContent || '').toLowerCase();

      tile.style.display =
        !value || category.includes(value) || creator.includes(value) || title.includes(value)
        ? ''
        : 'none';
    });
  }
  if (searchInput) searchInput.addEventListener('input', doSearch);

  // ========================
  // CATEGORY NAVIGATION
  // ========================
  const catButtons = document.querySelectorAll('.cat-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat || 'all';
      if (cat === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const id = cat.toLowerCase().replace(/\s+/g, '-');
      const section =
        document.getElementById(id) ||
        document.querySelector(`.category-section[data-cat="${cat}"]`);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================
  // FOOTER YEAR (unchanged)
  // ========================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========================
  // HEADER SCROLL HIDE EFFECT
  // ========================
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 80) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }

    lastScroll = currentScroll;
  });
});
