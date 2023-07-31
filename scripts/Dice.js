/**
 * Final Project - The Dice Game
 * Creator: Kevin Ng
 * BCIT-id: A01341525
 */

//A dice class for the dice object
class Dice{

    #face_number;
    #numOfFace;

    constructor(){
        //there is 6 face of a standard dice;
        this.#numOfFace = 6;
        //as a dice always have a face. We set default face number to 1
        this.#face_number = 1; 
    }

    //getter to get the number value of the dice
    getFaceNumber(){
        return this.#face_number;
    }

    //A function to randomly generate a number from 1 to 6
    roll(){
        this.#face_number = Math.floor(Math.random() * this.#numOfFace + 1);
    };

    //show the image of current dice
    describeSelf(){
        return `<img src="images/dice_${this.#face_number}.png" alt="dice of ${this.#face_number}">`;
    }

}