const thumbnail = document.getElementById("thumbnail");
const iframe = document.getElementById("video");

starGenerator();

//Function declaration
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

thumbnail.addEventListener("click", (event) => {
  thumbnail.style.display = "none";
  iframe.src =
    "https://www.youtube.com/embed/4EHbt_kSkG8?si=dmESUGAHFTeN1qGn&amp;controls=0&autoplay=1";
  iframe.style.display = "block";
});
