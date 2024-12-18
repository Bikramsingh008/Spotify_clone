console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = document.getElementsByClassName('song');
let mastersongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Shiv-Kailash", filePath: "song/1.mp3", coverPath: "cover/0.png" },
    { songName: "Tera-Fitoor", filePath: "song/2.mp3", coverPath: "cover/1.png" },
    { songName: "Tere-Liye-ki-nai-Karaya", filePath: "song/3.mp3", coverPath: "cover/2.png" },
    { songName: "Yeh-Tune-Kya-Kiya", filePath: "song/4.mp3", coverPath: "cover/3.jpg" },
    { songName: "Dil-Meri-Na-Sune", filePath: "song/5.mp3", coverPath: "cover/4.jpg" },
    { songName: "Bhulleya", filePath: "song/6.mp3", coverPath: "cover/5.jpg" },
    { songName: "Sajni-Re", filePath: "song/7.mp3", coverPath: "cover/6.jpg" },
    { songName: "Qaafirana", filePath: "song/8.mp3", coverPath: "cover/7.jpg" }
];

// Convert songItems to an array and iterate
Array.from(songItems).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');

    // Update seekbar
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Seekbar control
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handle individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        // Update audio element and play the selected song
        audioElement.src = `song/${songIndex}.mp3`;
        mastersongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

        // Update masterPlay button
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    });
});

document.getElementById('next').addEventListener('click', () =>{
    if(songIndex>=7){
    songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () =>{
    if(songIndex<=0){
    songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})