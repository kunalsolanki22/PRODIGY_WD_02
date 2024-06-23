window.onload = function() {
    const display = document.getElementById('display');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapsList = document.getElementById('laps');
    const countdownInput = document.getElementById('countdown-input');
    const startCountdownButton = document.getElementById('start-countdown');
    const countdownDisplay = document.getElementById('countdown-display');

    let startTime, updatedTime, difference, tInterval;
    let running = false;
    let lapCounter = 0;

    startButton.addEventListener('click', function() {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            tInterval = setInterval(updateTime, 1);
            running = true;
            startButton.textContent = "Resume";
        }
    });

    pauseButton.addEventListener('click', function() {
        if (running) {
            clearInterval(tInterval);
            running = false;
        }
    });

    resetButton.addEventListener('click', function() {
        clearInterval(tInterval);
        display.textContent = "00:00:00:000";
        running = false;
        difference = 0;
        lapsList.innerHTML = "";
        lapCounter = 0;
        startButton.textContent = "Start";
    });

    lapButton.addEventListener('click', function() {
        if (running) {
            lapCounter++;
            let lapTime = display.textContent;
            let li = document.createElement('li');
            li.innerText = `Lap ${lapCounter}: ${lapTime}`;
            lapsList.appendChild(li);
            lapsList.scrollTop = lapsList.scrollHeight; // Scroll to bottom
        }
    });

    startCountdownButton.addEventListener('click', function() {
        let time = parseInt(countdownInput.value);
        if (!isNaN(time) && time > 0) {
            startCountdown(time);
        }
    });

    function startCountdown(time) {
        let endTime = new Date().getTime() + (time * 1000);
        let countdownInterval = setInterval(function() {
            let currentTime = new Date().getTime();
            let remainingTime = Math.max(0, endTime - currentTime);
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            hours = (hours < 10) ? "0" + hours : hours;
            countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.textContent = "00:00:00";
            }
        }, 1000);
    }

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        let milliseconds = difference % 1000;

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = milliseconds.toString().padStart(3, '0');

        display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
}
