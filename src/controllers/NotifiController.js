const UnemployedsModel = require('../models/Unemployers.js');

module.exports = {
  async show(req, res) {
    const { id } = req.headers;

    const unemployed = await UnemployedsModel.findById(id).catch(() => {
      console.log(`Erro: Desempregado não encontrado`);
    });

    if (!unemployed) {
      return res.status(400).json({ error: 'Unemployer não encontrado' });
    }

    const notifications = unemployed.notifications;

    return res.json(notifications);
  },
};
