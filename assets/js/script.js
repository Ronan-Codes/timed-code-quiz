//Questions and Array
var qObj0 = {question: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctIndex: 2};

var qObj1 = {question: "Arrays in JavaScript can be used to store what?",
    choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    correctIndex: 3};

var qObj2 = {question: "what is the correct syntax for external script called \"xxx.js\"",
    choices: ["1. <script ref=\"xxx.js\">", "2. <script name=\"xxx.js\">", "3. <script div=\"xxx.js\">", "4. <script src=\"xxx.js>\">"],
    correctIndex: 3};

var qObj3 = {question: "Javascript is the same as Java.",
    choices: ["1. True", "2. False"],
    correctIndex: 1};

var qObj4 = {question: ".alert() is used to prompt a user to confirm okay/cancel.",
    choices: ["1. False", "2. True"],
    correctIndex: 0};

var qObj5 = {question: "How do you add an element to the end of another element in JavaScript?",
    choices: ["1. .appendChild", "2. .alertChild", "3. .className", "4. .prompt"],
    correctIndex: 0};

var qObj6 = {question: "Which of the following type of variable is visible only within a function where it is defined?",
    choices: ["1. Both", "2. global variable", "3. local variable", "4. None of the above"],
    correctIndex: 2};

var qObj7 = {question: "Which built-in method returns the characters in a string beginning at the specified location?",
    choices: ["1. slice()", "2. substr()", "3. getSubstring()", "4. None of the above"],
    correctIndex: 1};

var qObj8 = {question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<scripting>", "<script>", "<js>", "<javascript>"],
    correctIndex: 1};

var qObj9 = {question: "Which of the following function of String object returns the calling string value converted to uppercase?",
    choices: ["toUpperCase()", "toLowerCase()", "toString()"],
    correctIndex: 0};

var questions = [qObj0, qObj1, qObj2, qObj3, qObj4, qObj5, qObj6, qObj7, qObj8, qObj9];

//Other global variables
var qIndex = 0;
var timeLeft = 75;
var win = false;
var correct = false;
var highScores = [];
var hsStr ="";
var numCorrect = 0;


//DOM Elements
var listDiv = document.getElementById("list-div");
var cardTextDiv = document.getElementById("card-text");
var highScoreBtn = document.getElementById("high-score");
var timeCounter = document.getElementById("time");
var aCheckText = document.getElementById("answer-check");

//function to remove child buttons
function resetVars(){
    timeLeft = 75;
    qIndex = 0;
    win = false;
    numCorrect = 0
  }

  //function to remove buttons from html
  function removeBtns(){
    while(listDiv.firstChild) {
      listDiv.removeChild(listDiv.firstChild);
    }
  };

  //function to show if answer was correct or wrong
  function answerCheck(correct){
    if(correct){
      aCheckText.textContent = "correct";
    }else{
      aCheckText.textContent = "wrong";
    }

  var setTO = setTimeout(function(){
    aCheckText.textContent = "";
  }, 500);
  }

  // function render start button and to start timer
  function startGame(){
    removeBtns();
    resetVars();
    //get card-body by id and set text
    cardTextDiv.textContent = "There are 10 questions, each wrong anwer will cost you 5 seconds. How fast can you get through them? Click the Start button to start Quiz";
    // add start button
    var startBtn = document.createElement("button");
    startBtn.setAttribute("type", "button");
    startBtn.setAttribute("class", "btn");
    startBtn.setAttribute("id", "start");
    startBtn.textContent = "Start";
    listDiv.appendChild(startBtn);
  };
  function displayQ(index){
    removeBtns();
    //displayquestion
    cardTextDiv.textContent = questions[index].question;
    //create answer buttons
    for(i = 0; i < questions[index].choices.length; i++){
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("type", "button");
      choiceBtn.setAttribute("class", "btn");
      choiceBtn.setAttribute("id", i);
      choiceBtn.textContent = questions[index].choices[i];
      listDiv.appendChild(choiceBtn);
      listDiv.appendChild(document.createElement("br"));
    }
  };
  function playGame(){
    win = false;
    numCorrect = 0;

    //visble countdown timer
    var timer = setInterval(function(){
      timeCounter.textContent = timeLeft;
      timeLeft--;
      //end game and timer when done
      if(timeLeft <= 0 || win){
        clearInterval(timer);
        endGame();
      }
    }, 1000);

    //ask first question
    displayQ(qIndex);
  };
  function checkButton(event){
    var targetId = parseInt(event.target.id);
      //check answer if correct
      if(targetId === questions[qIndex].correctIndex){
        numCorrect++;
        qIndex++;
        aCheckText.textContent = "correct";
        correct = true;
        answerCheck(correct);
        //If there are more questions, display next, else end game
        if(qIndex < questions.length){
          displayQ(qIndex);
        }else{
          win = true;
          endGame();
        }
      }else{
        timeLeft -= 5;
        aCheckText.textContent = "wrong"
        correct = false;
        answerCheck(correct);
      }
  };

  function endGame(){
    removeBtns();
    //If all questions were answered, else if not
    if(qIndex === questions.length){
      cardTextDiv.textContent = "You correctly answered all 10.  You had " + timeLeft + " seconds left!";
      //create form to add high score

    }
  };
  function displayHS(){
  };
  // event listeners for button clicks
  listDiv.addEventListener("click", function(event){
    if(event.target.matches("button")){
      if(event.target.id === "start"){
        playGame();
      }else{
        checkButton(event);
      }
    }
  });
  highScoreBtn.addEventListener("click", displayHS);
  startGame();
