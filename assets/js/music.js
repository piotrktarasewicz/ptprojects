(function () {
  'use strict';

  const players = Array.from(document.querySelectorAll('audio'));

  players.forEach((currentPlayer) => {
    currentPlayer.addEventListener('play', () => {
      players.forEach((otherPlayer) => {
        if (otherPlayer !== currentPlayer && !otherPlayer.paused) {
          otherPlayer.pause();
        }
      });
    });
  });
}());
