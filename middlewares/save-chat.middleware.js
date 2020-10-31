const { updateType } = require("../types/context-updates.types");
const { chatService } = require("../services/chat.service");
// MIDDLEWARE PARA SALVAR UN CHAR SI ESTE NO EXISTE EN LA DB
const saveChat = async (ctx, next) => {  
  // console.log("CHAT MIDDLE...");
  if (ctx.updateType == updateType.message) {
    if (ctx.message && ctx.message.chat) {          
      // console.log("CHECKING...");
      const isThere = await chatService.existChat({id: ctx.message.chat.id});
      // console.log(isThere);
      if (!isThere) {
        // console.log("SAVING CHAT...");
        chatService.saveChat(ctx.message.chat);
      }
    }
  }
  next();
}

module.exports = saveChat