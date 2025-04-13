//arquivo de migração para adicionar a coluna category_id na tabela products
//referenciando a tabela categories
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('products','category_id', { 
      //referenciando a tabela categories
      type: Sequelize.INTEGER,
      references:{ 
        model: 'categories', //nome da tabela referenciada
        key: 'id' //nome da coluna referenciada
      },
      onUpdate: 'CASCADE', //sempre que o id da categoria for alterado, o id da categoria do produto também será alterado
      onDelete: 'SET NULL', //se a categoria for deletada, o id da categoria do produto será setado como nulo
      allowNull: true,
    
    });

  },

  //método down é responsável por desfazer a migração
  async down (queryInterface) {

    await queryInterface.removeColumn('products', 'category_id');

    
  }
};
