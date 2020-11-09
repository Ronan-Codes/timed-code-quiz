//Questions and Array
var qObj0 = {question: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctIndex: 2};

var qObj1 = {question: "Arrays in JavaScript can be used to store what?",
    choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    correctIndex: 4};

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

var questions = [qObj0, qObj1, qObj2, qObj3, qObj4, qObj5, qObj6, qObj7, qObj8, qObj9;

//DOM Elements

var listDiv = document.getElementById("list-div");
var cardTextDiv = document.getElementById("card-text");
var highScoreBtn = document.getElementById("high-score");
var timeCounter = document.getElementById("time");
var aCheckText = document.getElementById("answer-check");

//Other global variables
var qIndex = 0;
var timeLeft = 75;
var win = false;
var correct = false;
var highScores = [];
var hsStr ="";
var numCorrect = 0;
