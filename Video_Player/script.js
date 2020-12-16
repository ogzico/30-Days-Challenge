/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */

function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]();
    if(method === "play") {
        toggle.classList.add("hidden")
        toggle.classList.remove("show")
    } else {
        toggle.classList.add("show")
        toggle.classList.remove("hidden")
    }
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
    progressBar.textContent = video.currentTime.toFixed(1);
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
}
/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress)

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mousedown', () => mousedown = false)