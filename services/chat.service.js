const { Chat } = require("../database");
// SERVICIO PARA LAS CONSULTAS DIRECTAS A LA DB
// RELACIONADAS CON EL MODELO CHAT
const chatService = {
  async existChat(query) {
    const q = await Chat.findOne(query).exec();
    return q !== null;
  },
  async getChatById(chatId) {
    try {
      const chat = await Chat.findOne({ id: chatId }).exec();
      return chat;
    } catch (err) {
      console.log(err);
    }
  },
  async getAllChats() {
    try {
      const chats = await Chat.find().exec();
      return chats;
    } catch (err) {
      console.error(err);
    }
  },
  async saveChat(chat) {
    try {
      const chatToSave = new Chat(chat);
      const resp = await chatToSave.save();      
      return resp;
    } catch (err) {
      console.error(err);
    }
  },
  async updateNotify({ chatId, notify }) {
    try {
      const chat = await this.getChatById(chatId);
      chat.notify = notify;
      const resp = await chat.save();
      return resp;
    } catch (error) {
      console.error(error);
    }
  },
  async suscribeToTag(chatId, tagName) {
    try {
      const chat = await this.getChatById(chatId);
      chat.subscribed_tags.push(tagName);
      const resp = await chat.save();
      return resp;
    } catch (error) {
      console.error(error);
    }
  },
  async unsuscribeToTag(chatId, tagName) {
    try {
      const chat = await this.getChatById(chatId);
      const index = chat.subscribed_tags.indexOf(tagName);
      if (index > -1) {
        chat.subscribed_tags.splice(index, 1);
      }
      const resp = await chat.save();
      return resp;
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = {
  chatService
}