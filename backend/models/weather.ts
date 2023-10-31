const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Tesjo extends Model {}

Tesjo.init(
  {
    fecha: {
      type: DataTypes.DATEONLY,
    },
    hora: {
      type: DataTypes.INTEGER,
    },
    minuto: {
      type: DataTypes.INTEGER,
    },
    segundo: {
        type: DataTypes.INTEGER,
      },
    direccion: {
      type: DataTypes.INTEGER,
    },
    humedad: {
      type: DataTypes.INTEGER,
    },
    lluvia: {
      type: DataTypes.INTEGER,
    },
    luz: {
      type: DataTypes.INTEGER,
    },
    presion: {
      type: DataTypes.INTEGER,
    },
    temperatura: {
      type: DataTypes.INTEGER,
    },
    velocidad: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "tesjo",
  }
);

module.exports = Tesjo;
