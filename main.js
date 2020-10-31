const Telegraf = require('telegraf')

const Extra = require('telegraf/extra')

const { initializeDatabase } = require("./database");

const {
  saveChatMiddleware,
  saveTagMiddleware,
  sendSubsPost
} = require("./middlewares");
// VARIABLES: TOKEN DEL BOT y URI DE CONNECCION PARA LA DB
const { BOT_TOKEN, MONGO_URI } = require("./configuration");
const { buttonTypes } = require("./types/buttons-name.types");
const { mainKeyboard, optionsKeyboard, tagsKeyboard } = require("./utils/keyboards");
const { defineActions } = require("./actions");
const bot = new Telegraf(BOT_TOKEN)

initializeDatabase(MONGO_URI);
initializeMiddlewares([saveChatMiddleware, saveTagMiddleware, sendSubsPost]);
defineActions(bot);

// RESPONDIENDO AL COMANDO START
bot.start(({ reply }) => {
  return reply("Hola, 👋🏽", mainKeyboard
    .oneTime()
    .resize()
    .extra()
  )
});
// ESCUCHANDO MENSAJES DE TEXTO Y RESPONDIENDO
bot.hears(buttonTypes.CREAR_ALERTA, async (ctx) => {  
  const tagsKey = await tagsKeyboard(ctx.chat.id);
  return ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(tagsKey))
});
bot.hears(buttonTypes.OPCIONES, async (ctx) => {
  const keyBoard = await optionsKeyboard(ctx.chat.id);
  return ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyBoard));
});

// CORRIENDO AL BOT
bot.launch()
console.log("Bot currently running...");
// FUNCION PARA INICIALIZAR UNA LISTA DE MIDDLEWARES
function initializeMiddlewares(array) {
  array.forEach(element => {
    bot.use(element);
  });
}