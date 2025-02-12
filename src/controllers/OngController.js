const crypto = require('crypto');

const conn = require('../database/connection');

module.exports = {
  async index(req, response) {
    const ongs = await conn('ongs').select('*');

    return response.json(ongs);
  },

  async create(req, response) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await conn('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  }
};
