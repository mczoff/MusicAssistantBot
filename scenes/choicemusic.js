const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const database = require('../database')
const markups = require('../markups')

const superWizard = new WizardScene('pickupmusic',
    (ctx) => {
        ctx.editMessageText('Question 1. Choice your mood', markups.Mood)
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

                ctx.session.mood = data.data
                ctx.editMessageText('Question 2. Choice genre your favourite music', markups.Genre)
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

                ctx.session.genre = data.data
                ctx.editMessageText('Question 3. Choice your type character', markups.Character)
                return ctx.wizard.next()
            })
            .catch(function (err) {
                ctx.reply(err)
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

                ctx.session.character = data.data;

                const resultMusic = []

                const fbValMusics = await database.database().ref('musics').once('value')
                const musics = fbValMusics.val()

                const fbValMusicRates = await database.database().ref('rates').once('value')
                const musicRates = fbValMusicRates.val()

                Object.keys(musics).forEach(key => {
                    const rateKey = Object.keys(musicRates).find(t => musicRates[t].musicId === key)
                    resultMusic.push({
                        name: musics[key].name,
                        character: musics[key].character,
                        description: musics[key].description,
                        mood: musics[key].mood,
                        genre: musics[key].genre,
                        rate: {
                            id: rateKey,
                            value: musicRates[rateKey].value
                        }
                    });
                });


                const sessionMusic = resultMusic.filter(function (item) {
                    return item.mood == ctx.session.mood || item.character == ctx.session.character || item.genre == ctx.session.genre
                })

                ctx.session.musics = sessionMusic

                if(sessionMusic.length == 0)
                {
                    ctx.editMessageText(`I cant offer you songs according to your preferences`, markups.Menu)
                    return;
                }

                ctx.editMessageText(`I can offer you ${sessionMusic.length} song(s) according to your preferences`, markups.Preview)
                return ctx.scene.leave()
            })
            .catch(function (err) {
                console.log(err)
                return ctx.scene.leave()
            });

    },
)

function validateAnswer (ctx) {
    return new Promise(function (resolve, reject) {
        if(ctx.update.callback_query == null)
        {
            console.log(ctx.update.callback_query == null)
            reject('You must click on inline button! Repeat all steps again! Write /start');
        }
        else
        {
            resolve(ctx.update.callback_query);
        }
    })
}

module.exports = superWizard