//the two constructor files, and the inquirer npm
var basic = require("./basicCard.js");
var inquirer = require("inquirer");
//this array hold the cards
var cards = [];

//this is the root menue
function start(){
  inquirer.prompt([
    // Here we create a basic text prompt.
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

//this is a practice function for every card you have made, it does NOT presist
  function practice() {
    console.log("you are practicing")
  }
//function to check the kind of card made
function makeCard(){
  inquirer.prompt([{
    type: "list",
    message: "What kind of card?",
    choices: ["Basic", "Close Card"],
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
    message: "What is on the front of the card",
    name: "front"
  },
  {
    type: "input",
    message: "What is on the back of the card",
    name: "back"
  }]).then(function(response){
    console.log("a basic card is being made with " + response.front + " | " + response.back);
    var newCard = basic(response.front, response.back);
    cards.push(newCard);
    startAgain();
  })
}
function makeCloze(){
  console.log("making a cloze Card")
}



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
start();
