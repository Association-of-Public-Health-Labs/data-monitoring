const { Model, DataTypes } = require("sequelize");

class ServerCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        server_id: DataTypes.STRING,
        category_id: DataTypes.STRING,
      },
      { sequelize, timestamps: false, underscored: true }
    );
  }

  static associate(models) {
  }
}

module.exports = ServerCategory;
