// script.js - burger, search, category navigation, footer year
document.addEventListener('DOMContentLoaded', () => {

  // Burger Navigation
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.main-nav ul');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }

  // Smooth slide transition for mobile nav
  const navListStyle = document.createElement('style');
  navListStyle.textContent = `
    .main-nav ul {
      transition: transform 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(navListStyle);

  // Search System
  const searchInput = document.getElementById('gallery-search');
  function doSearch() {
    const value = (searchInput?.value || '').trim().toLowerCase();
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
      const category = (tile.dataset.category || '').toLowerCase();
      const creator = (tile.dataset.creator || '').toLowerCase();
      const title = (tile.dataset.title || tile.querySelector('h3')?.textContent || '').toLowerCase();

      if (!value || category.includes(value) || creator.includes(value) || title.includes(value)) {
        tile.style.display = '';
      } else {
        tile.style.display = 'none';
      }
    });

  }
  if (searchInput) searchInput.addEventListener('input', doSearch);

  // Footer Year Auto Update
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
