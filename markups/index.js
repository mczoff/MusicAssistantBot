const menu = require('./menu')
const mood = require('./mood')
const genre = require('./genre')
const character = require('./character')

const markups = {
    Menu: menu,
    Mood: mood,
    Genre: genre,
    Character: character
}

module.exports = markups;