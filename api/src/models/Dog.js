const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID, //Id alfa numerico automatico
      primaryKey: true, //Primary key.
      allowNull: false, //No puede ser vacio
      defaultValue: DataTypes.UUIDV4, //Valor por default.
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_time_min: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    life_time_max: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
