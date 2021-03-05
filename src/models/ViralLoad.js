const { viralload } = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')

const ViralLoad = viralload.define(
  "Monitoring",
  {
	YEAR: DataTypes.INTEGER,
	MONTH_ID: DataTypes.INTEGER,
	MONTH: DataTypes.STRING,
	LabCode: DataTypes.STRING,
	LabName: DataTypes.STRING,
	Total: DataTypes.INTEGER,
	LIMS: DataTypes.INTEGER,
	NotSent: DataTypes.INTEGER,
	Reffered: DataTypes.INTEGER,
	A: DataTypes.INTEGER,
	C: DataTypes.INTEGER,
	F: DataTypes.INTEGER,
	I: DataTypes.INTEGER,
	O: DataTypes.INTEGER,
	P: DataTypes.INTEGER,
	R: DataTypes.INTEGER,
	S: DataTypes.INTEGER,
	X: DataTypes.INTEGER,
	Y: DataTypes.INTEGER,
	Z: DataTypes.INTEGER,
	CS_Total: DataTypes.INTEGER,
	CS_A: DataTypes.INTEGER,
	CS_C: DataTypes.INTEGER,
	CS_F: DataTypes.INTEGER,
	CS_I: DataTypes.INTEGER,
	CS_O: DataTypes.INTEGER,
	CS_P: DataTypes.INTEGER,
	CS_R: DataTypes.INTEGER,
	CS_S: DataTypes.INTEGER,
	CS_X: DataTypes.INTEGER,
	CS_Y: DataTypes.INTEGER,
	CS_Z: DataTypes.INTEGER,
	CreatedAt: DataTypes.DATE,
	UpdatedAt: DataTypes.DATE
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

ViralLoad.removeAttribute("id");

sequelizePaginate.paginate(ViralLoad)

module.exports = ViralLoad;
