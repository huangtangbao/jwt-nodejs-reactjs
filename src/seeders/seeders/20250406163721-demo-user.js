'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
      */
    await queryInterface.bulkInsert('Users', [{
      email: 'huangtangbao1@gmail.com',
      username: "huangtangbao1",
      password: "sdfsdfg"
    },
    {
      email: 'huangtangbao2@gmail.com',
      username: "huangtangbao2",
      password: "sdfsf"
    }, {
      email: 'huangtangbao3@gmail.com',
      username: "huangtangbao3",
      password: "sdsdfg"
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
