const electron = require("electron");
const ipc = electron.ipcRenderer;

const btnPlay = document.getElementById('btnPlay');
const selectVideo = document.getElementById('btnSelectVideo');
var video = document.getElementById('video');
var lblCurrentTime = document.getElementById('lblCurrentTime');

btnPlay.addEventListener('click', () => {
    if(video.paused){
        video.play();
        btnPlay.innerText = "Pause";
    }
    else{
        video.pause();
        btnPlay.innerText = "Play";
    }
})

selectVideo.addEventListener('click', function() {
    ipc.send('open-dialog')
})

ipc.on('opened-dialog', function(event, res) {
    console.log(res);
    video.src = res;
})