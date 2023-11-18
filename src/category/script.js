const locationsMenu = document.getElementById("locations");
const charactersMenu = document.getElementById("characters");
const episodesMenu = document.getElementById("episodes");

const locationsTitle = document.getElementById("locations-title");
const charactersTitle = document.getElementById("characters-title");
const episodesTitle = document.getElementById("episodes-title");

const locationsList = document.createElement("ul");
const charactersList = document.createElement("ul");
const episodesList = document.createElement("ol");

let locationsAmount = 0;
let charactersAmount = 0;
let episodesAmount = 0;

let promises = [];

promises.push(
  new Promise((resolve, reject) => {
    axios.get("https://finalspaceapi.com/api/v0/location/").then((response) => {
      // console.log("locations", response.data);

      response.data.forEach((location, index) => {
        let locationElement = document.createElement("li");
        let cardLink = document.createElement("a");
        cardLink.href = `../details/${location.name
          .toLowerCase()
          .replace(/(\s+\w)/g, function (match) {
            return match.trim().toUpperCase();
          })}.html`;

        let locationCard = document.createElement("div");
        locationCard.classList.add("card");

        let cardTitle = document.createElement("h3");
        cardTitle.innerText = location.name;

        let cardImg = document.createElement("img");
        cardImg.src = location.img_url;
        cardImg.alt = `Picture of ${location.name}`;

        let cardBody = document.createElement("ul");

        let locationType = document.createElement("li");
        locationType.innerText = location.type;

        cardBody.append(locationType);
        locationCard.append(cardTitle, cardImg, cardBody);
        cardLink.appendChild(locationCard);
        locationElement.appendChild(cardLink);
        locationsList.appendChild(locationElement);

        if (index === response.data.length - 1) resolve();
      });
    });
  })
);

promises.push(
  new Promise((resolve, reject) => {
    axios
      .get("https://finalspaceapi.com/api/v0/character/")
      .then((response) => {
        // console.log("characters", response.data);

        charactersAmount = response.data.length;

        response.data.forEach((character, index) => {
          let characterElement = document.createElement("li");

          let cardLink = document.createElement("a");
          cardLink.href = `../details/${character.name
            .toLowerCase()
            .replace(/(\s+\w)/g, function (match) {
              return match.trim().toUpperCase();
            })}.html`;

          let characterCard = document.createElement("div");
          characterCard.classList.add("card");

          let cardTitle = document.createElement("h3");
          cardTitle.innerText = character.name;

          let cardImg = document.createElement("img");
          cardImg.src = character.img_url;
          cardImg.alt = `Picture of ${character.name}`;

          let cardBody = document.createElement("ul");

          let characterStatus = document.createElement("li");
          characterStatus.innerText = character.status;

          if (
            character.status === "Alive" ||
            character.status === "Operational"
          )
            characterStatus.classList.add("alive");
          else if (
            character.status === "Deceased" ||
            character.status === "Deceased (Possessed)" ||
            character.status === "Destroyed"
          )
            characterStatus.classList.add("deceased");
          else characterStatus.classList.add("unknown");

          cardBody.append(characterStatus);
          characterCard.append(cardTitle, cardImg, cardBody);
          cardLink.appendChild(characterCard);
          characterElement.appendChild(cardLink);
          charactersList.appendChild(characterElement);

          if (index === response.data.length - 1) resolve();
        });
      });
  })
);

promises.push(
  new Promise((resolve, reject) => {
    axios.get("https://finalspaceapi.com/api/v0/episode/").then((response) => {
      // console.log(response.data);

      episodesAmount = response.data.length;

      response.data.forEach((episode, index) => {
        let episodeElement = document.createElement("li");

        let cardLink = document.createElement("a");
        cardLink.href = `../details/${episode.name
          .toLowerCase()
          .replace(/(\s+\w)/g, function (match) {
            return match.trim().toUpperCase();
          })}.html`;

        let episodeCard = document.createElement("div");
        episodeCard.classList.add("card");

        let cardTitle = document.createElement("h3");
        cardTitle.innerText = episode.name;

        let cardImg = document.createElement("img");
        cardImg.src = episode.img_url;
        cardImg.alt = `Picture of ${episode.name}`;

        let cardBody = document.createElement("ul");

        let episodeDirector = document.createElement("li");
        episodeDirector.innerHTML = `<span style="font-weight: bold">Director:</span> ${episode.director}.`;

        let episodeWriter = document.createElement("li");
        episodeWriter.innerHTML = `<span style="font-weight: bold">Writer:</span> ${episode.writer}.`;

        cardBody.append(episodeDirector, episodeWriter);
        episodeCard.append(cardTitle, cardImg, cardBody);
        cardLink.appendChild(episodeCard);
        episodeElement.appendChild(cardLink);
        episodesList.appendChild(episodeElement);

        if (index === response.data.length - 1) resolve();
      });
    });
  })
);

Promise.all(promises).then(() => {
  // APPEND LISTS TO MENUS
  locationsMenu.append(locationsList);
  charactersMenu.append(charactersList);
  episodesMenu.append(episodesList);

  const menus = [locationsMenu, charactersMenu, episodesMenu];
  const menuTitles = [locationsTitle, charactersTitle, episodesTitle];
  const amounts = [locationsAmount, charactersAmount, episodesAmount];

  menuTitles.forEach((title, index) => {
    title.addEventListener("click", () => {
      if (menus[index].childNodes[3].className === "") {
        menus[index].childNodes[3].className = "open";
        title.className = "open";
      } else {
        menus[index].childNodes[3].className = "";
        title.className = "";
      }
    });
  });
});
