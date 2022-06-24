const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
      id: {
      type: DataTypes.UUID, //id alfanumerico
      primaryKey: true,
      allowNull: false, //no permito que este vacio
      defaultValue: DataTypes.UUIDV4 //
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

      userCreated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
  });
};
