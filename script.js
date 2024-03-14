const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let intervalId;
let startTime;
let elapsedTime = 0;
let tabTitleIntervalId;

function updateStopwatch() {
	const currentTime = new Date().getTime();
	elapsedTime = currentTime - startTime;

	const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
	const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
	const milliseconds = elapsedTime % 1000;

	hoursDisplay.textContent = padZero(hours);
	minutesDisplay.textContent = padZero(minutes);
	secondsDisplay.textContent = padZero(seconds);
	millisecondsDisplay.textContent = padMilliseconds(milliseconds);
}

function padZero(value) {
	return value.toString().padStart(2, "0");
}

function padMilliseconds(value) {
	return value.toString().padStart(3, "0").substring(0, 2);
}

function startStopwatch() {
	startTime = new Date().getTime() - elapsedTime;
	intervalId = setInterval(updateStopwatch, 10);
	updateTabTitle();
	tabTitleIntervalId = setInterval(updateTabTitle, 10);
	startButton.disabled = true;
	stopButton.disabled = false;
	resetButton.disabled = false;
}

function stopStopwatch() {
	clearInterval(intervalId);
	clearInterval(tabTitleIntervalId);
	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = false;
}

function resetStopwatch() {
	clearInterval(intervalId);
	clearInterval(tabTitleIntervalId);
	elapsedTime = 0;
	hoursDisplay.textContent = "00";
	minutesDisplay.textContent = "00";
	secondsDisplay.textContent = "00";
	millisecondsDisplay.textContent = "00";
	document.title = "Stopwatch";
	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = true;
}

function updateTabTitle() {
	const currentTime = new Date().getTime();
	const hours = Math.floor((currentTime - startTime) / (1000 * 60 * 60));
	const minutes = Math.floor(
		((currentTime - startTime) % (1000 * 60 * 60)) / (1000 * 60)
	);
	const seconds = Math.floor(((currentTime - startTime) % (1000 * 60)) / 1000);
	document.title = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
resetButton.addEventListener("click", resetStopwatch);

// ウィンドウをフォーカスしたら指定した関数を実行
window.addEventListener('focus', startStopwatch, false);

// ウィンドウからフォーカスが外れたら指定した関数を実行
window.addEventListener('blur', stopStopwatch, false);
