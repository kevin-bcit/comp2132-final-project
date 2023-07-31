/**
 * Final Project - The Dice Game
 * Creator: Kevin Ng
 * BCIT-id: A01341525
 */

class ScoreSystem{
    #scorePlayer1;
    #scorePlayer2;
    #dicesPlayer1;
    #dicesPlayer2;

    constructor(scorePlayer1, scorePlayer2, dicesPlayer1, dicesPlayer2){
        this.#scorePlayer1 = scorePlayer1;
        this.#scorePlayer2 = scorePlayer2;
        this.#dicesPlayer1 = dicesPlayer1;    //this dice array of the two dices of player1
        this.#dicesPlayer2 = dicesPlayer2;    //this dice array of the two dices of player2

        //calculate the total score after known dices
        this.#scorePlayer1 = this.#calculateScore(this.#scorePlayer1, this.#dicesPlayer1);
        this.#scorePlayer2 = this.#calculateScore(this.#scorePlayer2, this.#dicesPlayer2);
    }

    getPlayer1Score(){
        return this.#scorePlayer1;
    }

    getPlayer2Score(){
        return this.#scorePlayer2;
    }

    //a function to calculate score according to the rules from final project. Then update the scorePlayer1 and scorePlayer2
    #calculateScore(score, dices){
        //If any of the players two dice comes up as a 1 then the score for that round for the player is 0. 
        //eg: if the player rolls a 6 and 1, they get a score of 0
        if(dices[0] === 1 || dices[1] === 1){
            score += 0;
            console.log(`either 1: ${score}`)
        }

        //If the player rolls a pair of the same numbers then the players score is the total of the two dice 
        //times 2. eg: if he player rolls 5 and 5, they get a score of (5+5)*2=20
        else if(dices[0] === dices[1]){
            score += (dices[0] + dices[0]) * 2;
            console.log(`double: ${score}`)
        }

        //If the player rolls any other combination of dice other than the ones mentioned above then the 
        //players score is the total value of the two dice, eg: player rolls a 3 and 2, player gets a 
        //score of 3+2=5
        else{
            score += (dices[0] + dices[1]);
            console.log(`normal: ${score}`)
        }

        return score;
        
    
    }

    resetScoreSystem(){
        this.#scorePlayer1 = null;
        this.#scorePlayer2 = null;
        this.#dicesPlayer1 = [null, null];
        this.#dicesPlayer2 = [null, null];
    }


}