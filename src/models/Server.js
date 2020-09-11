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
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      { sequelize, timestamps: false, underscored: true }
    );
  }

  static associate(models) {
    this.hasMany(models.Data, { foreignKey: "server_id", as: "data" });
  }
}

module.exports = Server;
