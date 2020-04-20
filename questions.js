
// Questions  array 
var questions = [
    {
        question: "In javascript, which of the following are considered to be primitive data types?",
        choices: ["Number, String and null", "Number, String and Boolen", "String and undefined", "Undefined and null"],
        answer: "Number, String and Boolen"
    },
    {
        question: "Which of the following attributes is used to set the source URL of an external javascript file?",
        choices: ["Source", "Script", "Src", "Javascript"],
        answer: "Src"
    },
    {
        question: "The way to declare a new variable in javascript is by using the",
        choices: ["def keyword", "var keyword", "define keyword", "declare keyword"],
        answer: "var keyword"
    },
    {
        question: "The <script> tag can be directly written inside",
        choices: ["<html> and <body> tags", "<body> and <head> tags", " Only <head> tag", "Only <body> tag"],
        answer: "<body> and <head> tags"
    },
    {
        question: "The Javascript language is usually",
        choices: ["meant to write programs that run in the desktop environment", "meant to write programs that run in the mobile phone environment", "meant to write programs that run in a browser environment", "meant to create Graphical User Interfaces"],
        answer: "meant to write programs that run in a browser environment"
    },

];
// Variables
var score = 0;
var questionIndex = 0;
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;

var currentTime = document.querySelector("#currentTime");
var timerEl = document.querySelector("#startTime");
var questionsEl = document.querySelector("#questions");
var ulEl = document.createElement("ul");


//Questions and choices 
function render(questionIndex) {
    
    questionsEl.innerHTML = "";
    ulEl.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
      
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsEl.textContent = userQuestion;
    }
   
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.setAttribute("id", "answer");
        listItem.setAttribute("class", "btn btn-success btn-rounded waves-effect");
        listItem.textContent = newItem;
        questionsEl.appendChild(ulEl);
        ulEl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//Compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var rightWrong = document.createElement("div");
        rightWrong.setAttribute("id", "rightWrong");
        
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            rightWrong.textContent = "Correct!";
            rightWrong.setAttribute("style", "color: green;")
            
        } else {

            secondsLeft = secondsLeft - penalty;
            rightWrong.textContent = "Wrong!";
            rightWrong.setAttribute("style", "color: red;")
        }

    }
   
    questionIndex++;

    if (questionIndex >= questions.length) {
        
        finish();
        rightWrong.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
        rightWrong.setAttribute("style", "background: #28A745; color: white;")
    } else {
        render(questionIndex);
    }
    questionsEl.appendChild(rightWrong);

}

// Timer
timerEl.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finish();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Finish page
function finish() {
    questionsEl.innerHTML = "";
    currentTime.innerHTML = "";

    
    var finished = document.createElement("h1");
    finished.setAttribute("id", "finished");
    finished.textContent = "Finished!"

    questionsEl.appendChild(finished);

   

    // Calculate time remaining for score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var finalScore = document.createElement("p");
        clearInterval(holdInterval);
        finalScore.textContent = "Your score is: " + timeRemaining;

        questionsEl.appendChild(finalScore);
    }

   

    // input
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "initials");
    input.setAttribute("class", "form-control");
    input.setAttribute("placeholder", " Enter your initials");
    input.textContent = "";
    questionsEl.appendChild(input);

    // submit
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "Submit");
    submit.setAttribute("class", "btn btn-outline-success btn-rounded waves-effect");
    submit.textContent = "Submit";

    questionsEl.appendChild(submit);

    // Capture initials and local storage for initials and score
    submit.addEventListener("click", function () {
        var initials = input.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
           
            window.location.replace("./scores.html");
        }
    });

}
