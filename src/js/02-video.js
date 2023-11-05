import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}

const savePlaybackTime = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', function (data) {
  savePlaybackTime(data.seconds);
});
