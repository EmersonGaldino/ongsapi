const conn = require('../database/connection');

module.exports = {
  async create(req, response) {
    const { id } = req.body;
    const ong = await conn('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return response.status(400).json({ Error: 'No ONG found with this ID' });
    }

    return response.json(ong);
  }
};
