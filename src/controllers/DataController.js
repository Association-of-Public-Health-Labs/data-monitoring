const Data = require("../models/Data");
const Server = require("../models/Server");
const { update } = require("../models/Server");

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

  async update(req, res) {
    const { server_id, report_date } = req.params;
    const data = await Data.update(req.body, {
      where: {
        server_id: server_id,
        report_date: report_date,
      },
    });
    return res.json(data);
  },
};
