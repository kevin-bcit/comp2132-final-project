/**
 * Final Project - The Dice Game
 * Creator: Kevin Ng
 * BCIT-id: A01341525
 * repo: https://github.com/kevin-bcit/comp2132-final-project
 */
const headline = $("#headline");
const intro = $("#intro_paragraph");
const player1NameEle = $(".left_board .name");
const player2NameEle = $(".right_board .name");
const player1AvatarEle = $(".left_board .avatar");
const player2AvatarEle = $(".right_board .avatar");
const player1DiceEle = $(".left_board .dice");
const player2DiceEle = $(".right_board .dice");
const player1ScoreDiff = $(".left_board .scoreDiff")
const player2ScoreDiff = $(".right_board .scoreDiff")
const player1ResultEle = $(".left_board .result");
const player2ResultEle = $(".right_board .result");
const newGameBtn = $("#new-game-btn");
const rollDiceBtn = $("#roll-dice-btn");
const popup = $("#pop");
const popupContent = $("#pop-content");
const popPlayerSelection = $("#pop-player");
const popPlayerHeading = $("#pop-player-heading");
const popPlayerContent = $("#pop-player-content");
const popPlayerMessage = $("#pop-player-message");
const popupClose = $(".close-pop");

let numberOfRounds = 3;
let roundStatus = "";
let diceRollingPeriod = 1000;
let diceAnimationFrameId = [0, 0, 0, 0];
let scoreDiffAnimationPeriod = 2000;
let nextPlayerSectection = 0;

let player1;
let player2;
let newGame;
const playerList = [
    {"name": "Kevin", "image": "defaultPlayer.jpg"},
    {"name": "Nezuko", "image": "nezuko.jpg"},
    {"name": "Kimetsu", "image": "kimetsu.jpg"},
    {"name": "Kokushibo", "image": "kokushibo.jpg"}
]

//for html validation
player1ScoreDiff.text("");
player2ScoreDiff.text("");

//select player is the first thing to do after the game loaded
$(document).ready(()=>{
    //select the player
    selectPlayer();
})

//the initialize game will call after player selection
const initializeGame = () => {
    newGame = new Game(player1, player2, numberOfRounds);

//initialize the game board
    player1NameEle.text(player1.getName());
    player2NameEle.text(player2.getName());
    player1AvatarEle.append(player1.getAvatar());
    player2AvatarEle.append(player2.getAvatar());
    player1ResultEle.html(player1.describeSelf());
    player2ResultEle.html(player2.describeSelf());
}


//Start the game
newGameBtn.click(e=>{
    newGame.reset();

    //reset the game board
    player1DiceEle.html("");
    player2DiceEle.html("");
    player1ResultEle.html(player1.describeSelf());
    player2ResultEle.html(player2.describeSelf());
    intro.css("background-color", "rgba(255, 255, 255, 0.5)");
    headline.text(`The dice game`);


    //show the roll-dice button for next round
    rollDiceBtn.css("visibility", "visible");

    //switch the animation for button focus
    newGameBtn.removeClass("green-btn-grow");


})

//Roll dice will start the next round in the game
rollDiceBtn.click(e=>{
    startARound();   
})

//close button
popupClose.click(e=>{
    
    if(popup.css("display") !== "none"){
        popup.addClass("fadeOutAnime");
        setTimeout(()=>{
            popup.css("display", "none");
        }, 1000)
    }
    if(popPlayerSelection.css("display") !== "none"){
        popPlayerSelection.addClass("fadeOutAnime");
        setTimeout(()=>{
            popPlayerSelection.css("display", "none");
            nextPlayerSectection = 0;
            popupClose.removeClass("green-btn-grow");
            
            //after player selected, initialize the game
            initializeGame();
        }, 1000)
    }
})

//A sequence of actions from rolling the dices for each player, calculate score and final showing 
//the result score and the score difference. 
const startARound = () => {

    //clear the dice area for new dice
    player1DiceEle.html("");
    player2DiceEle.html("");
    //dice button will temporary disable for animation, will resume after all animation done
    rollDiceBtn.css("visibility", "hidden");

    //run this round
    roundStatus = newGame.startARound();
    intro.css("background-color", "rgba(217, 255, 1, 0.5)");
    headline.text(`The dice game - Round ${newGame.getNumberOfRounds()} of ${numberOfRounds}`);
    console.log(`Status: ${roundStatus}, Round ${newGame.getNumberOfRounds()} of ${numberOfRounds}`);



    //show the rolled dice result of player1
    newGame.getDiceArray(1).forEach((dice, index) => {
        diceAnimationFrameId[index] = requestAnimationFrame(()=>{diceAnimate(index)});
        setTimeout(() => {
            cancelAnimationFrame(diceAnimationFrameId[index]);
            //to prevent delay of rolling dice pictures, we add a slight delay on showing result dice
            setTimeout(()=>{
                if(index === 0){
                    //first dice
                    player1DiceEle.html(dice);
                }else if(index === 1){
                    //second dice
                    player1DiceEle.append(dice);
                }else{
                    console.log(`player1 dices have error on showing.`);
                }
            }, 100);
        }, diceRollingPeriod);
    });

    //show the rolled dice result of player2
    newGame.getDiceArray(2).forEach((dice, index) => {
        index += 2; //to prevent using exactly the same slot of player1
        diceAnimationFrameId[index] = requestAnimationFrame(()=>{diceAnimate(index)});
        setTimeout(() => {
            cancelAnimationFrame(diceAnimationFrameId[index]);
            //to prevent delay of rolling dice pictures, we add a slight delay on showing result dice
            setTimeout(()=>{
                if(index === 2){
                    //first dice
                    player2DiceEle.html(dice);
                }else if(index === 3){
                    //second dice
                    player2DiceEle.append(dice);
                }else{
                    console.log(`player2 dices have error on showing.`);
                }
            }, 100);            

            //show the score difference and animation for any update after dices rolled
            scoreDiffAnimate();

            //update the score and fund result of player1
            player1ResultEle.html(player1.describeSelf());
            player2ResultEle.html(player2.describeSelf());

        }, diceRollingPeriod);

    });

    

}


////////////////handle animiations/////////////////

//function use to show the rolling of dices by requestAnimationFrame()
const diceAnimate = (index) => {
    const dicePic = Math.floor(Math.random() * 6 + 1);
    if(index === 0){
        //player 1 first dice
        player1DiceEle.html(`<img src="images/dice_${dicePic}.png" alt="p1.1 roll">`);
    }else if(index === 1){
        //player 1 second dice
        player1DiceEle.append(`<img src="images/dice_${dicePic}.png" alt="p1.2 roll">`);
    }else if(index === 2){
        //player 2 second dice
        player2DiceEle.html(`<img src="images/dice_${dicePic}.png" alt="p2.1 roll">`);
    }else{
        //player 2 second dice
        player2DiceEle.append(`<img src="images/dice_${dicePic}.png" alt="p2.1 roll">`);
    }
    
    diceAnimationFrameId[index] = requestAnimationFrame(()=>{diceAnimate(index)});
}


//show the score difference and animation for any update after dices rolled
const scoreDiffAnimate = () =>{
    player1ScoreDiff.text(`+ ${newGame.getPlayerScoreDiff(1)}`);
    player2ScoreDiff.text(`+ ${newGame.getPlayerScoreDiff(2)}`);

    player1ScoreDiff.addClass("score-animate");
    setTimeout(() => {
        player2ScoreDiff.addClass("score-animate");
    }, Math.ceil(Math.random()*500));
    

    setTimeout(()=>{
        player1ScoreDiff.removeClass("score-animate");
        player2ScoreDiff.removeClass("score-animate");
        player1ScoreDiff.css("opacity", 0);
        player2ScoreDiff.css("opacity", 0);
        if(parseInt(newGame.getNumberOfRounds()) <= (numberOfRounds -1)){
            rollDiceBtn.css("visibility", "visible");
        }else{
            finishGame();
        }
    }, scoreDiffAnimationPeriod);
}


//function when call if game is finished
const finishGame = () => {
    
    newGameBtn.addClass("green-btn-grow");

    let content = ``;
    
    //finish animation
    if(player1.getScore() > player2.getScore()){

        content += `<h4>WINNER IS ${player1.getName().toUpperCase()}</h4><div>${player1.getAvatar()}</div><br/>`;
        content += `<p>Your final score is ${player1.getScore()}.</p><p> You are ahead of ${player2.getName()} by `;
        content += `${player1.getScore() - player2.getScore()}</p>`;
        
    }else if(player1.getScore() < player2.getScore()){

        content += `<h4>WINNER IS ${player2.getName().toUpperCase()}</h4><div>${player2.getAvatar()}</div><br/>`;
        content += `<p>Your final score is ${player2.getScore()} points.</p><p> You are ahead of ${player1.getName()} by `;
        content += `${player2.getScore() - player1.getScore()} points</p>`;
    }else{
        content += `<h4>DRAW!</h4>`;
        content += `<p>Let's start a new game!</p>`;
    }

    popupContent.html(content);

    //show pop-up for winner
    popup.css("display", "block");
    popup.addClass(".fadeInAnime");
    popup.css("opacity",1);

}

//function to select players for a new game
const selectPlayer = () => {
    let content = "";
    

    playerList.forEach(player=>{
        content += `<figure><img id="${player.name}" class="sp-img" src="images/${player.image}" alt="${player.name}">
        <figcaption>${player.name}</figcaption></figure>`;

    })

    popPlayerContent.html(content);

    //show pop-up for player selection
    popPlayerSelection.css("display", "block");
    popPlayerSelection.addClass(".fadeInAnime");
    popPlayerSelection.css("opacity",1);
}

//handle click on player selection popup
popPlayerContent.click((e)=>{
    
    //select first player
    if(nextPlayerSectection === 0){
        let selectplayer1 = $(e.target);
        console.log(selectplayer1.attr("id"))
        selectplayer1.addClass("green-btn-grow");
        player1 = new Player(selectplayer1.attr("id"), selectplayer1.attr("src").split("/")[1]);
        popPlayerMessage.append(`<p>Player1 is ${selectplayer1.attr("id")}</p>`);
        popPlayerHeading.text("Please select computer");

    }else if(nextPlayerSectection === 1){
        //select second player
        let selectplayer2 = $(e.target);
        selectplayer2.addClass("red-btn-grow");
        player2 = new Player(selectplayer2.attr("id"), selectplayer2.attr("src").split("/")[1]);
        popPlayerMessage.append(`<p>Computer player is ${selectplayer2.attr("id")}</p>`);
        popPlayerHeading.text(`All Player is selected. Game start!`);

        numberOfRounds = $('#round').val();

        //finish selection and auto close the window
        setTimeout(()=>{
            $("#pop-player-box .close-pop").click();
        }, 2000);

    }

    nextPlayerSectection++;
    


    
})


