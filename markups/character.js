const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Choleric', 'choleric'),
        m.callbackButton('Phlegmatic', 'phlegmatic'),
        m.callbackButton('Sanguine', 'sanguine'),
        m.callbackButton('Melancholic', 'melancholic'),
        m.callbackButton('I dont know', 'idk'),
        m.callbackButton('Back to menu', '!back'),
    ], { columns: 3 }))

module.exports = markup;