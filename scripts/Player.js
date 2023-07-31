/**
 * Final Project - The Dice Game
 * Creator: Kevin Ng
 * BCIT-id: A01341525
 */

//A player class is create a player with it's information like name, scores, player image, fund in account
class Player{
    #name;
    #avator;
    #score;
    #account;


    constructor(name, avator, initalFund = 10000.00){
        //for every new player, the default score is 0 and have $10,000 in account unless specific.
        
        this.#name = name;
        this.#avator = avator;
        this.#score = 0;
        this.#account = initalFund;

    }

    getName(){
        return this.#name;
    }

    getAvatar(){
        return `<img src="images/${this.#avator}" alt="${this.#avator}">`;
    }

    getScore(){
        return this.#score;
    }

    getAccount(){
        return this.#account;
    }

    setScore(score){
        this.#score = score;
    }

    setAccount(fund){
        this.#account = fund;
    }

    addScore(score){
        this.#score += score;
    }

    deductScore(score){
        if(score < this.#score){
            this.#score -= score;
        }else{
            this.#score = 0;
        }
        
    }

    addFund(fund){
        this.#account += fund;
    }

    deductFund(fund){
        this.#account -= fund;
    }

    describeSelf(){
        return `<p>${this.#name} have current score of <strong>${this.#score}</strong>.`;
        // return `<p>${this.#name} have current score of ${this.#score} and fund of $${this.#account.toFixed(2)}.`;
    }


}