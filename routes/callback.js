const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const session = require('telegraf/session')
const markup = require('../markups')
const scenes = require('../scenes')
const Stage = require('telegraf/stage')
const database = require('../database')

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

callbackRouter.on('addmusic', (ctx) => {
    return ctx.scene.enter('addmusic');
})

callbackRouter.on('like', async (ctx) => {

    if(ctx.session.indexMusics == null)
        return;

    const music = ctx.session.musics[ctx.session.indexMusics];

    await database.database().ref('rates').child(music.rate.id).update({
        value: ++music.rate.value
    })

    ctx.reply(`Rate music was updated [${music.rate.value}]`)
})

callbackRouter.on('dislike', async (ctx) => {
    if(ctx.session.indexMusics == null)
        return;

    const music = ctx.session.musics[ctx.session.indexMusics];

    await database.database().ref('rates').child(music.rate.id).update({
        value: --music.rate.value
    })

    ctx.reply(`Rate music was updated [${music.rate.value}]`)
})

callbackRouter.on('next', (ctx) => {
    if(ctx.session.musics === undefined)
    {
        ctx.reply('Musics not found, write /start and find new musics')
        return;
    }

    if(ctx.session.musics.length === 0)
    {
        ctx.reply('I dont understand, write /start')
        return;
    }

    ctx.session.indexMusics += 1
    const music = ctx.session.musics[ctx.session.indexMusics];

    if(music == null)
        ctx.reply('Next music was empty', markup.View)

    ctx.reply(`Name: ${music.name}\nDescription: ${music.description}\nGenre: ${music.genre}\nCharacter: ${music.character}\nMood: ${music.mood}\nRate: ${music.rate.value}`, markup.View)
})

callbackRouter.on('view', (ctx) => {
    if(ctx.session.musics === undefined)
    {
        ctx.reply('Musics not found, write /start and find new musics')
        return;
    }

    if(ctx.session.musics.length === 0)
    {
        ctx.reply('I dont understand, write /start')
        return;
    }

    ctx.session.indexMusics = 0

    const music = ctx.session.musics[ctx.session.indexMusics];

    ctx.reply(`Name: ${music.name}\nDescription: ${music.description}\nGenre: ${music.genre}\nCharacter: ${music.character}\nMood: ${music.mood}\nRate: ${music.rate.value}`, markup.View)
})

callbackRouter.otherwise((ctx) => ctx.reply('I dont understand you, please write right command from /help'))

module.exports = callbackRouter;