const { updateType } = require("../types/context-updates.types");
const getTags = require("../utils/get-tags.util");
const { validChannel } = require("../utils/valid-channel.util");
const { tagService } = require("../services/tag.service");
// MIDDLEWARE PARA SALVAR UNA ETIQUETA SI ESTA NO EXISTE EN LA DB
// Y VIENE DE UN MENSAJE EN EL CANAL
const saveTag = async (ctx, next) => {  
  if (ctx.updateType == updateType.channel_post) {
    // SI NO ES UN CANAL VALIDO ENTONCES NO GUARDAMOS TAGS
    if (!validChannel(ctx)) {
      next();
      return;
    }
    // CHECKING IF THESE FIELDS EXISTS
    if (
        !ctx.update[updateType.channel_post] ||
        !ctx.update[updateType.channel_post].text
       ) { next(); return; };
    // IF THESE FIELDS EXIST THEN TRY SAVE THE TAG
    const text = ctx.update[updateType.channel_post].text;
    const tagsArray = getTags(text);
    tagsArray.forEach(async tag => {;
      const isThere = await tagService.existTag({tag_name: tag});
      if (!isThere) {
        await tagService.saveTag({ tag_name: tag });
      }
    });
  }
  next();
}

module.exports = saveTag;