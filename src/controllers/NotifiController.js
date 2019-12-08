const Unemployers = require('../models/Unemployers.js');

module.exports = {
  async show(req, res) {
    const { id } = req.headers;

    const un = await Unemployers.findById(id).catch(() => { console.log(`Erro: Desempregado não encontrado`) });


    if (!un) {
      return res.status(400).json({error: 'Unemployer não encontrado'})
    }


    const notifications = un.notifications;

    return res.json(notifications);
  }
}
