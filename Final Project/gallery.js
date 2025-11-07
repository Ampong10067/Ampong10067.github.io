document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) return;

  let openTile = null;

  function closeTile(tile) {
    const media = tile.querySelector('. expanded-play');
    if (media) {
      if (media.tagName === "VIDEO") {
        media.pause();
        media.currentTime = 0;
      }
      media.remove();
    }
    tile.classList.remove('expanded');
    openTile = null;
  }

  function expandTile(tile) {
    // Close previous expanded tile
    if (openTile && openTile !== tile) closeTile(openTile);

    const src = tile.dataset.src;
    const title = tile.dataset.title;
    const creator = tile.dataset.creator;
    const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(src);

    let media;
    if (isVideo) {
      media = document.createElement('video');
      media.src = src;
      media.autoplay = true;
      media.controls = true;
      media.playsInline = true;
    } else {
      media = document.createElement('img');
      media.src = src;
    }

    media.classList.add('expanded-play');
    tile.appendChild(media);

    tile.classList.add('expanded');
    openTile = tile;
  }

  // Click Event
  main.addEventListener('click', (e) => {
    const tile = e.target.closest('.tile');
    if (!tile) return;

    if (tile.classList.contains('expanded')) {
      closeTile(tile);
    } else {
      expandTile(tile);
    }
  });

  // ESC key closes expanded item
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openTile) {
      closeTile(openTile);
    }
  });

});
