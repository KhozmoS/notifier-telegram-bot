// FUNCIONES PARA DADO UN TEXTO OBTENER SUS TAGS,
// QUITANDOLES EL #
const getTags = (text) => {
  if (!text) return [];
  return text
            .split(" ")
            .filter(item => item[0] === '#' && item.length > 1)
            .map(tag => tag.substr(1));
}

module.exports = getTags;