# opendtb-wrapper

This a simple node.js module that does simple tasks - gets random questions from the **Open Trivia Questions Database** API - https://opentdb.com/. 


## Installation

To use this module, install it via NPM:

```
npm i opendtb-wrapper
```
## Basic Usage

```js
const {Client, Defs} = require('opendtb-wrapper');

Client.get().then(console.log); // Get a random question
Client.get({amount: 5, category: Defs.CATEGORIES.ART, difficulty: 'easy', type: 'multiple'}).then(console.log) // Get 5 random questions of category "ART", with easy difficulty and with multiple answers (A, B, C, D)

const Trivia = new Client(); // Create a new instance of the client class - with caching disabled.
await Trivia.setToken(); // Make sure the token has generated before fetching questions. You do not need this if you aren't going to get questions right after creating the client.

Trivia.fetchQuestion() // get a random question. The question will be cached and it won't appear again, unless your token expires or you destroy your instance of client.

```

# Documentation

## new Client(options)

Creates a new instance of the client. The client is the main class of this package, all methods of getting questions and other information are accessed through there.

| Param | Type | Description |
| --- | --- | --- |
| options.token | <code>Boolean</code> | If set to true, a token will be generated for this instance. Fetched questions won't appear twice. Default is `true` |
| options.cache | <code>Boolean</code> | If set to true, every question you fetch will be cached in a map. Default is `true` |
| options.noInactivity | <code>Boolean</code> | If false, the API will delete your token after 6 hours of inactivity. If this is set to true, your token will be renewed every 6 hours. |

### Client#setToken()

Sets a token for the client. This method shouldn't be used unless you want to fetch a question RIGHT AFTER the Client class has been created.

**Returns:** `Promise<This Client>`

### Client#fetchQuestion(options)

Fetches a single question from the database. Caches it if caching is on. All of the options are optional. 

| Param | Type | Description |
| --- | --- | --- |
| options.type | <code>Defs.TYPES</code> OR <code>String</code> | One of the `Defs.TYPES`. Can be `boolean` or `multiple`  |
| options.difficulty | <code>Defs.DIFFICULTIES</code> OR <code>String</code> | One of the `Defs.DIFFICULTIES`. Can be `easy`, `medium` or `hard` |
| options.category | <code>Defs.CATEGORIES</code> | One of the `Defs.CATEGORIES`. |

**Returns:** `Promise<BooleanQuestion|MultipleQuestion>`

### Client#fetchQuestions(options)

Fetches multiple questions. Caches all of them if caching is on.

| Param | Type | Description |
| --- | --- | --- |
| options.amount | <code>Number</code> | How many questions should be fetched. Default is 2. Max is 50. |
| options.type | <code>Defs.TYPES</code> OR <code>String</code> | One of the `Defs.TYPES`. Can be `boolean` or `multiple`  |
| options.difficulty | <code>Defs.DIFFICULTIES</code> OR <code>String</code> | One of the `Defs.DIFFICULTIES`. Can be `easy`, `medium` or `hard` |
| options.category | <code>Defs.CATEGORIES</code> | One of the `Defs.CATEGORIES`. |

**Returns:** `Promise<BooleanQuestion|MultipleQuestion|(BooleanQuestion|MultipleQuestion)[]>`

### Client#find(fn)

Finds a question based on the function provided. It gets the question from the cache, so if your caching is off, you cannot use this function. The function is similar to `Array#find`.

**Example:** 
```js
 console.log(Client.find(q => q.content.includes("Mario"))) // The function will return a question that include the word "Mario" in it's content.
```

**Returns:** `MultipleQuestion|BooleanQuestion`

### Client#resetToken()

Resets your token. You do not need to worry about resetting / renewing tokens if you have the `noInactiviy` option on.

**Returns:** `Promise<Boolean>`

### Client#token

The token associated with the client.

**Type:** `String`

### Client#cache

A map of all cached questions. 

**Type:** `Map<String, MultipleQuestion|BooleanQuestion>`

### static Client.getToken() 

Generates a token from the API.

**Returns:** `Promise<String>`

### static Client.get(options)

Gets question(s) from the database. Questions gotten from this function will NOT be cached and they may repeat since there is no token.

| Param | Type | Description |
| --- | --- | --- |
| options.amount | <code>Number</code> | How many questions should be fetched. Default is 1. Max is 50. |
| options.type | <code>Defs.TYPES</code> OR <code>String</code> | One of the `Defs.TYPES`. Can be `boolean` or `multiple`  |
| options.difficulty | <code>Defs.DIFFICULTIES</code> OR <code>String</code> | One of the `Defs.DIFFICULTIES`. Can be `easy`, `medium` or `hard` |
| options.category | <code>Defs.CATEGORIES</code> | One of the `Defs.CATEGORIES`. |

**Returns:** `Promise<BooleanQuestion|MultipleQuestion|(BooleanQuestion|MultipleQuestion)[]>`

**Example:**
```js
Client.get({amount: 5, type: 'multiple', category: Defs.CATEGORIES.MOVIES}).then(console.log)
Client.get().then(console.log)
```

### static Client.questionCount(category)

Get how many questions of the given category exist in the database.

| Param | Type | Description |
| --- | --- | --- |
| category | <code>Defs.CATEGORIES</code> | The category |

**Returns:** 
```js
{
    total: Number // Total amount of questions
    easy: Number // Number of easy questions
    medium: Number // Number of medium questions
    hard: Number // Number of hard questions
}
```

## Question

This is a structure class. It represents a question of undefined type. This is the base class for both multiple questions and boolean questions.

### Question#content

The "question" of the question object. 

**Type:** `String`

### Question#type

The type of question. Can be `multiple` or `boolean`.

**Type:** `String`

### Question#difficulty

The difficulty of the question. Can be `easy`, `medium` or `hard`.

**Type:** `String`

### Question#category

The category the question is in. 

**Type:** `String`

### Question#correct

The correct answer of the question

**Type:** `String`

### Question#incorrect

All the incorrect answers. 

**Type:** `String[]`

### Question#answers

The correct answer and all the incorrect answers together.

**Type:** `String[]`

### Question#id

Every time you get a question from the API, it's assigned a unique ID. IDs are only useful when you caching is enabled.

**Type:** `String`

## MultipleQuestion (extends Question)

This is a structure class. It represents a question with multiple answers. Let's call it `MQ` for short.

### MQ#shuffle()

Shuffles the 4 options of the question (A, B, C or D). This function is automatically called when you get a MQ from the API.

### MQ#optionA   

Option A of the question. 

**Type:** `String`

### MQ#optionB

Option B of the question

**Type:** `String`

### MQ#optionC

Option C of the question

**Type:** `String`

### MQ#optionD

Option D of the question

**Type:** `String`

### MQ#correctOption

The correct option. Can be `A`, `B`, `C` or `D`.

**Type:** `String`

## BooleanQuestion (extends Question)

This is a structure class. It represents a True/False question. Let's call it `BQ` for short.

### BQ#correct

Overrides the default `Question#correct` property. If the `content` is true or not.

**Type:** `Boolean`

## Defs
 
`Defs.TYPES` => The types of questions. `boolean` or `multiple`    
`Defs.CATEGORIES` => All categories.    
`Defs.DIFFICULTIES` => All difficulties. `easy`, `medium` and `hard`    

### $has(any)

If the provided value is a type, category or difficulty. Useful when checking user input.

**Returns:** `Boolean`

**Example:** 
```js
 Defs.DIFFICULTIES.$has('very hard') // False
 Defs.TYPES.$has('multiple') // true
```

# Latest Updates

Version 2.0.0:

Updated whole package. Everything has changed.