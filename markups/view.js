const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Like', 'like'),
        m.callbackButton('Dislike', 'dislike'),
        m.callbackButton('Next', 'next'),
    ], { columns: 2 }))

module.exports = markup