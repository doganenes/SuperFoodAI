"use strict";
const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");
class Rating extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {

    Rating.belongsTo(models.User, { foreignKey: 'UserId' });
    Rating.belongsTo(models.Recipe, { foreignKey: 'RecipeId' });


  }
}
Rating.init(
  {
    UserId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER,
    Rating: DataTypes.FLOAT
  },
  {
    sequelize,
    modelName: "Rating"
  }
);

module.exports = Rating;
