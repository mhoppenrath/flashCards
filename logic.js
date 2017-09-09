//the two constructor files, and the inquirer npm
var basic = require("./basicCard.js");
var cloze = require("./ClozeCard.js");
var inquirer = require("inquirer");
//this array hold the cards
var cards = [];

//this is the root menu, all menues will be a choice between two things. It was reduced this way because
//I spliting was harder and I like idiot proofing.
function start(){
  inquirer.prompt([
    {
      type: "list",
      message: "What do you want to do?",
      choices: ["Practice", "Make a Card"],
      name: "initial"
    }]).then(function(response) {
      console.log(response.initial);
      if (response.initial === "Practice") {
        practice();
      }
      else {
        makeCard();
      }
    })
}


//function to check the kind of card made
function makeCard(){
  inquirer.prompt([{
    type: "list",
    message: "What kind of card?",
    choices: ["Basic", "Cloze Card"],
    name: "cardChoice"
  }]).then(function(response){
    if (response.cardChoice ==="Basic") {
      makeBasic();
    }
    else {
      makeCloze();
    }
  })
}
//makes a basic flash card
function makeBasic(){
  console.log("making a basic card")
  inquirer.prompt([{
    type: "input",
    message: "What is on the front of the card? ",
    name: "front"
  },
  {
    type: "input",
    message: "What is on the back of the card? ",
    name: "back"
  }]).then(function(response){
    console.log("a basic card is being made with " + response.front + " | " + response.back);
    var newCard = new basic(response.front, response.back);
    cards.push(newCard);
    startAgain();
  })
}

//make a "cloze" card
function makeCloze(){
  console.log("make cloze")
  inquirer.prompt([{
    type: "input",
    message: "what is the full text? ",
    name: "text"
  },
  {
    type: "input",
    message: "What word do you want removed? ",
    name: "cloze"
  }]).then(function(response){
    console.log("A card with " + response.text +" and this is removed: " + response.cloze)
    var newCard = new cloze(response.text, response.cloze);
    cards.push(newCard);
    startAgain();
  })


}
//this is a practice function for every card you have made, it does NOT presist
function practice() {
  if (cards.length>0) {
    runArray();
  }
    else {
    console.log("you Have no Cards to practice with")
    startAgain();
  }

}

//this handles going through the array and then which kind of card it is
function runArray() {
  console.log("you have cards to practice with")
  for (var i = 0; i < cards.length; i++) {
    console.log(cards[i]);
    if (cards[i].type = "basic"){
     basicCardPractice(cards[i]);
    }
    else {
     clozeCardsPractice(cards[i]);
   }
  }
  startAgain();
}

//practice for the basic cards
function basicCardPractice(card){
  inquirer.prompt([{
    type: "input",
    message: card.front,
    name: "answer"
  }]).then(function(response){
    if (response.answer === card.back) {
      console.log("Correct!!!");
    }
    else {
      console.log("Wrong! The correct answer is " + card.back);
    }
  })
}

//practice for the cloze cards
function clozeCardsPractice(card){
  console.log("What is the missing word/answer?\n")
  inquirer.prompt([{
    typer: "input",
    message: card.partial,
    name: "answer"
  }]).then(function(response){
    if (response.answer === card.cloze){
      console.log("Correct!!!");
    }
    else {
      console.log("Wrong! The Correct Answer is " + card.cloze);
    }
  })
}
//returns to the root menu or exit the program
function startAgain(){
  inquirer.prompt([{
    type: "confirm",
    message: "make a new card/practice?:",
    name: "confirm",
    default: true
  }]).then(function(response){
    if(response.confirm){
      start();
    }
  })
}

//this works exactly for the one instance you run the progam. You could put it in a SQL database but I'm lazy
start();
