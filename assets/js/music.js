(function () {
  'use strict';

  const player = document.getElementById('music-player');
  const currentTrack = document.getElementById('current-track');
  const trackButtons = Array.from(document.querySelectorAll('.track-button'));

  if (!player || !currentTrack || trackButtons.length === 0) {
    return;
  }

  trackButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const source = button.getAttribute('data-src');
      const title = button.getAttribute('data-title');

      if (!source || !title) {
        return;
      }

      if (player.getAttribute('src') !== source) {
        player.pause();
        player.setAttribute('src', source);
        player.setAttribute('aria-label', 'Odtwarzacz muzyki: ' + title);
        player.load();
      }

      currentTrack.textContent = 'Wybrany utwór: ' + title + '.';
      player.play();
    });
  });
}());
