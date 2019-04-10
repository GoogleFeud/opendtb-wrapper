const MultipleQ = require("./MultipleQuestion.js");
const BooleanQ = require("./BooleanQuestion.js");
const fetch = require("node-fetch");
const Defs = require("./defs.js");

class Client {
    /**
     *  
     * @param {{token: Boolean, noInactivity: Boolean, cache: Boolean}} options The options for this instance of the client. token - If theere should be a token. noInactivity - If this is set to true, an interval will be set which will reset your token every 6 hours. cache - If the questions you get should be registered in a map.
     */
    constructor(options = {token: true, noInactivity: false, cache: true}) {
        if (options.token) {
            (async () => {
                  await this.setToken();
            })();
        }
        if (options.cache) this.cache = new Map();
        if (options.noInactivity) {
             this.resetLoop = setInterval(async () =>{
                 await this.resetToken();
             }, 21600000);
        } 
    }

    async setToken() {
        if (this.token) return;
        const t = await Client.getToken();
        this.token = t;
        return this;
    }

    /**
     * 
     * @param {{category: Number, difficulty: String, type: String}} options The properties of the question to get.
     * @returns {Promise<BooleanQ|MultipleQ>}
     */

    async fetchQuestion(options = {category: null, difficulty: null, type: null}) {
          Client.buildArgs(this, options);
          const data = await fetch(`https://opentdb.com/api.php?amount=1${options.category}${options.difficulty}${options.type}${options.token}`);
          let question = await data.json();
          if (question.response_code != 0) return null;
           question = question.results[0];
           if (question.type == 'multiple') question = new MultipleQ(question);
             else question = new BooleanQ(question)
             if (this.cache) this.cache.set(question.id, question);
            return question;
    }

    /**
     * 
     * @param {{category: Number, difficulty: String, type: String, amount: Number}} options The properties of the questions to get + the amount of questions to get.
     * @returns {Promise<Array<BooleanQ|MultipleQ>>}
     */

    async fetchQuestions(options = {category: null, difficulty: null, type: null, amount: 2}) {
        Client.buildArgs(this, options);
        const data = await fetch(`https://opentdb.com/api.php?amount=${options.amount}${options.category}${options.difficulty}${options.type}${options.token}`);
        let question = await data.json();
        if (question.response_code != 0) return null;
         const questions = [];
          const res = question.results;
          for (let i=0; i < res.length; i++) {
               question = res[i];
               if (question.type == 'multiple') question = new MultipleQ(question);
               else question = new BooleanQ(question)
               if (this.cache) this.cache.set(question.id, question);
               questions.push(question);
          } 
          return questions;
    }

    /**
 * @callback findCallback
 * @param  {BooleanQ|MultipleQ} 
 */

    /**
     * Similar to Array#find. Will only work if you have "cache" set to true.
     * @param {findCallback} fn
     */
    
    find(fn) {
         if (!this.cache) return null;
         let res = null;
         this.cache.forEach((v, key, that) => {
              if (fn(v, key, that) && !res) res = v;
         });
         return res;
    }

    async resetToken() {
        if (!this.token) return false;
        const data = await fetch(`https://opentdb.com/api_token.php?command=reset&token=${this.token}`);
        const token = await data.json();
        if (token.response_code != 0) return false;
         else return true;
    }

    static async getToken() {
        const data = await fetch("https://opentdb.com/api_token.php?command=request")
        const token = await data.json();
        if (token.response_code != 0) throw `Response code: ${token.response_code}: ${token.response_message}`
        return token.token;
    }

        /**
     * Get a question directly from the API - no tokens, cache or noInactivity
     * @param {{category: Number, difficulty: String, type: String, amount: Number}} options The properties of the questions to get + the amount of questions to get.
     * @returns {Promise<Array<BooleanQ|MultipleQ>|BooleanQ|MultipleQ>}
     */

    static async get(options = {category: null, difficulty: null, type: null, amount: 1}) {
        Client.buildArgs(this, options);
        if (!options.amount) options.amount = 1;
        const data = await fetch(`https://opentdb.com/api.php?amount=${options.amount}${options.category}${options.difficulty}${options.type}`);
        let question = await data.json();
        if (question.response_code != 0) return null;
         const questions = [];
          const res = question.results;
          for (let i=0; i < res.length; i++) {
               question = res[i];
               if (question.type == 'multiple') question = new MultipleQ(question);
               else question = new BooleanQ(question)
               if (this.cache) this.cache.set(question.id, question);
               questions.push(question);
          }
          if (questions.length == 1) return questions[0]; 
          return questions;
    }
     
    static buildArgs(inst, info) {
         (info.category) ? (Defs.CATEGORIES.$has(info.category)) ? info.category=`&category=${info.category}`:info.category="":info.category = "";
         (info.difficulty) ? (Defs.DIFFICULTIES.$has(info.difficulty)) ? info.difficulty=`&difficulty=${info.difficulty}`:info.difficulty="":info.difficulty = "";
         (info.type) ? (Defs.TYPES.$has(info.type)) ? info.type=`&type=${info.type}`:info.type="":info.type = "";
         (inst.token) ? info.token = `&token=${inst.token}`:info.token = "";
         if (info.amount < 1) info.amount = 1;
           else info.amount = info.amount;
    }

        /**
     * Get the number of questions in a category.
     * @param {Number} The category ID
     * @returns {{total: Number, easy: Number, medium: Number, hard: Number}}
     */

    static async questionCount(category) {
       if (!category || Defs.CATEGORIES.$has(category)) return 0;
          const data = await fetch(`https://opentdb.com/api_count.php?category=${category}`);
          const info = await data.json();
          return {
              total: info.category_question_count.total_question_count,
              easy: info.category_question_count.total_easy_question_count,
              medium: info.category_question_count.total_medium_question_count,
              hard: info.category_question_count.total_hard_question_count
          }
    }

}

module.exports = Client;