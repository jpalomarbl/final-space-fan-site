// Imports
// import axios from "axios";

// Document elements
const quote = document.getElementById("quote");
const author = document.getElementById("author");

// Global function calls
getRandomQuote();
starGenerator();

// Function declarations
function getRandomQuote() {
  axios.get("https://finalspaceapi.com/api/v0/quote/").then((response) => {
    console.log(response.data);

    const random = Math.floor(Math.random() * (response.data.length + 1));

    const randomQuote = response.data[random].quote;
    const randomQuoteAuthor = response.data[random].by;

    quote.innerText = `"${randomQuote}"`;
    author.innerText = `${randomQuoteAuthor}`;
  });
}

function starGenerator() {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  for (let i = 0; i < 300; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * scrollHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.animationDuration =
      Math.floor(Math.random() * (15 - 7 + 1)) + "s";
    star.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(star);
  }
}

//Listeners
let resizeTimer;
window.addEventListener("resize", function (e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    let stars = document.getElementsByClassName("star");

    while (stars.length > 0) {
      stars[0].parentNode.removeChild(stars[0]);
    }

    starGenerator();
  }, 250);
});

