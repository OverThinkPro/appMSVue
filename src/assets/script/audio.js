export function play(type)  {
  let alarmFileSrc = {};
  alarmFileSrc[1] = 'static/audio/overtime.mp3';
  alarmFileSrc[2] = 'static/audio/overman.mp3';
  alarmFileSrc[3] = 'static/audio/regionlimit.mp3';
  alarmFileSrc[4] = 'static/audio/staffCall.mp3';

  if (alarmFileSrc[type]) {
    var audio = document.createElement("AUDIO");
    audio.setAttribute("src", alarmFileSrc[type]);
    audio.setAttribute("autoplay", 'false');
    // audio.addEventListener('canplay', canPlay, false);
    audio.play();
  }
}
