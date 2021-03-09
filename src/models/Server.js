const { Model, DataTypes } = require("sequelize");

class Server extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        cpu: DataTypes.STRING,
        ram: DataTypes.FLOAT,
        disk_storage: DataTypes.FLOAT,
        cpu_usage: DataTypes.FLOAT, 
        is_disacomms_on: DataTypes.BOOLEAN, 
        disk_usage: DataTypes.FLOAT, 
        ram_usage: DataTypes.FLOAT, 
        is_connected: DataTypes.BOOLEAN, 
        sqlagent: DataTypes.BOOLEAN,
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      { sequelize, timestamps: true, underscored: true }
    );
  }

  static associate(models) {
    this.hasMany(models.Data, { foreignKey: "server_id", as: "data" });
    this.belongsToMany(models.Category, {
      foreignKey: "category_id",
      through: "server_categories",
      as: "categories",
    });
  }
}

module.exports = Server;
