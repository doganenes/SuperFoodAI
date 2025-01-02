'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.TEXT
      },
      instructions: {
        type: Sequelize.TEXT
      },
      cookTime: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.TEXT
      },
      avgRate: {
        type: Sequelize.FLOAT
      }
    }, {
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Recipes");
  }
};