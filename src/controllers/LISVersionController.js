const LISVersion = require("../models/LISVersion");
const Server = require("../models/Server");
const { update } = require("../models/Server");

module.exports = {
  async index(req, res) {
    const { server_id } = req.params;
    console.log(server_id)
    const version = await LISVersion.findOne({
      where: {
        server_id: server_id,
      },
      include: {
        association: "servers",
      },
    });
    console.log(version)

    return res.json(version);
  },

  async showAllDisalabs(req, res) {
    const versions = await LISVersion.findAll({
      include: {
        association: "servers",
        where: {
          category: "disalab"
        }
      },
    });

    return res.json(versions);
  },

  async store(req, res) {
    const { server_id } = req.body;

    const server = await Server.findByPk(server_id);

    if (!server) {
      return res.json({ err: "Server not found!" });
    }

    const version = await LISVersion.create(req.body);

    return res.json(version);
  },

  async update(req, res) {
    const { server_id } = req.params;

    const version_updated = await LISVersion.findOne({
      where: { server_id: server_id },
    });

    if (!version_updated) {
      const vrs = await LISVersion.create(req.body);
      return res.json(vrs)
    }

    const version = await LISVersion.update(req.body, {
      where: {
        server_id: server_id,
      },
    });

    return res.json(version);
  },
};
