(function () {
  'use strict';

  document.addEventListener('play', function (event) {
    const currentPlayer = event.target;

    if (!(currentPlayer instanceof HTMLAudioElement)) {
      return;
    }

    document.querySelectorAll('audio').forEach(function (otherPlayer) {
      if (otherPlayer !== currentPlayer) {
        otherPlayer.pause();
      }
    });
  }, true);
}());
