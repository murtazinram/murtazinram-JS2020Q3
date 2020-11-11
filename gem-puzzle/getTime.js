export function getTime(startTime) {
    const start = new Date(startTime)
    const now = new Date();
    const time = document.querySelector('#time');
    const timeInSec = Math.round((now.getTime() - start.getTime()) / 1000);
    const min = Math.floor(timeInSec / 60);
    const sec = timeInSec - min * 60;
    time.innerText = `${min}:${sec.toString().padStart(2, '0')}`;
}
