const { chatService } = require("./services/chat.service");
const Extra = require('telegraf/extra');
const { tagsKeyboard, optionsKeyboard } = require("./utils/keyboards");

const tag_clickedRegex = /#tag_clicked /g;
const defineActions = (bot) => {  
  // ACCION PARA REPORTAR UN PROBLEMA (TODAVIA HAY Q IMPLEMENTARLA)
  // EN CASA DE SER CON UN LINK SE ELIMINARIA, YA QUE EL BOTON
  // REPORT PROBLEM SERIA DE TIPO LINK y NO CALLBACK
  bot.action('report_problem', ({ deleteMessage }) => deleteMessage());

  // ACCION PARA PAUSAR NOTIFIER PARA EL CHAT
  bot.action('pause_notifier', async (ctx) => {
    const chatId = ctx.update.callback_query.message.chat.id;
    await chatService.updateNotify({ chatId, notify: false });
    await ctx.deleteMessage();
    const keyBoard = await optionsKeyboard(chatId);
    return ctx.reply("OPCIONES", Extra.markup(keyBoard));
  });
  // ACCION PARA INICIAR NOTIFIER PARA EL CHAR
  bot.action('start_notifier', async (ctx) => {    
    const chatId = ctx.update.callback_query.message.chat.id;
    await chatService.updateNotify({ chatId, notify: true });
    await ctx.deleteMessage();
    const keyBoard = await optionsKeyboard(chatId);
    return ctx.reply("OPCIONES", Extra.markup(keyBoard)); 
  });
  // ACCION ACCION PARA SUBSCRIBIR A UN USUARIO O CHAT A UN TAG DADO
  bot.action(tag_clickedRegex, async (ctx) => {
    let tagsKey = {};
    try {
      const update = ctx.update;
      const tagName = update.callback_query.data.split(" ")[1];
      const chat = await chatService.getChatById(update.callback_query.message.chat.id);
      if (chat.isSubscribed(tagName)) {
        await chatService.unsuscribeToTag(chat.id, tagName);
      } else {
        await chatService.suscribeToTag(chat.id, tagName);
      }
      tagsKey = await tagsKeyboard(chat.id);
      await ctx.deleteMessage();
    } catch (error) {
      console.error(error);
    } finally {
      return ctx.reply("Crear Alerta", Extra.markup(tagsKey));
    }
  });
};

module.exports = { defineActions };