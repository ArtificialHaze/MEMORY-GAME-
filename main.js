// VARIABLES

const section = document.querySelector("section");
const triesCount = document.querySelector("span");
let tries = 6;

triesCount.textContent = tries;

// IMAGES

const getImages = () =>
  // IMAGES WITH RANDOM NAMES

  [
    { id: 1, imgSource: "./images/1.jpg", name: "1" },
    { id: 2, imgSource: "./images/2.jpg", name: "2" },
    { id: 3, imgSource: "./images/3.jpg", name: "3" },
    { id: 4, imgSource: "./images/4.jpg", name: "4" },
    { id: 5, imgSource: "./images/5.jpg", name: "5" },
    { id: 6, imgSource: "./images/6.jpg", name: "6" },
    { id: 7, imgSource: "./images/7.jpg", name: "7" },
    { id: 8, imgSource: "./images/8.jpg", name: "8" },
    { id: 9, imgSource: "./images/1.jpg", name: "1" },
    { id: 10, imgSource: "./images/2.jpg", name: "2" },
    { id: 11, imgSource: "./images/3.jpg", name: "3" },
    { id: 12, imgSource: "./images/4.jpg", name: "4" },
    { id: 13, imgSource: "./images/5.jpg", name: "5" },
    { id: 14, imgSource: "./images/6.jpg", name: "6" },
    { id: 15, imgSource: "./images/7.jpg", name: "7" },
    { id: 16, imgSource: "./images/8.jpg", name: "8" },
  ];

// PICK RANDOMLY

const randomImage = () => {
  const data = getImages();
  data.sort(() => Math.random() - 0.5);
  return data;
};

// GENERATE CARDS RANDOMLY

const imageGeneratorForCards = () => {
  const data = randomImage();
  //   CREATE & APPEND HTML TO DOM
  data.forEach((element) => {
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("div");
    card.classList.add("card");
    front.classList.add("front");
    back.classList.add("back");

    front.src = element.imgSource;
    card.setAttribute("name", element.name);

    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggle");
      checkForMatch(e);
    });
  });
};

// CHECK FOR A MATCH

const checkForMatch = (e) => {
  const clickedImage = e.target;
  clickedImage.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggledCards = document.querySelectorAll(".toggle");

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("It is a MATCH!");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggle"), 1500);
      });
      tries--;
      triesCount.textContent = tries;
      //   LOSE GAME MESSAGE
      if (tries === 0) {
        restartGame("Try Again!");
      }
    }
  }
  //   WIN GAME MESSAGE
  if (toggledCards.length === 16) {
    restartGame("YOU'VE WON!");
  }
};

// RESTART THE GAME

const restartGame = (message) => {
  let cardData = randomImage();
  let fronts = document.querySelectorAll(".front");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggle");
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      fronts[index].src = item.imgSource;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 2000);
  });
  tries = 6;
  triesCount.textContent = tries;
  setTimeout(() => window.alert(message), 100);
};

imageGeneratorForCards();
