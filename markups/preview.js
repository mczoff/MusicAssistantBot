const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('View', 'view'),
        m.callbackButton('Back to menu', '!back'),
    ], { columns: 3 }))

module.exports = markup