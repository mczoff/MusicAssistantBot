const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const database = require('../database')
const markups = require('../markups')

const superWizard = new WizardScene('addmusic',
    (ctx) => {
        ctx.reply('Question 1. Write name music')
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.reply('Question 2. Write download/listen url address')
        ctx.session.name = ctx.update.message.text

        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.reply('Question 3. Write description (words of song/emotions)')
        ctx.session.url = ctx.update.message.text

        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.reply('Question 4. Choice mood music', markups.Mood)

        ctx.session.description = ctx.update.message.text
        return ctx.wizard.next()
    },
    (ctx) => {
        validateAnswer(ctx)
            .then(function (data)
            {
                if(data.data === '!back')
                {
                    ctx.reply("You was returned to menu!", markups.Menu)
                    return ctx.scene.leave()
                }

                ctx.session.mood = data
                ctx.editMessageText('Question 3. Choice genre music', markups.Genre)
                return ctx.wizard.next()
            })
            .catch(function (err) {
                ctx.reply(err)
                return ctx.scene.leave()
            });
    },
    (ctx) => {
        validateAnswer(ctx)
            .then(function (data)
            {
                if(data.data === '!back')
                {
                    ctx.reply("You was returned to menu!", markups.Menu)
                    return ctx.scene.leave()
                }

                ctx.session.genre = data
                ctx.editMessageText('Question 4. Choice character music', markups.Character)
                return ctx.wizard.next()
            })
            .catch(function (err) {
                return ctx.scene.leave()
            });
    },
    async (ctx) => {
        await validateAnswer(ctx)
            .then(async function (data)
            {
                if(data.data === '!back')
                {
                    ctx.reply("You was returned to menu!", markups.Menu)
                    return ctx.scene.leave()
                }

                ctx.session.character = data;

                database.database().ref('musics').push({
                    name: ctx.session.name,
                    description: ctx.session.description,
                    mood: ctx.session.mood,
                    genre: ctx.session.genre,
                    character: ctx.session.character,
                    url: ctx.session.url,
                })
                    .then(function (val)
                    {
                        database.database().ref('rates').push({
                            musicId: val.key,
                            value: 0,
                        })

                        ctx.reply('Music was added in bot catalog')
                    })
                    .catch((err) => ctx.reply(err))

                ctx.session.musics = musics
                ctx.session.musicRates = musicRates

                ctx.editMessageText(`I can offer you ${musics.length} song(s) according to your preferences`, markups.Preview)
                return ctx.scene.leave()
            })
            .catch(function (err) {
                ctx.reply(err)
                return ctx.scene.leave()
            });

    },
)

function validateAnswer (ctx) {
    return new Promise(function (resolve, reject) {
        if(ctx.update.callback_query == null)
            reject('You must click on inline button! Repeat all steps again! Write /start');
        else
            resolve(ctx.update.callback_query.data);
    })
}

module.exports = superWizard