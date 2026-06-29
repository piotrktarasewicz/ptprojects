(function () {
  'use strict';

  let activePlayer = null;

  function getPlayers() {
    return Array.from(document.querySelectorAll('audio'));
  }

  function getAudioFromEvent(event) {
    const target = event.target;

    if (!target) {
      return null;
    }

    if (target.tagName === 'AUDIO') {
      return target;
    }

    if (typeof target.closest === 'function') {
      return target.closest('audio');
    }

    return null;
  }

  function pauseOtherPlayers(currentPlayer) {
    if (!currentPlayer || currentPlayer.tagName !== 'AUDIO') {
      return;
    }

    activePlayer = currentPlayer;

    getPlayers().forEach(function (player) {
      if (player !== currentPlayer && !player.paused) {
        player.pause();
      }
    });
  }

  function handlePlayerIntent(event) {
    const player = getAudioFromEvent(event);

    if (player) {
      pauseOtherPlayers(player);
    }
  }

  ['pointerdown', 'touchstart', 'mousedown', 'click'].forEach(function (eventName) {
    document.addEventListener(eventName, handlePlayerIntent, true);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      handlePlayerIntent(event);
    }
  }, true);

  ['play', 'playing'].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      const player = getAudioFromEvent(event);

      if (player) {
        pauseOtherPlayers(player);
      }
    }, true);
  });

  window.setInterval(function () {
    const playingPlayers = getPlayers().filter(function (player) {
      return !player.paused && !player.ended;
    });

    if (playingPlayers.length <= 1) {
      if (playingPlayers.length === 1) {
        activePlayer = playingPlayers[0];
      }

      return;
    }

    if (!activePlayer || activePlayer.paused || activePlayer.ended) {
      activePlayer = playingPlayers[playingPlayers.length - 1];
    }

    playingPlayers.forEach(function (player) {
      if (player !== activePlayer) {
        player.pause();
      }
    });
  }, 500);
}());
