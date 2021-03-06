const Server = require("../models/Server");
const Data = require("../models/Data");
const Category = require("../models/Category"); 
const {Op} = require("sequelize");
const api = require("../config/api");

const jsonfile = require("jsonfile")
const path = require("path")


module.exports = {
  async store(req, res) {
    const { id, name, category, cpu, ram } = req.body;

    var server = await Server.findByPk(id);
    
    if (server) {
      return res.json({ error: "This server exists" });
    }

    server = await Server.create({ id, name, category, cpu, ram });

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

  async showByCategory(req, res) {
    const {category} = req.params;
    const servers = await Server.findAll({
      where: {
        ...(category != "all" && {category: category})
      }
    });

    return res.json(servers);
  },

  async update(req, res) {
    const { server_id } = req.params;
    const { cpu, ram, category, name, disk_storage } = req.body;
    const server = await Server.update(
      {
        cpu: cpu,
        ram: ram,
        name: name,
        category: category,
        disk_storage: disk_storage,
      },
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
    const { name, category, cpu, ram, disk_storage } = req.body;

    var server = await Server.findByPk(server_id);

    if (!server) {
      server = await Server.create({
        id: server_id,
        name,
        category,
        cpu,
        ram,
        disk_storage,
      });
    }

    const server_updated = await Server.update(
      {
        cpu: cpu,
        ram: ram,
        name: name,
        category: category,
        disk_storage: disk_storage,
      },
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

  async showAllServers(req, res) {
    const file = path.resolve(__dirname, "..", "storage/hosts.json");
    console.log(file)
    const servers = await jsonfile.readFileSync(file);
    return res.json(servers)
  },

  async update_usage(server_id, data) {
    const server = await Server.update(
      data,
      {
        where: {
          id: server_id,
        },
      }
    );

    return server;
  },

  async getFacility(req, res) {
    const {facility_code} = req.params;

    const response = await api.get(`clinic/${facility_code}`)

    return res.json(response.data);
  }
};
