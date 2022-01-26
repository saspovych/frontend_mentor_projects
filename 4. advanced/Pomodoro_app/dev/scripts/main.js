let progressBar = document.querySelector(".progress_bar");
let timeValue = document.querySelector(".time_value");
let playPauseButton = document.querySelector(".play_pause");

let settingsButton = document.querySelector(".settings_icon");
let modal = document.querySelector(".modal");
let modalWindow = document.querySelector(".modal_settings");
let modalClose = document.querySelector(".settings_close");
let modalSettingsUL = document.querySelectorAll(".modal_settings ul");
let applyButton = document.querySelector(".apply");

let body = document.body;
let inputs = document.querySelectorAll("input");
let buttons = document.querySelectorAll("button");
let activeModes = document.querySelector(".pomodoro_modes li.active");
let pomodoroModes = document.querySelectorAll(".pomodoro_modes li");
let mainColor = "#f1756d";
activeModes.style.background = mainColor;

let minutes = 25
	, seconds = 0
	, totalSeconds = minutes * 60
	, divisor = totalSeconds / 100;
let isEnd = false;
let speed = 1000;
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
					${mainColor} ${totalSeconds / divisor * 3.6}deg,
					#1E2140 ${totalSeconds / divisor * 3.6}deg
			)`;
			if(isEnd) {
				clearInterval(progress);
				isEnd = false;
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

	return `${tempMinutes}:${tempSeconds}`;
}

settingsButton.addEventListener("click", () => {
	modal.style.display = "flex";
})

modal.addEventListener("click", () => {
	modal.style.display = "none";
})

modalWindow.addEventListener("click", (event) => {
	event.stopPropagation();
})

modalClose.addEventListener("click", () => {
	modal.style.display = "none";
})

modalSettingsUL.forEach(item => {
	let list = item.querySelectorAll('li');
	list.forEach(subItem => {
		subItem.addEventListener("click", (event) => {
			for(let i = 0; i < list.length; i++) {
				list[i].classList.remove('active')
			}
			if(subItem.classList.contains("pt_sans")) {
				body.style.fontFamily = "PT Sans";
				inputs.forEach(input => {
					input.style.fontFamily = "PT Sans";
				})
				buttons.forEach(button => {
					button.style.fontFamily = "PT Sans";
				})
			} else if(subItem.classList.contains("oswald")) {
				body.style.fontFamily = "Oswald";
				inputs.forEach(input => {
					input.style.fontFamily = "Oswald";
				})
				buttons.forEach(button => {
					button.style.fontFamily = "Oswald";
				})
			} else if(subItem.classList.contains("poppins")){
				body.style.fontFamily = "Poppins";
				inputs.forEach(input => {
					input.style.fontFamily = "Poppins";
				})
				buttons.forEach(button => {
					button.style.fontFamily = "Poppins";
				})
			} else if(subItem.classList.contains("red")) {
				// Apply, Pomodoro Modes, progressBAr
				mainColor = "#f1756d";
				activeModes.style.backgroundColor = mainColor;
				applyButton.style.backgroundColor = mainColor;
				progressBar.style.background = `conic-gradient(
					${mainColor} ${totalSeconds / divisor * 3.6}deg,
					#1E2140 ${totalSeconds / divisor * 3.6}deg
			)`;
			} else if(subItem.classList.contains("skyblue")) {
				mainColor = "#71f1f7";
				activeModes.style.backgroundColor = mainColor;
				applyButton.style.backgroundColor = mainColor;
				progressBar.style.background = `conic-gradient(
					${mainColor} ${totalSeconds / divisor * 3.6}deg,
					#1E2140 ${totalSeconds / divisor * 3.6}deg
			)`;
			} else if(subItem.classList.contains("purple")) {
				mainColor = "#da80fb";
				activeModes.style.backgroundColor = mainColor;
				applyButton.style.backgroundColor = mainColor;
				progressBar.style.background = `conic-gradient(
					${mainColor} ${totalSeconds / divisor * 3.6}deg,
					#1E2140 ${totalSeconds / divisor * 3.6}deg
			)`;
			}
			subItem.classList.add('active');
		})
	})
})


applyButton.addEventListener("click", () => {
	minutes = document.getElementById("pomodoro").value;
	seconds = 0;
	timeValue.textContent = convertTimeToString()
	totalSeconds = minutes * 60
	divisor = totalSeconds / 100;
	progressBar.style.background = `conic-gradient(
			${mainColor} ${totalSeconds / divisor * 3.6}deg,
			#1E2140 ${totalSeconds / divisor * 3.6}deg
	)`;

	for(let i = 0; i < pomodoroModes.length; i++) {
		pomodoroModes[i].classList.remove("active");
		pomodoroModes[i].style.background = "none";

	}
	pomodoroModes[0].classList.add("active");
	pomodoroModes[0].style.background = mainColor;
	playPauseButton.textContent = "PLAY";
	clearInterval(progress);
	isEnd = false;

	modal.style.display = "none";
})


pomodoroModes.forEach(mode => {
	mode.addEventListener("click", () => {
		switch(mode.id) {
			case "pomodoro_mode":
				minutes = document.getElementById("pomodoro").value;
				seconds = 0;
				timeValue.textContent = convertTimeToString()
				totalSeconds = minutes * 60
				divisor = totalSeconds / 100;
				progressBar.style.background = `conic-gradient(
						${mainColor} ${totalSeconds / divisor * 3.6}deg,
						#1E2140 ${totalSeconds / divisor * 3.6}deg
				)`;
				for(let i = 0; i < pomodoroModes.length; i++) {
					pomodoroModes[i].classList.remove("active");
					pomodoroModes[i].style.background = "none";
				}
				mode.classList.add("active");
				mode.style.background = mainColor;

				playPauseButton.textContent = "PLAY";
				clearInterval(progress);
				isEnd = false;
				break;
			case "short_break_mode":
				minutes = document.getElementById("short_break").value;
				seconds = 0;
				timeValue.textContent = convertTimeToString()
				totalSeconds = minutes * 60
				divisor = totalSeconds / 100;
				progressBar.style.background = `conic-gradient(
						${mainColor} ${totalSeconds / divisor * 3.6}deg,
						#1E2140 ${totalSeconds / divisor * 3.6}deg
				)`;
				for(let i = 0; i < pomodoroModes.length; i++) {
					pomodoroModes[i].classList.remove("active");
					pomodoroModes[i].style.background = "none";
				}
				mode.classList.add("active");
				mode.style.background = mainColor;

				playPauseButton.textContent = "PLAY";
				clearInterval(progress);
				isEnd = false;
				break;
			case "long_break_mode":
				minutes = document.getElementById("long_break").value;
				seconds = 0;
				timeValue.textContent = convertTimeToString()
				totalSeconds = minutes * 60
				divisor = totalSeconds / 100;
				progressBar.style.background = `conic-gradient(
						${mainColor} ${totalSeconds / divisor * 3.6}deg,
						#1E2140 ${totalSeconds / divisor * 3.6}deg
				)`;
				for(let i = 0; i < pomodoroModes.length; i++) {
					pomodoroModes[i].classList.remove("active");
					pomodoroModes[i].style.background = "none";
				}
				mode.classList.add("active");
				mode.style.background = mainColor;

				playPauseButton.textContent = "PLAY";
				clearInterval(progress);
				isEnd = false;
				break;
		}
	})
})

inputs.forEach(input => {
	input.addEventListener("input", () => {
		if(input.value.length > 2) {
			input.value = input.value.slice(0, 2);
		} else if(input.value < 0) {
			input.value = 0;
		}
	})
})