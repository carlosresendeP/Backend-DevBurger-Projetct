// Arquivo de migração para remover a coluna category da tabela products
// Para rodar a migração, execute o comando: npx sequelize db:migrate
// Para desfazer a migração, execute o comando: npx sequelize db:migrate:undo

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // vamos remover a coluna category
    await queryInterface.removeColumn('products', 'category');
  },


  async down(queryInterface, Sequelize) {
    // vamos adicionar a coluna category de volta
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });

  },
}    
