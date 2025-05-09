"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        height: {
          type: Sequelize.FLOAT
        },
        weight: {
          type: Sequelize.FLOAT
        },
        age: {
          type: Sequelize.INTEGER
        },
        gender: {
          type: Sequelize.STRING
        }
      },
      {
        timestamps: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  }
};
