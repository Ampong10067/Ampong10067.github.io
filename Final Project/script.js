// ===========================
// Elements
// ===========================
const catButtons = document.querySelectorAll('.cat-btn');
const searchInput = document.getElementById('gallery-search');
const artGrid = document.getElementById('art-grid');
const tiles = Array.from(artGrid.getElementsByClassName('tile'));

// ===========================
// Category Filtering
// ===========================
catButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    catButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-cat');

    tiles.forEach(tile => {
      if (category === 'all' || tile.dataset.category === category) {
        tile.style.display = '';
      } else {
        tile.style.display = 'none';
      }
    });

    // Clear search input when category clicked
    searchInput.value = '';
  });
});

// ===========================
// Search Filtering
// ===========================
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  tiles.forEach(tile => {
    const cat = tile.dataset.category.toLowerCase();
    const creator = tile.dataset.creator.toLowerCase();

    if (cat.includes(query) || creator.includes(query)) {
      tile.style.display = '';
    } else {
      tile.style.display = 'none';
    }
  });

  // Remove active from category buttons when searching
  catButtons.forEach(b => b.classList.remove('active'));
  document.querySelector('.cat-btn[data-cat="all"]').classList.add('active');
});

// ===========================
// Lazy Load Video
// ===========================
tiles.forEach(tile => {
  const video = tile.querySelector('video');
  if (video) {
    const src = video.getAttribute('data-src');
    if (src) {
      video.src = src;
    }
  }
});

// ===========================
// Lightbox
// ===========================
const lightbox = document.getElementById('lightbox');
const lbContent = document.getElementById('lb-content');
const lbClose = document.getElementById('lb-close');

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    lbContent.innerHTML = '';
    const clone = tile.cloneNode(true);
    clone.style.cursor = 'default';
    lbContent.appendChild(clone);
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

lbClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
});

// Close lightbox on outside click
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
  }
});
