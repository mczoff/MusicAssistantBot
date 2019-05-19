const menu = require('./menu')
const mood = require('./mood')
const genre = require('./genre')
const character = require('./character')
const preview = require('./preview')
const view = require('./view')

const markups = {
    Menu: menu,
    Mood: mood,
    Genre: genre,
    Character: character,
    Preview: preview,
    View: view
}

module.exports = markups