const Server = require("../models/Server");

module.exports = {
  async store(req, res) {
    const { id, name, category, cpu, ram } = req.body;
    const server = await Server.create({ id, name, category, cpu, ram });

    return res.json(server);
  },

  async index(req, res) {
    const server = await Server.findByPk(req.params.id);

    return res.json(server);
  },

  async showAll(req, res) {
    const server = await Server.findAll();

    return res.json(server);
  },
};
