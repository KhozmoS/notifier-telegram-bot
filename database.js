const mongoose = require('mongoose');
// FIXING FOLLOWING DEPRECATION OF MONGOOSE:
// (node:20000) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set("useCreateIndex", true);

// MODELS
// DEFINIENDO EL MODELO ETIQUETA
const tagSchema = new mongoose.Schema({
  tag_name: { type: String, unique: true, required: true },
});
const Tag = mongoose.model("Tag", tagSchema);

// DEFINIENDO EL MODELO CHAT
const chatSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  first_name: String,
  last_name: String,
  username: String,
  type: String,
  notify: { type: Boolean, default: true },
  subscribed_tags: { type: [], default: [] }
});
chatSchema.methods.isSubscribed = function (tag) {
  return this.subscribed_tags.findIndex(t => t === tag) !== -1;
}
const Chat = mongoose.model("Chat", chatSchema);

// END MODELS
const defineDatabase = () => {
  console.log("connected to db...");
}

// INICIANDO BASE DE DATOS
const initializeDatabase = (connectString) => {
  mongoose.connect(connectString, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', defineDatabase);
}

module.exports = {
  initializeDatabase,
  Chat,
  Tag
}