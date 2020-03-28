const conn = require('../database/connection');

module.exports = {
  async index(req, response) {
    const { page = 1 } = req.query;
    const [count] = await conn('incidents').count();
    const incidents = await conn('incidents')
      .join('ongs', 'ong_id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);
    return response.json(incidents);
  },

  async create(req, response) {
    const { title, descryption, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await conn('incidents').insert({
      title,
      descryption,
      value,
      ong_id
    });
    return response.json({ id });
  },

  async delete(req, response) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await conn('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(400).json({ error: 'Operation not permited' });
    }

    await conn('incidents')
      .where('id', id)
      .delete();

    return response.status(204).json({ Msg: 'Delete is success full' });
  }
};
