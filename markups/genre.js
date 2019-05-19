const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Afro', 'afro'),
        m.callbackButton('Avant-garde', 'avant-garde'),
        m.callbackButton('Blues', 'blues'),
        m.callbackButton('Comedy', 'comedy'),
        m.callbackButton('Country', 'country'),
        m.callbackButton('Easy listening', 'easy-listening'),
        m.callbackButton('Electronic', 'electronic'),
        m.callbackButton('Folk', 'folk'),
        m.callbackButton('Hip hop', 'hip-hop'),
        m.callbackButton('Jazz', 'jazz'),
        m.callbackButton('Latin', 'latin'),
        m.callbackButton('Rock', 'rock'),
        m.callbackButton('Pop', 'pop'),
        m.callbackButton('I dont know', 'idk'),
        m.callbackButton('Back to menu', '!back'),
    ], { columns: 3 }))

module.exports = markup