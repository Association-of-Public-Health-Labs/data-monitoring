const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
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
    this.belongsToMany(models.Server, {
      foreignKey: "server_id",
      through: "server_categories",
      as: "servers",
    });
  }
}

module.exports = Category;
