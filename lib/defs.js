
    const cats = [
      {
        id: 9,
        name: 'General Knowledge'
      },
      {
        id: 10,
        name: 'Entertainment: Books'
      },
      {
        id: 11,
        name: 'Entertainment: Film'
      },
      {
        id: 12,
        name: 'Entertainment: Music'
      },
      {
        id: 13,
        name: 'Entertainment: Musicals & Theatres'
      },
      {
        id: 14,
        name: 'Entertainment: Television'
      },
      {
        id: 15,
        name: 'Entertainment: Video Games'
      },
      {
        id: 16,
        name: 'Entertainment: Board Games'
      },
      {
        id: 17,
        name: 'Science & Nature'
      },
      {
        id: 18,
        name: 'Science: Computers'
      },
      {
        id: 19,
        name: 'Science: Mathematics'
      },
      {
        id: 20,
        name: 'Mythology'
      },
      {
        id: 21,
        name: 'Sports'
      },
      {
        id: 22,
        name: 'Geography'
      },
      {
        id: 23,
        name: 'History'
      },
      {
        id: 24,
        name: 'Politics'
      },
      {
        id: 25,
        name: 'Art'
      },
      {
        id: 26,
        name: 'Celebrities'
      },
      {
        id: 27,
        name: 'Animals'
      },
      {
        id: 28,
        name: 'Vehicles'
      },
      {
        id: 29,
        name: 'Entertainment: Comics'
      },
      {
        id: 30,
        name: 'Science: Gadgets'
      },
      {
        id: 31,
        name: 'Entertainment: Japanese Anime & Manga'
      },
      {
        id: 32,
        name: 'Entertainment: Cartoon & Animations'
      }
    ]
  

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
    },
    $search: function(name) {
        for (let i=0; i < cats.length; i++) {
             let val = cats[i];
             if (val.name.toLowerCase() == name.toLowerCase() || val.name.toLowerCase().includes(name.toLowerCase()) || val.name.toLowerCase().split(" ").some(e => e.includes(name.toLowerCase()))) return val.id; 
        }
        return null;
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

