
const Question = require("./Question.js");

class MultipleQuestion extends Question {
    constructor(data) {
          super(data);
           this.shuffle();
    }

    shuffle() {
            for (let i = this.answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
               [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]]; 
            }
            this.optionA = this.answers[0];
            this.optionB = this.answers[1];
            this.optionC = this.answers[2];
            this.optionD = this.answers[3];
            this.correctOption = correctL(this.answers, this.correct);
    }


}

function correctL(array, right) {
    if (array[0] == right) return "A";
    if (array[1] == right) return "B";
    if (array[2] == right) return "C";
    if (array[3] == right) return "D";
 }

 module.exports = MultipleQuestion;