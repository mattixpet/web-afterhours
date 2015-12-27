// javascript to update both the picture and the audio playing
// 9pm-midnight => after9pm
// midnight-3am => aftermidnight
// 3am-6am      => after3am
// 6am-9am      => after6am
// 9am-9pm      => dum dum

// ugly globals!!
var intervalID;
// contains the names of pic/song, example after9pm.mp3 or after3am.jgp
var n = { '9pm' : 'after9pm',
          'midnight' : 'aftermidnight',
          '3am' : 'after3am',
          '6am' : 'after6am',
          'other' : 'notafterhours'};

document.addEventListener("DOMContentLoaded", function(event) {
  update(); // initial call to setup
  intervalID = window.setInterval(update, 60000); // update every x milliseconds
});

// not used, but hey
function stopInterval() {
  clearInterval(intervalID);
}

// update our pics/songs depending on users time
function update() {
  var time = (new Date()).getHours(); // returns 0-23
  var after;
  if (time >= 21) {
    after = n['9pm'];
  } else if (time >= 0 && time < 3) {
    after = n['midnight'];
  } else if (time >= 3 && time < 6) {
    after = n['3am'];
  } else if (time >= 6 && time < 9) {
    after = n['6am'];
  } else {
    after = n['other'];
  }
  setSong(after);
  setPic(after);
}

function setSong(after) {
  // thanks vitim.us
  // http://stackoverflow.com/questions/10792163/change-audio-src-with-javascript
  var audio = document.getElementById('aftersong');
  var source = document.getElementById('aftersongsource');
  if (after === n['other']) {
    // it's not after hours yet!
    audio.loop = false;
    audio.pause();
    //audio.currentTime = 0; // this line seemed to break the code in Firefox
  } else {
    // only reload song if time has changed (otherwise keep on looping!)
    // capture singplaying part in link.com/blabla/audio/songplaying.mp3
    // thanks, http://stackoverflow.com/questions/5642315/regular-expression-to-get-a-string-between-two-strings-in-javascript
    var currentafter = source.src === '' ? '' : source.src.match("audio\/(.*).mp3")[1];
    if (currentafter !== after) {
      audio.loop = true;
      source.src='audio/' + after + '.mp3';
      audio.load();
      audio.play();
    }
  }
}

function setPic(after) {
  var pic = document.getElementById('afterpic');
  // only change img if time has changed (like from 9pm-11:59 to midnight for example)
  var currentafter = pic.src.replace(/^img\//, '').replace(/.jpg/,'');
  if (currentafter !== after) {
    pic.src = 'img/' + after + '.jpg';
    pic.alt = after;
    // set / remove our "is it after hours text"
    var notafter = document.getElementById('notafterhours');
    if (after === n['other']) {
      notafter.className = 'visible';
    } else {
      notafter.className = 'hidden';
    }
  }
}