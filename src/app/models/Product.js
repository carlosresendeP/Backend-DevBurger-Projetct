import { Model, Sequelize } from "sequelize";

class Product extends Model{
    static init(sequelize){
        super.init(
            {
                name:Sequelize.STRING,
                price: Sequelize.INTEGER,
                path: Sequelize.STRING,
                offer: Sequelize.BOOLEAN,
                url:{
                    type: Sequelize.VIRTUAL,
                    get(){
                        return `http://localhost:3001/product-file/${this.path}` //temporario
                    }
                }
            },
            {
                sequelize,
            }
        );

        return this;
    }

    //associando a tabela de produtos com a tabela de categorias
    static associate(models){ //models é o objeto que contem todos os models da aplicação
        this.belongsTo(models.Category,  //belongsTo é uma relação de muitos para um 
            {
                foreignKey: "category_id", //chave estrangeira que está na tabela de produtos
                as: "category" //apelido para a relação de produtos com categorias
            }
        );

        return this;
    }
}

export default Product