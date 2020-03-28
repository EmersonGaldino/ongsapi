const conn = require('../database/connection');

module.exports = {
  async index(req, response) {
    const ong_id = req.headers.authorization;
    const incidents = await conn('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);
  }
};
