import { Model, Sequelize } from "sequelize";

class Category extends Model{
    static init(sequelize){
        super.init(
            {
                name:Sequelize.STRING,
                path: Sequelize.STRING,
                url:{
                    type: Sequelize.VIRTUAL,
                    get(){
                        return `http://localhost:3001/category-file/${this.path}` //temporario
                    }
                }
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Category