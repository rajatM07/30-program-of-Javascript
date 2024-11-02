let song = document.getElementById("song");
let progress = document.getElementById("progress");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

song.addEventListener("timeupdate", () => {
  // Update progress value based on the song's current time and duration
  progress.value = song.currentTime;
});

// Allow the user to seek to a new time by clicking on the progress bar
progress.onclick = function (event) {
  // Calculate new time based on click position in the progress bar
  let clickPosition = (event.offsetX / progress.offsetWidth) * song.duration;
  song.currentTime = clickPosition;
  song.play(); // Play the song after seeking
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};
