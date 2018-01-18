'use strict';
module.exports = (sequelize, DataTypes) => {
  var city = sequelize.define('city', {
    city_name: DataTypes.STRING
  });

  city.associate = (models) => {
    console.log("-> city belongs to country");
    city.belongsTo(models.country, { foreignKey: 'country_id', onDelete: 'CASCADE' });
  }
  return city;
};