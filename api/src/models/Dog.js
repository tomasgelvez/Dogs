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
      unique: true, //Tiene que ser unico
    },
    name: {
      type: DataTypes.STRING, //Tipo string
      allowNull: false, //No puede ser vacio
      unique: true, //Tiene que ser unico
    },
    weight_max: {  //Peso maximo
      type: DataTypes.STRING, //Tipo string
      allowNull: false, //No puede estar vacio
    },

    weight_min: {
      type: DataTypes.STRING,//Tipo string
      allowNull: false,//No puede estar vacio
    },

    height_max: {
      type: DataTypes.STRING,//Tipo string
      allowNull: false,//No puede estar vacio
    },

    height_min: {
      type: DataTypes.STRING,//Tipo string
      allowNull: false,//No puede estar vacio
    },
    life_time_min: {//Tiempo de vida minima
      type: DataTypes.STRING,//Tipo string
      allowNull: true, //Puede estar vacio
    },

    life_time_max: { //Tiempo de vida maxima
      type: DataTypes.STRING,//Tipo string
      allowNull: true, //Puede estar vacio
    }, 
  });
};
