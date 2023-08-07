import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const storedTime = localStorage.getItem('videoplayer-current-time');

if (storedTime) {
  const parsedTime = JSON.parse(storedTime);
  player.setCurrentTime(parsedTime).then(function(seconds) {

  }).catch(function(error) {
    switch (error.name) {
      case 'RangeError':

        break;

      default:

        break;
    }
  });
}
player.on('timeupdate', throttle(function(data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
  }, 1000));
