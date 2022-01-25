let progressBar = document.querySelector(".progress_bar");
let timeValue = document.querySelector(".time_value");
let playPauseButton = document.querySelector(".play_pause");

let minutes = 25
	, seconds = 0
	, totalSeconds = minutes * 60
	, divisor = totalSeconds / 100;
let isEnd = false;
let speed = 1;
let progress;

playPauseButton.addEventListener("click", () => {
	if(playPauseButton.textContent === "PAUSE") {
		clearInterval(progress);
		playPauseButton.textContent = "PLAY";
	} else {
		progress = setInterval(() => {
			reducingTime();

			timeValue.textContent = convertTimeToString();

			progressBar.style.background = `conic-gradient(
					#F67171 ${totalSeconds / divisor * 3.6}deg,
					#1E2140 ${totalSeconds / divisor * 3.6}deg
			)`;
			if (isEnd) {
				clearInterval(progress);
			}
		}, speed);
		playPauseButton.textContent = "PAUSE";
	}
})

function reducingTime() {
	totalSeconds--;
	seconds--;
	if(seconds < 0) {
		seconds = 59;
		minutes--;
		if(minutes < 0) {
			minutes = 0;
			seconds = 0;
			isEnd = true;
		}
	}
}

function convertTimeToString() {
	let tempMinutes = (minutes.toString().length === 1)
		? "0" + minutes.toString()
		: minutes.toString();
	let tempSeconds = (seconds.toString().length === 1)
		? "0" + seconds.toString()
		: seconds.toString();

		console.log(`${tempMinutes}:${tempSeconds}`);

	return `${tempMinutes}:${tempSeconds}`;
}
