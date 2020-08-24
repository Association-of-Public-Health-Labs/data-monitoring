const Data = require("../models/Data");
const Server = require("../models/Server");
const { update } = require("../models/Server");
const moment = require("moment");
const { Op, literal } = require("sequelize");

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
    const { server_id } = req.params;
    const {
      name,
      category,
      report_date,
      disalab_total_records,
      openldr_total_records,
    } = req.body;

    // check if the server exists
    var server = await Server.findByPk(server_id);

    if (!server) {
      server = await Server.create({ id: server_id, name, category });
    }

    // check if the report date is filled
    const server_data = await Data.findOne({
      where: {
        [Op.and]: [
          literal(`server_id = '${server_id}'`),
          literal(
            `CAST(report_date AS date) = '${moment(
              new Date(report_date)
            ).format("YYYY-MM-DD")}'`
          ),
        ],
      },
    });

    if (!server_data) {
      const data = await Data.create({
        server_id,
        report_date,
        disalab_total_records,
        openldr_total_records,
      });
      return res.json(data);
    }

    const data = await Data.update(
      {
        disalab_total_records,
        openldr_total_records,
      },
      {
        where: {
          [Op.and]: [
            literal(`server_id = '${server_id}'`),
            literal(
              `CAST(report_date AS date) = '${moment(
                new Date(report_date)
              ).format("YYYY-MM-DD")}'`
            ),
          ],
        },
      }
    );
    return res.json(data);
  },
};
