const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Pick up music', 'pickupmusic'),
        m.callbackButton('Help', 'help'),
        m.callbackButton('About', 'about')
    ], { columns: 1 }))

module.exports = markup;