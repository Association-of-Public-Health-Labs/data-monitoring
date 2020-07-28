const { Model, DataTypes } = require("sequelize");

class Data extends Model {
  static init(sequelize) {
    super.init(
      {
        report_date: DataTypes.DATE,
        disalab_total_records: DataTypes.INTEGER,
        openldr_total_records: DataTypes.INTEGER,
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: false,
        tableName: "data",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Server, { foreignKey: "server_id", as: "servers" });
  }
}

module.exports = Data;
