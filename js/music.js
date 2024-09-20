const boxContainer = document.getElementById("boxContainer");

// Path to the music-images folder
const imageFolderPath = "../music-images/";

// Array of image names and respective artist names
const imageData = [
  { image: "Diljit.png", artist: "Diljit Dosanjh" },
  { image: "arijit.jpeg", artist: "Arijit Singh" },
  { image: "b-praak.jpg", artist: "B-Praak" },
  { image: "kk.jpg", artist: "KK" },
  { image: "karan-aujla.jpeg", artist: "Karan Aujla" },
  { image: "shreya-ghoshal.jpeg", artist: "Shreya Ghoshal" },
];

// Create artist boxes dynamically
function createBox(index) {
  const box = document.createElement("div");
  box.className =
    "artist-box relative flex flex-col items-center min-w-[150px] group transition-all duration-300 hover:bg-gray-500 hover:rounded-lg cursor-pointer hover:border-1 hover:border-black py-3";

  const imageContainer = document.createElement("div");
  imageContainer.className = "relative w-[150px] h-[150px]";

  const img = document.createElement("img");
  img.src = imageFolderPath + imageData[index].image;
  img.alt = imageData[index].artist;
  img.className =
    "w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:opacity-50";

  const playButton = document.createElement("span");
  playButton.innerHTML = '<i class="fas fa-play"></i>';
  playButton.className =
    "absolute inset-0 flex items-center justify-center text-black bg-white w-12 h-12 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300";

  imageContainer.appendChild(img);
  imageContainer.appendChild(playButton);

  const artistName = document.createElement("p");
  artistName.innerText = imageData[index].artist;
  artistName.className =
    "mt-2 text-center text-lg font-bold text-gray-300 transition-colors duration-300 group-hover:text-black";

  box.appendChild(imageContainer);
  box.appendChild(artistName);

  return box;
}

// Add artist boxes to the container
for (let i = 0; i < imageData.length; i++) {
  const newBox = createBox(i);
  boxContainer.appendChild(newBox);
}
const music_list = [
  {
    img: "../Music/diljit1.jpg",
    name: "GOAT",
    artist: "Diljit Dosanjh",
    music: "../Music/diljit1.mp3",
  },
  {
    img: "../Music/diljit2.jpg",
    name: "Lemonade",
    artist: "Diljit Dosanjh",
    music: "../Music/diljit2.mp3",
  },
  {
    img: "../Music/diljit3.jpeg",
    name: "Lover",
    artist: "Diljit Dosanjh",
    music: "../Music/diljit3.mp3",
  },
  {
    img: "../Music/arijit1.jpg",
    name: "Ae Dil Hai Mushkil",
    artist: "Arijit Singh",
    music: "../Music/arijit1.mp3",
  },
  {
    img: "../Music/arijit2.jpg",
    name: "Khamoshiyan",
    artist: "Arijit Singh",
    music: "../Music/arijit2.mp3",
  },
  {
    img: "../Music/arijit3.jpg",
    name: "Shayad",
    artist: "Arijit Singh",
    music: "../Music/arijit3.mp3",
  },
  {
    img: "../Music/kk1.jpg",
    name: "Dil Ibadat",
    artist: "KK",
    music: "../Music/kk1.mp3",
  },
  {
    img: "../Music/kk2.jpg",
    name: "Tu Jo Mila",
    artist: "KK",
    music: "../Music/kk2.mp3",
  },
  {
    img: "../Music/kk3.jpg",
    name: "Zara Sa",
    artist: "KK ",
    music: "../Music/kk3.mp3",
  },
  {
    img: "../Music/bpraak1.jpg",
    name: "Mann Bharrya",
    artist: "B-Praak",
    music: "../Music/bpraak1.mp3",
  },
  {
    img: "../Music/bpraak2.jpeg",
    name: "Filhaal",
    artist: "B-Praak",
    music: "../Music/bpraak2.mp3",
  },
  {
    img: "../Music/bpraak3.jpg",
    name: "Allah De Bandeya",
    artist: "B-Praak",
    music: "../Music/bpraak3.mp3",
  },
];

// Declare and define audio player functionality (only once)
let audioPlayer = document.getElementById("audio-player");
let albumCover = document.getElementById("album-cover");
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let curr_track = document.createElement("audio");
let track_index = 0;
let isPlaying = false;
let updateTimer;


// Music list (example data)


// Load the selected track into the player
function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  if (music_list[track_index]) {
      curr_track.src = music_list[track_index].music;
      curr_track.load();

      track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
      albumCover.src = music_list[track_index].img;

      track_name.textContent = music_list[track_index].name;
      track_artist.textContent = music_list[track_index].artist;
      now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

      updateTimer = setInterval(setUpdate, 1000);
      curr_track.addEventListener("ended", nextTrack);
  } else {
      console.error("Track index out of bounds:", track_index);
  }
}

// Reset the track details
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Update the progress of the current track
function setUpdate() {
  if (!isNaN(curr_track.duration)) {
      let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;

      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Format time display
function formatTime(minutes, seconds) {
  return `${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
}

// Play or pause the track
function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fas fa-pause-circle"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fas fa-play-circle"></i>';
}


function nextTrack() {
  if (track_index < music_list.length - 1)
      track_index += 1;
  else 
      track_index = 0; // Loop back to the first track
  loadTrack(track_index);
  playTrack();
}

// Go to the previous track
function prevTrack() {
  if (track_index > 0)
      track_index -= 1;
  else 
      track_index = music_list.length - 1; // Go to the last track if on first track
  loadTrack(track_index);
  playTrack();
}

// Seek functionality
seek_slider.addEventListener("input", () => {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
});

// Volume control with mute icon change
volume_slider.addEventListener("change", function () {
  curr_track.volume = volume_slider.value / 100;
  let volume_icon = document.querySelector(".volume i");

  if (volume_slider.value == 0) {
    volume_icon.classList.remove("fa-volume-up");
    volume_icon.classList.add("fa-volume-mute");
  } else {
    volume_icon.classList.remove("fa-volume-mute");
    volume_icon.classList.add("fa-volume-up");
  }
});

// Show the audio player
function showAudioPlayer() {
  audioPlayer.classList.remove("translate-y-full");
  audioPlayer.classList.add("translate-y-0");
}

// Hide the audio player
function hideAudioPlayer() {
  audioPlayer.classList.remove("translate-y-0");
  audioPlayer.classList.add("translate-y-full");
}

// Handle artist image click
function onArtistClick(index) {
  if (index >= 0 && index < music_list.length) {
    loadTrack(index);
    playTrack();
    showAudioPlayer();
  } else {
    console.error("Invalid artist index:", index);
  }
}

// Attach event listeners to artist boxes after they are added to DOM
document.querySelectorAll(".artist-box").forEach((box, index) => {
  box.addEventListener("click", () => onArtistClick(index));
});

// Event listeners for the buttons
playpause_btn.addEventListener("click", playpauseTrack);
next_btn.addEventListener("click", nextTrack);
prev_btn.addEventListener("click", prevTrack);


let volume_icon = document.getElementById("volume-icon"); // Get the volume icon element

volume_slider.addEventListener("change", function () {
  curr_track.volume = volume_slider.value / 100;

  // Change the icon based on volume level
  if (curr_track.volume === 0) {
    volume_icon.classList.remove("fa-volume-up");
    volume_icon.classList.add("fa-volume-mute");
  } else {
    volume_icon.classList.remove("fa-volume-mute");
    volume_icon.classList.add("fa-volume-up");
  }
});

function updateNextThreeSongs(currentIndex) {
  const song2 = document.getElementById("song-2");
  const song3 = document.getElementById("song-3");
  const song4 = document.getElementById("song-4");

  // Calculate the next three tracks
  const nextIndex1 = (currentIndex + 1) % music_list.length;
  const nextIndex2 = (currentIndex + 2) % music_list.length;
  const nextIndex3 = (currentIndex + 3) % music_list.length;

  // Update Song 2 div
  if (music_list[nextIndex1]) {
    song2.querySelector("img").src = music_list[nextIndex1].img;
    song2.querySelector("h3").textContent = music_list[nextIndex1].name;
    song2.querySelector("p:nth-child(2)").textContent = music_list[nextIndex1].artist;
    // Example time, can be updated dynamically based on duration
    song2.querySelector("p:nth-child(3)").textContent = "0:00 / 3:30"; 
  }

  // Update Song 3 div
  if (music_list[nextIndex2]) {
    song3.querySelector("img").src = music_list[nextIndex2].img;
    song3.querySelector("h3").textContent = music_list[nextIndex2].name;
    song3.querySelector("p:nth-child(2)").textContent = music_list[nextIndex2].artist;
    song3.querySelector("p:nth-child(3)").textContent = "0:00 / 3:45";
  }

  // Update Song 4 div
  if (music_list[nextIndex3]) {
    song4.querySelector("img").src = music_list[nextIndex3].img;
    song4.querySelector("h3").textContent = music_list[nextIndex3].name;
    song4.querySelector("p:nth-child(2)").textContent = music_list[nextIndex3].artist;
    song4.querySelector("p:nth-child(3)").textContent = "0:00 / 4:00";
  }
}

let isPlayerVisible = true;

// Add a click event listener to the album cover
albumCover.addEventListener("click", () => {
  if (isPlayerVisible) {
    // Hide the audio player
    audioPlayer.style.transform = "translateY(100%)";
  } else {
    // Show the audio player
    audioPlayer.style.transform = "translateY(0)";
  }
  // Toggle the flag value
  isPlayerVisible = !isPlayerVisible;
});
