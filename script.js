// Imports
// import axios from "axios";

// Document elements
const quote = document.getElementById("quote");
const author = document.getElementById("author");

// Global function calls
getRandomQuote();

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

// Event listeners
