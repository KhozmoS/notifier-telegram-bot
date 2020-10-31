const Markup = require('telegraf/markup')
const { buttonTypes } = require("../types/buttons-name.types");
const { tagService } = require("../services/tag.service");
const { chatService } = require("../services/chat.service");
// TECLADO PRINCIPAL
const mainKeyboard = Markup.keyboard([
  [buttonTypes.CREAR_ALERTA, buttonTypes.OPCIONES] // Row1 with 2 buttons      
]);

// TECLADO DE OPCIONES
const optionsKeyboard = async (chatId) => {
  const chat = await chatService.getChatById(chatId);
  const toggleNotifyBtnAction = chat.notify ? "pause_notifier" : "start_notifier";
  const toggleNotifyBtnText = chat.notify ? "Pusar bot" : "Activar Bot";
  return Markup.inlineKeyboard([
    [ Markup.urlButton("Publicar empleo", "https://github.com/KhozmoS"), 
      Markup.urlButton("Canal Oficial", "https://github.com/KhozmoS")
    ],
    [
      Markup.callbackButton(toggleNotifyBtnText, toggleNotifyBtnAction),
      Markup.callbackButton("Reportar problema", "report_problem")
    ]
  ]);
}
// TECLADO QUE CONTIENE LAS TAGS
const tagsKeyboard = async (chatId) => {
  const tags = await tagService.getAllTags();
  const btn_array = await getTagsBtnsIn3PerRow(tags, chatId);
  return Markup.inlineKeyboard(btn_array);
};
module.exports = {
  mainKeyboard,
  optionsKeyboard,
  tagsKeyboard
}

// FUNCION PARA DADO UN ARREGLO DE TAGS
// DEVOLVER UN ARREGLO DE VARIAS FILAS y
// A LO SUMO 3 COLUMNAS, DE BOTONES DE ETIQUETAS
async function getTagsBtnsIn3PerRow(tags, chatId) {
  const btn_array = [];
  let ar3 = [];
  const chat = await chatService.getChatById(chatId);
  for (let tag of tags) {
    if (chat.isSubscribed(tag.tag_name)) {
      ar3.push(Markup.callbackButton(`🔔 ${tag.tag_name}`, `#tag_clicked ${tag.tag_name}`));
    } else {
      ar3.push(Markup.callbackButton(`${tag.tag_name}`, `#tag_clicked ${tag.tag_name}`));
    }    
    if (ar3.length === 3) {
      btn_array.push([...ar3]);
      ar3 = [];
    }
  }
  if (ar3.length > 0) {
    btn_array.push([...ar3]);
  }
  return [...btn_array];
}