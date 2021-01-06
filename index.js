var flagBtn = false;
var flagBtn1 = false;
var characters = [
  "aliosman",
  "bahar",
  "enis",
  "ezgi",
  "hakan",
  "rohat",
  "ronahi",
  "yesil",
];
var level = 1;
// add global damage var
var totalUserDamage = 0;
var totalPcDamage = 0;
// change this value for level
var pchHealth = 100;
var pcDamage = 10;
// second level enemy
var level2Enemy = "xxx";
var level1Enemy = "xxxx";
var selectItem = "xx";

$(".select").click(function () {
  var nameBtn = $(this).attr("id");
  // add nickname to fight section
  addNickname("user", nameBtn);
  selectItem = nameBtn;
  //add select photo to use char
  $(".user-char").attr("src", "photos/" + nameBtn + ".png");
  if (flagBtn != true) {
    //   add selecet class which is green border
    $("." + nameBtn).addClass("select-card");
    // delete selecet button
    $("#" + nameBtn).slideUp();
    // add go to figth button
    $(".go-btn").removeClass("hide");
    // remove selecet button and add hide btn
    setTimeout(function () {
      $(".cancel-" + nameBtn).fadeIn();
      $(".cancel-" + nameBtn).removeClass("hide");
    }, 1000);
    // flag true so we can't choose anymore
    flagBtn = true;
  }

  // delete select item in char arr
  var deletingChar = characters[characters.indexOf(nameBtn)];
  delCharacter(nameBtn);

  //   when click cancel for each char btn it's call select button again and cancel de selection
  $(".cancel-" + nameBtn).click(function () {
    characters.push(deletingChar);
    callSelecetButton(nameBtn);
  });

  $(".go-fight").click(function () {
    // to chosoe random char in array
    var randEnemy = characters[Math.floor(Math.random() * characters.length)];
    delCharacter(randEnemy);
    level2Enemy = characters[Math.floor(Math.random() * characters.length)];
    level1Enemy = randEnemy;
    // change header write
    $(".header").text("level " + level);
    $("header p").addClass("hide");

    // hide character section
    $("#character").addClass("hide");

    // add our fight class
    setTimeout(function () {
      $("#fight").fadeIn();
      $("#fight").addClass("show");
    }, 600);

    addEnemy(randEnemy);
  });

  // add enemy
  function addEnemy(enemy) {
    $(".pc-char").attr("src", "photos/" + enemy + ".png");
    addNickname("pc", enemy);
  }

  function delCharacter(name) {
    var indexChar = characters.indexOf(name);
    if (indexChar > -1) {
      characters.splice(indexChar, 1);
    }
  }

  // end of the select
});
// I made a class to take local var call namebtn
function callSelecetButton(nameBtn) {
  flagBtn = false;
  $(".cancel-" + nameBtn).fadeOut();
  setTimeout(function () {
    $("#" + nameBtn).slideDown();
    $("." + nameBtn).removeClass("select-card");
  }, 1000);
  $(".go-btn").addClass("hide");
}

// add nickname to fight section
function addNickname(who, name) {
  switch (name) {
    case "aliosman":
      $("." + who + "-nick").text("GARGA");
      break;

    case "bahar":
      $("." + who + "-nick").text("KELEK");
      break;

    case "enis":
      $("." + who + "-nick").text("GIL");
      break;

    case "ezgi":
      $("." + who + "-nick").text("KUNEFE");
      break;

    case "hakan":
      $("." + who + "-nick").text("LAZANYA");
      break;

    case "rohat":
      $("." + who + "-nick").text("PAYTAK");
      break;

    case "ronahi":
      $("." + who + "-nick").text("F1");
      break;

    case "yesil":
      $("." + who + "-nick").text("SQUAT");
      break;
    case "boss":
      $("." + who + "-nick").text("BOSS");
      break;
  }
}
function winner(name) {
  $("#winner").removeClass("hide");
  $("#winner").fadeIn();
  $(".winner-img").attr("src", "photos/" + name + ".png");
}

$(".play-again").click(function () {
  location.reload();
});

function rollDice() {
  var dice = Math.floor(Math.random() * 6) + 1;
  return dice;
}

// figth button
$(".fight").click(function () {
  var dice = 6
  var dice1 = 1

  $(".fight").fadeOut();

  $(".dice").addClass("spin");
  $(".dice1").addClass("spin");

  setTimeout(function () {
    $(".dice").removeClass("spin");
    $(".dice1").removeClass("spin");
  }, 1500);
  if (dice != dice1) {
    setTimeout(function () {
      $(".fight").fadeIn();
    }, 4000);
  } else {
    setTimeout(function () {
      $(".fight").fadeIn();
    }, 2000);
  }

  setTimeout(function () {
    $(".dice").attr("src", "dices/dice" + dice + ".png");
    $(".dice1").attr("src", "dices/dice" + dice1 + ".png");
  }, 1500);

  if (dice > dice1) {
    setTimeout(function () {
      attack("user");
    }, 2000);
    setTimeout(function () {
      var audio = new Audio("sounds/" + selectItem + "-attack.mp3");
      audio.play();
      setTimeout(function () {
        switch (level) {
          case 1:
            var audio = new Audio("sounds/" + level1Enemy + "-defence.mp3");
            audio.play();
            break;
          case 2:
            var audio = new Audio("sounds/" + level2Enemy + "-defence.mp3");
            audio.play();
            break;
          case 3:
            var audio = new Audio("sounds/boss-defence.mp3");
            audio.play();
            break;
          default:
            break;
        }
      }, 1000);
    }, 2000);

    setTimeout(function () {
      var damageUser = (dice - dice1) * 15;
      totalUserDamage += damageUser;
      // check if total damage bigger than 100
      if (totalUserDamage >= pchHealth) {
        level++;
        $(".header").text("level " + level);
        if (level == 2) {
          addEnemy(level2Enemy);
          pchHealth = 200;
          pcDamage = 10;
          totalPcDamage = 0;
          totalUserDamage = 0;
          $(".left-health-user").css("width", "0%");
          $(".left-health-pc").css("width", "0%");
          $(".dice").attr("src", "dices/dice1.png");
          $(".dice1").attr("src", "dices/dice1.png");
        } else if (level == 3) {
          addEnemy("boss");
          pchHealth == 250;
          pcDamage = 20;
          totalPcDamage = 0;
          totalUserDamage = 0;
          $(".left-health-user").css("width", "0%");
          $(".left-health-pc").css("width", "0%");
          $(".pc-char").css("width", "100%");
          $(".dice").attr("src", "dices/dice1.png");
          $(".dice1").attr("src", "dices/dice1.png");
        } else if (level == 4) {
          // delete fight section
          setTimeout(function () {
            $("#fight").fadeOut();
            $("#fight").addClass("hide");
          }, 1000);

          // call winner func
          setTimeout(function () {
            winner(selectItem);
          }, 2000);
        }
      } else {
        $(".left-health-pc").css("width", totalUserDamage / level + "%");
      }
    }, 3500);
  } else if (dice1 > dice) {
    setTimeout(function () {
      attack("pc");
    }, 2000);
    setTimeout(function () {
      switch (level) {
        case 1:
          var audio = new Audio("sounds/" + level1Enemy + "-attack.mp3");
          audio.play();
          break;
        case 2:
          var audio = new Audio("sounds/" + level2Enemy + "-attack.mp3");
          audio.play();
          break;
        case 3:
          var audio = new Audio("sounds/boss-attack.mp3");
          audio.play();
          break;
        default:
          break;
      }
      setTimeout(function () {
        var audio = new Audio("sounds/" + selectItem + "-defence.mp3");
        audio.play();
      }, 1500);
    }, 2000);

    setTimeout(function () {
      var damagePc = (dice1 - dice) * pcDamage;
      totalPcDamage += damagePc;
      if (totalPcDamage >= 100) {
        if (level == 2) {
          $(".left-health-user").css("width", "100%");
          // delete fight section
          setTimeout(function () {
            $("#fight").fadeOut();
            $("#fight").addClass("hide");
          }, 1000);
          // call winner func
          setTimeout(function () {
            winner(level2Enemy);
          }, 2000);
          var name = $(".nick-" + level2Enemy).text();
          $(".header").text(name + " WON!");
          $("header p").addClass("hide");
        } else if (level == 3) {
          $(".left-health-user").css("width", "100%");
          // delete fight section
          setTimeout(function () {
            $("#fight").fadeOut();
            $("#fight").addClass("hide");
          }, 1000);
          // call winner func
          setTimeout(function () {
            winner("boss");
          }, 2000);
          $(".header").text("BOSS WON!");
          $("header p").addClass("hide");
        } else {
          $(".left-health-user").css("width", "100%");
          // delete fight section
          setTimeout(function () {
            $("#fight").fadeOut();
            $("#fight").addClass("hide");
          }, 1000);
          // call winner func
          setTimeout(function () {
            winner(level1Enemy);
          }, 2000);
          var name = $(".nick-" + level1Enemy).text();
          $(".header").text(name + " Win");
          $("header p").addClass("hide");
        }
      } else {
        $(".left-health-user").css("width", totalPcDamage + "%");
      }
    }, 3000);
  } else if (dice == dice1) {
    $("header p").text("CAT!");
  }
});
// add enemy
function addEnemy(enemy) {
  $(".pc-char").attr("src", "photos/" + enemy + ".png");
  addNickname("pc", enemy);
}

function attack(cond) {
  if (cond == "user") {
    $("." + cond + "-char").addClass("attack-animation");
    for (i = 1; i < 180; i++) {
      $("." + cond + "-char").css("left", i + "%");
    }
    setTimeout(function () {
      samePosition(cond);
    }, 1000);
  } else if (cond == "pc") {
    $("." + cond + "-char").addClass("attack-animation");

    for (i = 1; i < 180; i++) {
      i *= -1;
      $("." + cond + "-char").css("left", i + "%");
      i *= -1;
    }
    setTimeout(function () {
      samePosition(cond);
    }, 1000);
  }
}
function samePosition(cond) {
  $("." + cond + "-char").css("left", "0px");
  $("." + cond + "-char").removeClass("attack-animation");
}
