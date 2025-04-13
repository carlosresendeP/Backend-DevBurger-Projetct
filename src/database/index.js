import { Sequelize } from "sequelize";

import configDataBasea from "../config/database.js"

import User from "../app/models/user.js"
import Product from "../app/models/Product.js";
import Category from "../app/models/Category.js";

import mongoose from "mongoose";


const models = [User, Product, Category]

//criando a conexão com o banco de dados
class Database {
    constructor(){
        this.init();
        this.mongo();
    }
    init(){
        //criando a conexão com o banco de dados e carregando os models
        this.connection = new Sequelize(configDataBasea)
        models
            .map((model)=> model.init(this.connection)) //inicializando os models
            .map((model) => model.associate && model.associate(this.connection.models) //se o model tiver o método associate, ele é chamado
        );
    }


    mongo(){
        this.mongoConnection = mongoose.connect(
            "mongodb://localhost:27017/devburger",

        )
    };
}

export default new Database();
