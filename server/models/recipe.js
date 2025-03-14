"use strict"
const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");
class Recipe extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Recipe.hasMany(models.Rating, { foreignKey: "recipeId" });
  }
}
Recipe.init(
  {
    name: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    cookTime: DataTypes.TEXT,
    imageUrl : DataTypes.TEXT,
    calories : DataTypes.DECIMAL,
    avgRate: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "Recipe",
    timestamps: false,
  }
);
module.exports = Recipe;