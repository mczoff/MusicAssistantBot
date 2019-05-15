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
                ctx.session.mood = data
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
                ctx.session.genre = data
                ctx.editMessageText('Question 3. Choice your type character', markups.Character)
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
                ctx.session.character = data;
                console.log(ctx.session)
                return ctx.scene.leave()
            })
            .catch(function (err) {
                ctx.reply(err)
                return ctx.scene.leave()
            });

    }
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