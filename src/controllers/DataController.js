const Data = require("../models/Data");
const Server = require("../models/Server");
const ViralLoad = require("../models/ViralLoad");
const moment = require("moment");
const { Op, literal, col } = require("sequelize");

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

  async showVLReportByMonth(req, res){
    const {paginate, page} = req.params;
    const { docs, pages, total } = await ViralLoad.paginate({
      page: parseInt(page),
      paginate: parseInt(paginate),
      order: [[col("year"), "DESC"], [col("month_id"), "DESC"], [col("LabName"), "ASC"]]
    });
    return res.json({ docs, pages, total });
  },

  async showVLReportByLab(req, res){
    const {lab_code, paginate, page} = req.params;
    const { docs, pages, total } = await ViralLoad.paginate({
      where: {
        LabCode: lab_code,
      },
      order: [[col("year"), "DESC"], [col("month_id"), "DESC"]],
      page: parseInt(page),
      paginate: parseInt(paginate)
    })
    return res.json({ docs, pages, total });
  }
};
