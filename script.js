// Clock
const clock = () => {
  const addZeros = (time) => (time < 10 ? '0' + time : time);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dateEl = document.querySelector('#date');
  const hourEl = document.querySelector('#hour');
  const minuteEl = document.querySelector('#minute');
  const secondEl = document.querySelector('#second');
  const amPmEl = document.querySelector('#amPm');

  const updateTime = () => {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const hour = date.getHours() % 12 || 12;
    const minute = addZeros(date.getMinutes());
    const second = addZeros(date.getSeconds());
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

    dateEl.innerHTML = `${month} ${day} ${year}`;
    hourEl.innerHTML = hour;
    minuteEl.innerHTML = minute;
    secondEl.innerHTML = second;
    amPmEl.innerHTML = amPm;
  };
  updateTime();
  setInterval(updateTime, 1000);
};

clock();

// GitHub Zen API
const quote = document.querySelector('#quote');

const getZenQuote = async () => {
  const quoteText = localStorage.getItem('quoteText');
  const quoteTimestamp = localStorage.getItem('quoteTimestamp');

  if (quoteText && quoteTimestamp) {
    const now = new Date();
    const timestamp = new Date(quoteTimestamp);
    const diff = (now - timestamp) / 1000;
    if (diff < 60) {
      // Use cached quote if it's less than 1 minute old
      quote.innerHTML = quoteText;
      return;
    }
  }

  try {
    const response = await fetch('https://api.github.com/zen');
    const quoteText = await response.text();
    quote.innerHTML = quoteText;

    // Cache the quote text and timestamp
    localStorage.setItem('quoteText', quoteText);
    localStorage.setItem('quoteTimestamp', new Date().toISOString());
  } catch (error) {
    console.error(error);
    // Use cached quote if available
    if (quoteText) {
      quote.innerHTML = quoteText;
    } else {
      quote.innerHTML = 'Check your Internet connection and try again.';
    }
  }
};

getZenQuote();
setInterval(getZenQuote, 30000);

// Theme switcher
const themeBtn = document.querySelector('#theme-btn');
const html = document.documentElement;

const toggleTheme = () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
};

themeBtn.addEventListener('click', toggleTheme);

// Set initial theme based on user preference
const prefersDarkMode = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;
html.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
