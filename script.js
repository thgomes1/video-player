let videoContainer = document.getElementById("videoContainer");
let video = document.getElementById("video");
let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");
let controls = document.getElementById("controls");
let playStopIcon = document.getElementById("playStopIcon");
let progressBar = document.getElementById("progressBar");
let inputProgressBar = document.getElementById("inputProgressBar");
let volumeContainer = document.getElementById("volumeContainer");
let volumeIcon = document.getElementById("volumeIcon");
let inputVolumeBar = document.getElementById("inputVolumeBar");
let footerContainer = document.getElementById("footerContainer");
let counter;

onload = function () {
    video.addEventListener("timeupdate", progressBarWidth);
    video.addEventListener("dblclick", fullscreen);
    video.addEventListener("click", playStop);
    videoContainer.addEventListener("mouseover", showControls);
    volumeContainer.addEventListener("mouseover", showVolumeBar);
    footerContainer.addEventListener("mouseover", showFooterContainer);
    video.addEventListener("play", countTime);
    inputVolumeBar.addEventListener("change", volumeBarValue);
};

function calcTime(value) {
    var sec = parseInt(value);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours == 0) {
        return minutes + ":" + (seconds >= 10 ? seconds : "0" + seconds);
    } else {
        return hours + ":" + (minutes >= 10 ? minutes : "0" + minutes) + ":" + (seconds >= 10 ? seconds : "0" + seconds);
    }
}
function countTime() {
    totalTime.innerHTML = calcTime(video.duration);
    counter = setInterval(function () {
        currentTime.innerHTML = calcTime(video.currentTime);
    }, 1000);
}

function showFooterContainer() {
    footerContainer.style.height = "115px";
    footerContainer.addEventListener("mouseleave", function () {
        footerContainer.style.height = "32px";
    });
}

function showVolumeBar() {
    inputVolumeBar.style.width = "80px";
    volumeContainer.addEventListener("mouseleave", function () {
        inputVolumeBar.style.width = "0px";
        volumeContainer.style.width = "";
    });
}

function showControls() {
    controls.style.bottom = "0%";
    videoContainer.addEventListener("mouseleave", function () {
        controls.style.bottom = "-20%";
    });
}

function playStop() {
    if (video.paused) {
        playStopIcon.setAttribute("src", "./assets/images/pause.png");
        video.play();
    } else {
        playStopIcon.setAttribute("src", "./assets/images/play.png");
        video.pause();
    }
}
function videoTime() {
    timeCurrent = video.duration * (inputProgressBar.value / 1000);
    video.currentTime = timeCurrent;
}
function progressBarWidth() {
    time = video.currentTime * (1000 / video.duration);
    width = time / 10;
    progressBar.style.width = `${width}%`;
}

function volumeBarValue() {
    volume = inputVolumeBar.value / 100;
    video.volume = volume;
    if (video.volume === 0) {
        volumeIcon.setAttribute("src", "./assets/images/muted.png");
    } else if (video.volume <= 0.3) {
        volumeIcon.setAttribute("src", "./assets/images/volumelow.png");
    } else if (video.volume <= 0.6) {
        volumeIcon.setAttribute("src", "./assets/images/volumemedium.png");
    } else {
        volumeIcon.setAttribute("src", "./assets/images/volume.png");
    }
}
function back() {
    video.currentTime -= 10;
}
function forward() {
    video.currentTime += 10;
}
function fullscreen() {
    video.requestFullscreen();
}
