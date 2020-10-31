const { CHANNEL_ALIAS } = require("../configuration");
// CHECK IF IS A VALID CHANNEL
const validChannel = (ctx) => {
  const channelAlias = ctx.update.channel_post.chat.username;
  // if (channelAlias === CHANNEL_ALIAS) {
  //   console.log("OK " + channelAlias);
  // } else {
  //   console.log("NO " + channelAlias);
  // }
  return channelAlias === CHANNEL_ALIAS;
};

module.exports = { validChannel };