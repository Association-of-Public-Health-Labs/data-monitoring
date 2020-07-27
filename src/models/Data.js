const { Model, DataTypes } = require("sequelize");

class Data extends Model {
  static init(sequelize) {
    super.init(
      {
        report_date: DataTypes.DATE,
        disalab_total_records: DataTypes.INTEGER,
        openldr_total_records: DataTypes.INTEGER,
      },
      {
        sequelize,
        underscored: true,
        timestamps: true,
        tableName: "data",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Server, { foreignKey: "server_id", as: "servers" });
  }
}

module.exports = Data;
