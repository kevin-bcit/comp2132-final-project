/**
 * Final Project - The Dice Game
 * Creator: Kevin Ng
 * BCIT-id: A01341525
 */

//A game class is a set of game from start to finish
class Game{
    #numberOfRound;
    #currentRound;
    #player1;
    #player2;
    #player1DicesResultSet;    //Array to store player1 two dice result object of numeric value and image for a round
    #player2DicesResultSet;    //Array to store player2 two dice result object of numeric value and image for a round
    #player1ScoreDiff;          //The difference of player1 score in each round
    #player2ScoreDiff;          //The difference of player2 score in each round
    #player1Account;        //float of player1 fund
    #player2Account;        //float of player2 fund
    
    //constructor accept player and able to select number of game (default is 3)
    constructor(player1, player2, numberOfRound = 3){
        this.#player1 = player1;
        this.#player2 = player2;
        this.#numberOfRound = numberOfRound;
        this.#currentRound = 0;
        this.#player1ScoreDiff = 0;
        this.#player2ScoreDiff = 0;
        this.#player1DicesResultSet = [{number:0, image:""},{number:0, image:""}];
        this.#player2DicesResultSet = [{number:0, image:""},{number:0, image:""}];
                                                      
    }

    getNumberOfRounds(){
        return this.#currentRound;
    }

    getPlayerScoreDiff(playerNumber){
        if(playerNumber === 1){
            return this.#player1ScoreDiff;
            
        }else if(playerNumber === 2){
            return this.#player2ScoreDiff;
        }else{
            console.log(`There is no player number ${playerNumber}`)
            return -1;
        }
    }

    //A function to start a round of game. Return a status of 
    startARound(){
        if(this.#currentRound < this.#numberOfRound){

            const dice = new Dice();

            //first add a round
            this.#currentRound += 1;
            
            //roll dice and get result for both player, 2 for each
            for(let i = 0; i < 2;i++){
                //store the dice value for both players. And loop twice
                dice.roll();
                this.#player1DicesResultSet[i].number = dice.getFaceNumber();
                this.#player1DicesResultSet[i].image = dice.describeSelf();
                dice.roll();
                this.#player2DicesResultSet[i].number = dice.getFaceNumber();
                this.#player2DicesResultSet[i].image = dice.describeSelf();
            }

            //updated the scores to set the difference later
            this.#player1ScoreDiff = this.#player1.getScore();
            this.#player2ScoreDiff = this.#player2.getScore();

            //calculate pts base on point 
            const scoreSys = new ScoreSystem(
                this.#player1.getScore(), 
                this.#player2.getScore(), 
                [this.#player1DicesResultSet[0].number, this.#player1DicesResultSet[1].number], 
                [this.#player2DicesResultSet[0].number, this.#player2DicesResultSet[1].number]);

            //update players score
            this.#player1.setScore(scoreSys.getPlayer1Score());
            this.#player2.setScore(scoreSys.getPlayer2Score());

            //update the score difference
            this.#player1ScoreDiff = this.#player1.getScore() - this.#player1ScoreDiff;
            this.#player2ScoreDiff = this.#player2.getScore() - this.#player2ScoreDiff;

        
            //update players fund*

            return `continue`;
        }else{
            //handle game finish
            return `finish`;
        }
        
    }

    //A function to get the dice array from each player. PlayerNumber is either 1 or 2
    getDiceArray(playerNumber){
        if(playerNumber === 1){
            return [this.#player1DicesResultSet[0].image, this.#player1DicesResultSet[1].image];
        }else if(playerNumber === 2){
            return [this.#player2DicesResultSet[0].image, this.#player2DicesResultSet[1].image];
        }else{
            console.log(`Error on entry of player Number on getting dice array in getDiceArray()`);
            return [null, null];
        }
    }

    //A function for reset the game setting for new game
    reset(){
        this.#currentRound = 0;
        this.#player1ScoreDiff = 0;
        this.#player2ScoreDiff = 0;
        this.#player1.setScore(0);
        this.#player2.setScore(0);
    }

}