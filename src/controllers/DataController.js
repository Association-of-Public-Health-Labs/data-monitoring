const Data = require("../models/Data");
const Server = require("../models/Server");

module.exports = {
  async store(req, res) {
    const server_id = req.params.server_id;
    const {
      report_date,
      disalab_total_records,
      openldr_total_records,
    } = req.body;

    const server = await Server.findByPk(server_id);

    if (!server) {
      return res.json({ error: "Server not found" });
    }

    const data = await Data.create({
      server_id,
      report_date,
      disalab_total_records,
      openldr_total_records,
    });

    return res.json(data);
  },

  async showAllByLab(req, res) {
    const { server_id } = req.params;
    const data = await Data.findAll({
      where: {
        server_id: server_id,
      },
    });

    return res.json(data);
  },
};
