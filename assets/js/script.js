//Questions and Array
var qObj0 = {
    question: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctIndex: 2
};

var qObj1 = {
    question: "Arrays in JavaScript can be used to store what?",
    choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    correctIndex: 3
};

var qObj2 = {
    question: "what is the correct syntax for external script called \"xxx.js\"",
    choices: ["1. <script ref=\"xxx.js\">", "2. <script name=\"xxx.js\">", "3. <script div=\"xxx.js\">", "4. <script src=\"xxx.js>\">"],
    correctIndex: 3
};

var qObj3 = {
    question: "Javascript is the same as Java.",
    choices: ["1. True", "2. False"],
    correctIndex: 1
};

var qObj4 = {
    question: ".alert() is used to prompt a user to confirm okay/cancel.",
    choices: ["1. False", "2. True"],
    correctIndex: 0
};

var qObj5 = {
    question: "How do you add an element to the end of another element in JavaScript?",
    choices: ["1. .appendChild", "2. .alertChild", "3. .className", "4. .prompt"],
    correctIndex: 0
};

var qObj6 = {
    question: "Which of the following type of variable is visible only within a function where it is defined?",
    choices: ["1. Both", "2. global variable", "3. local variable", "4. None of the above"],
    correctIndex: 2
};

var qObj7 = {
    question: "Which built-in method returns the characters in a string beginning at the specified location?",
    choices: ["1. slice()", "2. substr()", "3. getSubstring()", "4. None of the above"],
    correctIndex: 1
};

var qObj8 = {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<scripting>", "<script>", "<js>", "<javascript>"],
    correctIndex: 1
};

var qObj9 = {
    question: "Which of the following function of String object returns the calling string value converted to uppercase?",
    choices: ["toUpperCase()", "toLowerCase()", "toString()"],
    correctIndex: 0
};

var questions = [qObj0, qObj1, qObj2, qObj3, qObj4, qObj5, qObj6, qObj7, qObj8, qObj9];

//Other global variables
var qIndex = 0;
var timeLeft = 75;
var win = false;
var correct = false;
var highScores = [];
var hsStr = "";
var numCorrect = 0;


//DOM Elements
var listDiv = document.getElementById("list-div");
var cardTextDiv = document.getElementById("card-text");
var highScoreBtn = document.getElementById("high-score-button");
var timeCounter = document.getElementById("time");
var aCheckText = document.getElementById("check-answer");

//remove child buttons
function resetVars() {
    timeLeft = 75;
    qIndex = 0;
    win = false;
    numCorrect = 0;
}

//remove buttons from html
function removeBtns() {
    while (listDiv.firstChild) {
        listDiv.removeChild(listDiv.firstChild);
    }
};

//show if answer was correct or wrong
function answerCheck(correct) {
    if (correct) {
        aCheckText.textContent = "correct";
    } else {
        aCheckText.textContent = "wrong";
    }

    var setTO = setTimeout(function () {
        aCheckText.textContent = "";
    }, 500);
}

//render start button and to start timer
function startGame() {
    removeBtns();
    resetVars();

    //start highScores
    storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores = storedScores;
    }

    //get card-body by id and set text
    cardTextDiv.textContent = "Answer 10 questions. Each wrong anwer will cost you 5 seconds. Answer as fast as you can and beat the high score. Click the Start button to begin!";

    // add start button
    var startBtn = document.createElement("button");
    startBtn.setAttribute("type", "button");
    startBtn.setAttribute("class", "btn");
    startBtn.setAttribute("id", "start");
    startBtn.textContent = "Start";
    listDiv.appendChild(startBtn);
};

//that display the question at the index of the array
function displayQ(index) {
    removeBtns();

    //displayquestion
    cardTextDiv.textContent = questions[index].question;

    //create answer buttons
    for (i = 0; i < questions[index].choices.length; i++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("type", "button");
        choiceBtn.setAttribute("class", "btn");
        choiceBtn.setAttribute("id", i);
        choiceBtn.textContent = questions[index].choices[i];
        listDiv.appendChild(choiceBtn);
        listDiv.appendChild(document.createElement("br"));
    }

};

//stars the timer
function playGame() {
    win = false;
    numCorrect = 0;

    //visble countdown timer
    var timer = setInterval(function () {
        timeCounter.textContent = timeLeft;
        timeLeft--;

        //end game and timer when done
        if (timeLeft <= 0 || win) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    //ask first question
    displayQ(qIndex);
};

//checks of button click was correct answer
function checkButton(event) {
    var targetId = parseInt(event.target.id);
    //check answer if correct
    if (targetId === questions[qIndex].correctIndex) {
        numCorrect++;
        qIndex++;
        correct = true;
        answerCheck(correct);
        //If there are more questions, display next, else end game
        if (qIndex < questions.length) {
            displayQ(qIndex);
        } else {
            win = true;
            endGame();
        }
    } else {
        timeLeft -= 5;
        correct = false;
        answerCheck(correct);
    }
};

//displays the result of the game and get high score name
function endGame() {
    removeBtns();

    //If all questions were answered, else if not
    if (qIndex === questions.length) {
        //correct time for score
        timeLeft++;
        cardTextDiv.textContent = "You correctly answered all 10.  You had " + timeLeft + " seconds left! Enter your name to record your score.";
    } else {
        cardTextDiv.textContent = "You ran out of time. You answered " + numCorrect + " questions correctly! Enter your name to record your score.";
    }

    //create form for high score input
    var hsForm = document.createElement("form");
    hsForm.setAttribute("class", "form-inline");
    var inputFld = document.createElement("input");
    inputFld.setAttribute("class", "form-control mb-2 mr-sm-2");
    inputFld.setAttribute("type", "text");
    inputFld.setAttribute("id", "hs-text");
    inputFld.setAttribute("placeholder", "name or initials");
    var subBtn = document.createElement("button");
    subBtn.setAttribute("type", "button");
    subBtn.setAttribute("class", "btn mb-2 mr-sm-2");
    subBtn.setAttribute("id", "submit-hs");
    subBtn.textContent = "Submit";


    hsForm.appendChild(inputFld);
    hsForm.appendChild(subBtn);
    listDiv.appendChild(hsForm);
};

//displays the high score array
function displayHS() {
    removeBtns();
    cardTextDiv.textContent = "High Scores";

    for (let i = 0; i < highScores.length; i++) {
        var score = highScores[i];
        var li = document.createElement("li");
        li.textContent = score;
        listDiv.appendChild(li);
    }

    var clearBtn = document.createElement("button");
    clearBtn.setAttribute("class", "button btn");
    clearBtn.setAttribute("id", "clear-button")
    clearBtn.textContent = "Clear high scores";
    var playBtn = document.createElement("button");
    playBtn.setAttribute("class", "button btn");
    playBtn.setAttribute("id", "play-button");
    playBtn.textContent = "Play again!";

    listDiv.appendChild(clearBtn);
    listDiv.appendChild(document.createElement("br"));
    listDiv.appendChild(playBtn);
};

// event listeners for button clicks
highScoreBtn.addEventListener("click", displayHS);
listDiv.addEventListener("click", function (event) {

    if (event.target.matches("button")) {
        event.preventDefault();

        //start button
        if (event.target.id === "start") {
            playGame();

            //submit button
        } else if (event.target.id === "submit-hs") {
            hsStr = document.getElementById("hs-text").value.trim() + " - " + timeLeft;
            highScores.push(hsStr); //add string to array
            localStorage.setItem("highScores", JSON.stringify(highScores)); //store array locally
            displayHS();

            //Clear high scores button
        } else if (event.target.id === "clear-button") {
            highScores.splice(0, highScores.length);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            displayHS();

            //Play again button
        } else if (event.target.id === "play-button") {
            startGame();

            //answer buttons
        } else {
            checkButton(event);
        }
    }
});

startGame();
