'use strict';
module.exports = (sequelize, DataTypes) => {
  var country = sequelize.define('country', {
    country_name: DataTypes.STRING
  });
  country.associate = (models) => {
    console.log("-> country belongs to continent");
    country.belongsTo(models.continent, { foreignKey: 'continent_id', onDelete: 'CASCADE' });
    country.hasMany(models.city, { foreignKey: 'country_id' })
  }
  return country;
};