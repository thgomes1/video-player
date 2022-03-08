let videoContainer = document.getElementById("videoContainer");
let video = document.getElementById("video");
let controls = document.getElementById("controls");
let play_stop = document.getElementById("playStop");
let inputTime = document.getElementById("timeBar");
let progressBar = document.getElementById("progressBar");
let inputVolume = document.getElementById("volumeBar");
let barVolume = document.getElementById("volumeControls");
let inputBarVolume = document.getElementById("volumeBar");
let volumeIcon = document.getElementById("volume");
let footer = document.getElementById("footerContainer");

onload = function () {
    video.addEventListener("timeupdate", videoTimeUpdate);
    videoContainer.addEventListener("mouseover", showControls);
    videoContainer.addEventListener("dblclick", fullscreen);
    video.addEventListener("click", playStop);
    barVolume.addEventListener("mouseover", showVolumeBar);
    footer.addEventListener("mouseover", showFooter);
};

function showFooter() {
    footer.style.height = "90px";
    footer.addEventListener("mouseleave", function () {
        footer.style.height = "32px";
    });
}

function showVolumeBar() {
    inputBarVolume.style.width = "80px";
    barVolume.addEventListener("mouseleave", function () {
        inputBarVolume.style.width = "0px";
        barVolume.style.width = "";
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
        play_stop.setAttribute("src", "./assets/images/pause.png");
        video.play();
    } else {
        play_stop.setAttribute("src", "./assets/images/play.png");
        video.pause();
    }
}
function videoTime() {
    time = video.duration * (inputTime.value / 1000);
    video.currentTime = time;
}
function videoTimeUpdate() {
    time = video.currentTime * (1000 / video.duration);
    inputTime.value = time;
    inputTime.addEventListener("change", barTimeWidth());
}
function barTimeWidth() {
    time = video.currentTime * (1000 / video.duration);
    timeBarWidth = time / 10;
    progressBar.style.width = `${timeBarWidth}%`;
}
function volumeBar() {
    volume = inputVolume.value / 100;
    video.volume = volume;
    inputVolume.addEventListener("change", barVolumeWidth());
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
function barVolumeWidth() {
    volumeBarWidth = volume * 100;
}
function back() {
    video.currentTime -= 10;
}
function forward() {
    video.currentTime += 10;
}
function increase_vel() {
    video.playbackRate += 0.1;
}
function decrease_vel() {
    video.playbackRate -= 0.1;
}
function fullscreen() {
    video.requestFullscreen();
}
