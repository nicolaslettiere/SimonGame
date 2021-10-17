var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userGamePattern = [];
var started = false;
var level = 0;

var points = 0; 

$(document).keypress(function(){
    if (!started){
        $("level-title").text("Level 1");
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userGamePattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userGamePattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userGamePattern[currentLevel]){
        if(userGamePattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over: "+ points + " points, Press Any Key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userGamePattern = [];
    level++;
    points++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}