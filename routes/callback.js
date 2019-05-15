const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const session = require('telegraf/session')
const markup = require('../markups')
const scenes = require('../scenes')
const Stage = require('telegraf/stage')

const callbackRouter = new Router(({ callbackQuery }) => {
    if (!callbackQuery.data) {
        return
    }
    const parts = callbackQuery.data.split(':')
    return {
        route: parts[0],
        state: {
            argument: parts[1]
        }
    }
})

callbackRouter.on('pickupmusic', (ctx) => {
    return ctx.scene.enter('pickupmusic');
})

callbackRouter.otherwise((ctx) => ctx.reply('I dont understand you, please write right command from /help'))

module.exports = callbackRouter;