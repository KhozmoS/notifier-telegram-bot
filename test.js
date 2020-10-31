// ESTO SOLO ES UN ARCHIVO UTIL PARA CORRER TEST MANUALES
// Y PROBAR ALGUNAS FUNCIONES
// PARA CORRERLO ESCRIBA EN LA CONSOLA DEL PROYECTO:
// node test.js
const getTags = require("./utils/get-tags.util");
const { MONGO_URI } = require("./configuration");
const { initializeDatabase } = require("./database");
const { tagService } = require("./services/tag.service");
const { chatService } = require("./services/chat.service");
const { tagsKeyboard } = require("./utils/keyboards");
initializeDatabase(MONGO_URI);

chatService.updateNotify({ chatId: 720227825, notify: true });