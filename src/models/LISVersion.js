const { Model, DataTypes } = require("sequelize");

class LISVersion extends Model {
  static init(sequelize) {
    super.init(
      {
        openldr: DataTypes.STRING,
        disaxlreports: DataTypes.STRING,
        disacomms: DataTypes.STRING,
        wxdict: DataTypes.STRING,
        wxdisa: DataTypes.STRING,
        wxinstrument: DataTypes.STRING,
        sqlserver: DataTypes.TEXT,
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
        timestamps: true,
        tableName: "lis_versions",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Server, { foreignKey: "server_id", as: "servers" });
  }
}

module.exports = LISVersion;
