const img = document.querySelector("img");
const music = document.querySelector("audio");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let progress = document.getElementById("progress");
let isplaying = false;
const progress_div = document.getElementById("progress_div");
let duration1 = document.getElementById("duration");
let current_time = document.getElementById("current_time");
let vol = document.getElementById("volume");
let sli = document.querySelector(".slider");
let replay = document.getElementById("replay");
const songs = [
    {
        name: "believer",
        title: "Believer",
        artist: "Imagine Dragons"
    },
    {
        name: "shape",
        title: "Shape Of You",
        artist: "Ed Sheeran"
    },
    {
        name: "faded",
        title: "faded",
        artist: "Alan Walker"
    }
]


const playmusic = () => {
    isplaying = true;
    loadsong(songs[0]);
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
    document.getElementById("download").href = `${music.src}`;

};

const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
    document.getElementById("download").href = `${music.src}`;
};

play.addEventListener("click", () => {
    isplaying ? pausemusic() : playmusic();
});

//changing musics
const loadsong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    // music.src="music/"+ songs.name +".mp3";
    music.src = `music/${songs.name}.mp3`;
    img.src = `img/${songs.name}.jpg`;
};
let songindex = 0;
// loadsong(songs[2]);
const nextsong = () => {
    songindex = (songindex + 1) % songs.length;
    loadsong(songs[songindex]);
    playmusic();
};
const prevsong = () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    loadsong(songs[songindex]);
    playmusic();
};

// progress work
music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration updation
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        duration1.textContent = `${tot_duration}`;
    }


    // currect time updation
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
});

// progress onclick 
progress_div.addEventListener("click", (event) => {
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    music.currentTime = move_progress;
});
replay.addEventListener("click", () => {
    music.currentTime = 0;
    // music.play();
    playmusic();
})

music.addEventListener("ended", nextsong);

next.addEventListener("click", nextsong);
prev.addEventListener("click", prevsong);

// volume
vol.addEventListener("input", function () {

    music.volume = vol.value / 100;

}, false);
