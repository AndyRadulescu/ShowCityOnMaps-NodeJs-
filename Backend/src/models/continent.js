'use strict';
module.exports = (sequelize, DataTypes) => {
  var continent = sequelize.define('continent', {
    continent_name: DataTypes.STRING
  });
  continent.associate = (models) => {
    console.log("-> continent has many countries");
    continent.hasMany(models.country, { foreignKey: 'continent_id' });
  }

  return continent;
};