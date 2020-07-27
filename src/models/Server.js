const { Model, DataTypes } = require("sequelize");

class Server extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        cpu: DataTypes.FLOAT,
        ram: DataTypes.FLOAT,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      { sequelize, timestamps: true, underscored: true }
    );
  }

  static associate(models) {
    this.hasMany(models.Data, { foreignKey: "server_id", as: "data" });
  }
}

module.exports = Server;
