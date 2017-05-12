export function play(type, fileSrc)  {

  if (!type) {
    return;
  }

  let alarmFileSrc = {};
  alarmFileSrc[1] = 'static/audio/overtime.mp3';
  alarmFileSrc[2] = 'static/audio/overman.mp3';
  alarmFileSrc[3] = 'static/audio/regionlimit.mp3';
  alarmFileSrc[4] = 'static/audio/staffCall.mp3';

  let filePath = fileSrc ? ('static' + fileSrc) : (alarmFileSrc[type]);
  // let filePath = alarmFileSrc[type];
  console.log("filepath: ", filePath);
  var audio = document.createElement("AUDIO");
  audio.setAttribute("src", filePath);
  audio.setAttribute("autoplay", 'false');
  // audio.addEventListener('canplay', canPlay, false);
  audio.play();
};
