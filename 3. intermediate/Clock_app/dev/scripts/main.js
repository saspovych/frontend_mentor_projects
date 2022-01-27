const blockquoteGenerator = document.querySelector(".blockquote_generator");
const blockquote = document.getElementById('blockquote');
const author = document.getElementById('author');
const newQuote = document.getElementById('new_quote');

const greetings = document.querySelector(".greetings_text");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const clock = document.querySelector(".clock");
const loca = document.querySelector(".location");

const moreLessButton = document.querySelector(".more_less_button");
const chevron = document.querySelector(".chevron");
const mainScreen = document.querySelector(".main_screen");
const moreInfoBlock = document.querySelector(".more_information_screen");

const currentTimezone = document.getElementById("current_timezone");
const dayOfTheYear = document.getElementById("day_of_the_year");
const dayOfTheWeek = document.getElementById("day_of_the_week");
const weekNumber = document.getElementById("week_number");

newQuote.addEventListener('click', () => {
	getNewQuote();
})
// Отправляет запрос для получения цитаты дня
async function getNewQuote() {
	let quote = await fetch(`https://favqs.com/api/qotd`);
	quote = await quote.json();
	renderQuote(quote.quote.body, quote.quote.author)
}
// Отображает цитату
function renderQuote(quote, auth) {
	blockquote.textContent = `"${quote}"`;
	author.textContent = auth;
}

getNewQuote();

setInterval(async function getTime() {
	let time = await fetch(`http://worldtimeapi.org/api/timezone/Europe/Moscow`);
	time = await time.json();

	currentTimezone.textContent = time.timezone;
	dayOfTheYear.textContent = time.day_of_year;
	dayOfTheWeek.textContent = time.day_of_week;
	weekNumber.textContent = time.week_number;
	clock.textContent = time.datetime.match(/\d\d:\d\d/);
	loca.textContent = time.timezone.slice(time.timezone.indexOf("/") + 1);


	let hour = clock.textContent.match(/\d\d/);
	if(hour >= 0 && hour <= 12) {
		greetings.textContent = "GOOD MORNING";
		moon.style.display = "none";
		sun.style.display = "inline-block";
	} else if(hour >= 13 && hour <= 16) {
		greetings.textContent = "GOOD AFTERNOON";
		moon.style.display = "none";
		sun.style.display = "inline-block";
	} else if(hour >= 17 && hour <= 20) {
		greetings.textContent = "GOOD EVENING";
		sun.style.display = "none";
		moon.style.display = "inline-block";
	} else {
		greetings.textContent = "GOOD NIGHT";
		sun.style.display = "none";
		moon.style.display = "inline-block";
	}
}, 1000);


moreLessButton.addEventListener("click", () => {
	if(moreLessButton.firstElementChild.textContent === "MORE") {
		moreLessButton.firstElementChild.textContent = "LESS";
		chevron.style.transform = "rotate(180deg)";
		chevron.style.marginRight = "5px";
	} else {
		moreLessButton.firstElementChild.textContent = "MORE";
		chevron.style.transform = "rotate(0deg)";
		chevron.style.marginRight = "0px";
	}

	moreInfoBlock.classList.toggle('hidden');
	if(moreInfoBlock.classList.contains("hidden")) {
		mainScreen.style.height = "100%";
		blockquoteGenerator.classList.remove("hidden");
		blockquoteGenerator.style.display = "flex";
	} else {
		mainScreen.style.height = "50%";
		blockquoteGenerator.classList.add("hidden");
		setTimeout(() => {
			blockquoteGenerator.style.display = "none";
		}, 150)
	}
})