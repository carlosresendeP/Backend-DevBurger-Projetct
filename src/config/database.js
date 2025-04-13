export default{
    dialect: 'postgres',//qual o tipo de banco de dados
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'devBurger',//nome do banco de dados
    define:{
        timestamp: true, //cria o => (created_at e o updated_at) quarda a data de quandro foi criado
        underscored: true,
        underscoredAll: true //// passa tudo para o minusculo
    }
}
