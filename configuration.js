require('dotenv').config({path: __dirname + '/.env'})

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  MONGO_URI: process.env.MONGO_URI,
  ENVIORMENT: process.env.ENVIORMENT,
  CHANNEL_ALIAS: process.env.CHANNEL_ALIAS
}