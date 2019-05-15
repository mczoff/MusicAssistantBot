const Telegraf = require('telegraf'),
    Router = require('telegraf/router'),
    Extra = require('telegraf/extra'),
    session = require('telegraf/session'),
    Stage = require('telegraf/stage'),
    MusicAssistantBot = require('./config')

require ('custom-env').env('botconfig')
const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([MusicAssistantBot.Scenes.ChoiceMusic])

bot.use(session({ ttl: 10 }))
bot.use(stage.middleware())
bot.use((ctx, next) => {
    const start = new Date()
    return next(ctx).then(() => {
        const ms = new Date() - start
        console.log('Response time %sms', ms)
    })
})

bot.start((ctx) => {
    return ctx.reply(`Hi, im MusicAssistantBot, you can use me to choice music for currently time.`, MusicAssistantBot.Markups.Menu)
})

bot.on('callback_query', MusicAssistantBot.Routes.CallbackRoute)

bot.launch()