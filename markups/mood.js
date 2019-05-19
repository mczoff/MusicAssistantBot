const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Cheerful', 'cheerful'),
        m.callbackButton('Humorous', 'humorous'),
        m.callbackButton('Idyllic', 'idyllic'),
        m.callbackButton('Madness', 'madness'),
        m.callbackButton('Melancholy', 'melancholy'),
        m.callbackButton('Mysterious', 'mysterious'),
        m.callbackButton('Romantic', 'romantic'),
        m.callbackButton('I dont know', 'idk'),
        m.callbackButton('Back to menu', '!back'),
    ], { columns: 3 }))

module.exports = markup