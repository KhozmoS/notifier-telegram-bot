const { updateType } = require("../types/context-updates.types");
const getTags = require("../utils/get-tags.util");
const { validChannel } = require("../utils/valid-channel.util");
const { chatService } = require("../services/chat.service");

// MIDDLEWARE
const sendsSubsPost = (ctx, next) => {
  try {

    if (ctx.updateType == updateType.channel_post) {
      // SI NO ES UN CANAL VALIDO ENTONCES NO
      // REENVIAMOS EL POST A NINGUN CHAT
      // Y PASAMOS AL SIGUIENTE MIDDLEWARE
      if (!validChannel(ctx)) {
        next();
        return;
      }
  
      // CHECKING IF THESE FIELDS EXISTS
      if (
        !ctx.update[updateType.channel_post]
       ) { next(); return;};
       const fromChatId = ctx.update[updateType.channel_post].chat.id;
       const messageId = ctx.update[updateType.channel_post].message_id;
  
       const text = ( ctx.update[updateType.channel_post].text ||
                      ctx.update[updateType.channel_post].caption);
       const tagsArray = getTags(text);     
       chatService.getAllChats().then(chats => {
         chats.forEach(chat => {
           const isSubscrbed = intersection(tagsArray, chat.subscribed_tags).length > 0;
           if (isSubscrbed && chat.notify) {
              ctx.telegram.forwardMessage(chat.id, fromChatId, messageId)
              .then()
              .catch(
                err => console.log(`Error al enviar mensaje:`, err.response)
              );
            }
          })
       });      
    }
    next();
  } catch (err) {
    console.err(err.message);
  }
}

module.exports = sendsSubsPost;

function intersection(array1, array2) {
  return array1.filter(value => array2.includes(value));
}