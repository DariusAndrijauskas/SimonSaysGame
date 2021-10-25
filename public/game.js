var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var currentLevel = 0;

//$(document).keypress(nextSequence);
$(document).keypress(function() {
  if (level === 0) {
    nextSequence();
  }
});

$(".btn").click(function(event) {
  var userChosenColour = $(this).attr("id");

  checkAnswer(userChosenColour);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  $("h2").text("");

  setTimeout(function() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(50).fadeIn(200);
    playSound(randomChosenColour);
  }, 1000);
}

function startOver() {
  level = 0;
  gamePattern = [];
  currentLevel = -1;
}

function checkAnswer(userChosenColour) {
  if (userChosenColour === gamePattern[currentLevel]) {
    playSound(userChosenColour);
    animatePress(userChosenColour);
  } else {
    if (level === 0) {} else {
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over");
      $("h2").text("press any key to restart");
      startOver();
    }
  }
  currentLevel++;
  if (currentLevel === level && level > 0) {
    setTimeout(nextSequence, 1000);
    currentLevel = 0;
  }
}
