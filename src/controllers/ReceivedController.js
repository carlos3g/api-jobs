const Unemployers = require('../models/Unemployers.js');
const Employers = require('../models/Employers');

// TODO: colocar condição para caso o usuário não for encontrado

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = {
  async index(req, res) {
    const { id, type } = req.headers;

    if (type === 'em') {
      const employer = await Employers.findById(id).catch(() => {
        console.log(`Erro: Empresa não encontrada`);
      });

      const uns = await Unemployers.find({
        $and: [
          { _id: { $in: employer.received } }, // pega todos os unemployers que estão em received
        ],
      });

      shuffle(uns);

      return res.json(uns);
    } else {
      // se for un
      const unemployer = await Unemployers.findById(id).catch(() => {
        console.log(`Erro: Desempregado não encontrado`);
      });

      const ems = await Employers.find({
        $and: [
          { _id: { $nin: unemployer.send } }, // pega todos os employers que não estão em send
        ],
      });

      shuffle(ems);

      return res.json(ems);
    }
  },
};
