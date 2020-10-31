const { Tag } = require("../database");
const getTags = require("../utils/get-tags.util");
// SERVICIO PARA LAS CONSULTAS DIRECTAS A LA DB
// RELACIONADAS CON EL MODELO TAG
const tagService = {
  async existTag(query) {
    const q = await Tag.findOne(query).exec()
    return q !== null;
  },
  async saveTag(tag) {
    try {
      const tagToSave = new Tag(tag);
      const resp = await tagToSave.save();
      return resp;
    } catch (err) {
      console.error(err);
    }
  },
  async getAllTags() {
    try {
      const tags = await Tag.find().exec();
      return tags;
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = {
  tagService
}