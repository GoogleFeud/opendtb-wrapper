const he = require('he');

class Question {
    constructor(data) {
         this.type = data.type;
         this.difficulty = data.difficulty;
         this.content = he.decode(data.question);
         this.category = he.decode(data.category);
         this.correct = data.correct_answer;
         this.incorrect = data.incorrect_answers;
         this.answers = [...this.incorrect, this.correct];
         for (let i=0; i< this.answers.length; i++) {
             this.answers[i] = he.decode(this.answers[i]);
         }
         this.id = Question.makeid(8);
    }

    static makeid(length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

}
  
  module.exports = Question;