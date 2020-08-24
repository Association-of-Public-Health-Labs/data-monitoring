const Server = require("../models/Server");
const Data = require("../models/Data");
const { upsert } = require("../models/Server");

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

  async update(req, res) {
    const { server_id } = req.params;
    const { cpu, ram, category, name } = req.body;
    const server = await Server.update(
      { cpu: cpu, ram: ram, name: name, category: category },
      {
        where: {
          id: server_id,
        },
      }
    );

    return res.json(server);
  },

  async upsert(req, res) {
    const { server_id } = req.params;
    const { name, category, cpu, ram } = req.body;

    var server = await Server.findByPk(server_id);

    if (!server) {
      server = await Server.create({ id: server_id, name, category, cpu, ram });
    }

    const server_updated = await Server.update(
      { cpu: cpu, ram: ram, name: name, category: category },
      {
        where: {
          id: server_id,
        },
      }
    );

    return res.json(server_updated);
  },

  async delete(req, res) {
    const { server_id } = req.params;
    const server = await Server.destroy({
      where: {
        id: server_id,
      },
    });
    return res.json(server);
  },
};
