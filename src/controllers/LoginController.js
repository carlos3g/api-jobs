const Employers = require('../models/Employers');
const Unemployers = require('../models/Unemployers');

module.exports = {
  async show(req, res) {
    const { email, type } = req.headers;

    if (type === 'em') {
      const emp = await Employers.findOne({ email: email }).catch(() => {
        console.log(`Erro ao logar Empresa`);
      });
      console.log('Empresa logada');
      return res.json(emp);
    } else {
      // loga o un
      const un = await Unemployers.findOne({ email: email }).catch(() => {
        console.log(`Erro ao logar Desempregado`);
      });
      console.log('Desempregado logado');
      return res.json(un);
    }
  },
};
