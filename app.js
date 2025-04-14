
let error = 0;
let cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
];

let cardSet;
let board = [];

const row = 4;
const col = 5;

let matches = 0;
let preventClick = false;

let card1selected, card2selected;

window.onload = reload;

function reload() {
    // Reset variables
    cardSet = [];
    board = [];
    card1selected = null;
    card2selected = null;
    error = 0;
    document.getElementById("mistake").innerText = error;

    // Clear the board visually
    document.querySelector(".container").innerHTML = "";

    shuffleCards();
    startGame();
    setTimeout(hideCards, 1500);

    document.querySelector("#won").innerText = "";
}

function shuffleCards() {

    cardSet = cardList.concat(cardList);


    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random idx

        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet)
}


function startGame() {

    for (let r = 0; r < row; r++) {
        let row = []
        for (let c = 0; c < col; c++) {

            let cardImg = cardSet.pop();

            row.push(cardImg);

            let card = document.createElement("img");

            card.id = r.toString() + c.toString();

            card.src = "Assets/" + cardImg + ".jpg";

            card.classList.add("card")

            card.addEventListener("click", selectedCard);
            document.querySelector(".container").append(card);
        }
        board.push(row);
    }
    console.log(board)

}

function hideCards() {

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {

            let card = document.getElementById(r.toString() + c.toString());
            card.src = "Assets/back.jpg";

        }
    }
}

function selectedCard() {

    if (preventClick || this.src.includes("back")) {

        // preventClick = true;

        if (!card1selected) {
            card1selected = this;

            let coords = card1selected.id.split("");
            let r = coords[0];
            let c = coords[1];

            card1selected.src = "Assets/" + board[r][c] + ".jpg";
        }
        else if (!card2selected && this != card1selected) {
            card2selected = this;

            let coords = card2selected.id.split("");
            let r = coords[0];
            let c = coords[1];

            card2selected.src = "Assets/" + board[r][c] + ".jpg";
        }
    }
    setTimeout(() => {
        Update();
        preventClick = false;
    }, 1000);
}
   

function Update() {
    if (card1selected.src !== card2selected.src) {
        card1selected.src = "Assets/back.jpg";
        card2selected.src = "Assets/back.jpg";
        error += 1;
        document.getElementById("mistake").innerText = error;
    }
    else{
        
        matches += 1;
       

        if (matches === 10) {
            document.querySelector(".won").innerText = "You Won!"
        }
    }
     card1selected = null;
        card2selected = null;

}


