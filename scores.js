
// Variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var playAgain = document.querySelector("#playAgain");

// Retreive local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var scoresLi = document.createElement("li");
        scoresLi.textContent = allScores[i].initials + " : " + allScores[i].score;
        highScore.appendChild(scoresLi);

    }
}

// Clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Play again
playAgain.addEventListener("click", function () {
    window.location.replace("./index.html");
});