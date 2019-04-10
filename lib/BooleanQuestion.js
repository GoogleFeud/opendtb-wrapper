
const Question = require("./Question.js");

class BooleanQuestion extends Question {
    constructor(data) {
          super(data);
        (this.correct == 'True') ? this.correct=true:this.correct=false;
    }

}

module.exports = BooleanQuestion;