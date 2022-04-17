const musicContainer = document.getElementById("audio-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dislikeBtn = document.getElementById("dislike");
const dislikeIcon = document.getElementById("dislikeIcon");
const likeBtn = document.getElementById("like");
const likeIcon = document.getElementById("likeIcon");

const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("audio-cover");
const current = document.getElementById("current")

const songs = ["Lose_yourself","Tantra","Ya_v_momente"];

let songIndex = 0;  // songIndex = songs[0]

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;  // `` belgi bizdagi f string
  cover.src = `images/${song}.jpg`;
  
}

loadSong(songs[songIndex]);

function playSong() {
   musicContainer.classList.add('play');
   playBtn.querySelector('i.fas').classList.remove('fa-play');
   playBtn.querySelector('i.fas').classList.add('fa-pause');

   audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add('fa-play');
  playBtn.querySelector("i.fas").classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex<0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(){
  songIndex++

  if (songIndex>songs.length-1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration)*100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function dislike_on(){
  musicContainer.classList.add('disliked');
  dislikeIcon.style.color = 'red';
}

function dislike_off(){
  musicContainer.classList.remove('disliked');
  dislikeIcon.style.color = "rgb(55, 55, 55)";
}

function like_on(){
  musicContainer.classList.add('liked');
  likeIcon.style.color = 'red';
}

function like_off(){
  musicContainer.classList.remove('liked');
  likeIcon.style.color = "rgb(55, 55, 55)";
}

dislikeBtn.addEventListener('click', () => {
  const dlikeonoff = musicContainer.classList.contains('disliked');
  if (dlikeonoff){
    dislike_off();
  }
  else{
    dislike_on();
  }
})

likeBtn.addEventListener('click',() => {
  const likeonoff = musicContainer.classList.contains('liked');
  if (likeonoff){
    like_off();
  }
  else{
    like_on();
  }
})
  
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains ('play');
  if(isPlaying) {
      pauseSong();
  } 
  else {
    playSong();
  }
})

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener("click",setProgress);

audio.addEventListener("ended",nextSong);