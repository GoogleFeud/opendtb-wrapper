

const CATEGORIES = {
    GENERAL: 9,
    BOOKS: 10,
    FILM: 11, 
    MUSIC: 12,
    MUSICALS_THEATRES: 13,
    TELEVISION: 14,
    GAMES: 15,
    BOARD_GAMES: 16,
    SCIENCE_NATURE: 17,
    COMPUTERS: 18,
    MATHEMATICS: 19,
    MYTHOLOGY: 20,
    SPORTS: 21,
    GEOGRAPHY: 22,
    HISTORY: 23,
    POLITICS: 24,
    ART: 25,
    CELEBS: 26,
    ANIMALS: 27,
    VEHICLES: 28,
    COMICS: 29,
    SCIENCE_GADGETS: 30,
    ANIME_MANGA: 31,
    CARTOON_ANIMATIONS: 32,
    $has: function(thing) {
        let res = false;
        for (let i in this) {
           if (this[i] == thing) res = true;
        }
        return res;
    }
}

const DIFFICULTIES = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    $has: function(thing) {
        let res = false;
        for (let i in this) {
           if (this[i] == thing) res = true;
        }
        return res;
    }
}

const TYPES = {
    MULTIPLE: 'multiple',
    BOOLEAN: 'boolean',
    $has: function(thing) {
        let res = false;
        for (let i in this) {
           if (this[i] == thing) res = true;
        }
        return res;
    }
}

module.exports = {
    TYPES: TYPES,
    DIFFICULTIES: DIFFICULTIES,
    CATEGORIES: CATEGORIES
}

