//arquivo de controle de categorias

import * as yup from 'yup'
import Categoty from '../models/Category.js'

import User from '../models/user.js'

export const categoryController = async(req, res) =>{
    //validação
    const schema = yup.object({
        name: yup.string().required(),
    })

    //verifica se tem erro
    try {
        await schema.validate(req.body, { abortEarly: false }); //abortEarly: false vai retornar todos os erros de uma vez
    } catch (error) {
        return res.status(400).json({ error: error.errors })
    }

    //verifica se o usuário é admin
    //findBk é uma função do sequelize que busca um usuário pelo id
    const {admin: isAdmin} = await User.findByPk(req.userId)
    if (!isAdmin){
        return res.status(401).json()
    }


    //pega o filename do arquivo e transforma em path
    const {filename: path} = req.file;

    const {name} = req.body;

    //verifica se a categoria já existe
    const categoryExists = await Categoty.findOne({
        where: {
            name,
        }
    })
    if (categoryExists) {
        return res.status(400).json({ error: 'Category already exists' })
    }


    //cria a categoria no banco
    const {id} = await Categoty.create({
        name,
        path,
    });
    //retorna o id e o nome da categoria
    return res.status(201).json({id,name})

}


export const categoryUpdate = async(req, res) =>{
    //validação
    const schema = yup.object({
        name: yup.string(),
    })

    //verifica se tem erro
    try {
        await schema.validate(req.body, { abortEarly: false }); //abortEarly: false vai retornar todos os erros de uma vez
    } catch (error) {
        return res.status(400).json({ error: error.errors })
    }

    //verifica se o usuário é admin
    //findBk é uma função do sequelize que busca um usuário pelo id
    const {admin: isAdmin} = await User.findByPk(req.userId)
    if (!isAdmin){
        return res.status(401).json()
    }

    //verifica se a categoria existe
    //pega o id da categoria no route params
    const {id} = req.params;
    const categoryExists = await Categoty.findByPk(id);
    
    if (!categoryExists){
        return res.status(400).json({message: 'Make sure your Category ID is correct'})
    }


    //deixando a variavel path opcional
    let path;
    if (req.file){
        path = req.file.filename;
    }
        

    const {name} = req.body;



    //verifica se o nome categoria já existe
    //se tiver o name fazer a verificação , se o nome ja existe da erro
    if (name){
        const categoryNameExists = await Categoty.findOne({
            where: {
                name,
            }
        })
        //se o nome da categoria já existe e o id for diferente do id da categoria que está sendo atualizada
        if (categoryNameExists && categoryNameExists.id != +id) {
            return res.status(400).json({ error: 'Category already exists' })
        }
    }

    await categoryExists.update(
        {
            name, path
        },
        {
            where: {id}
        }

    );



    //retorna o id e o nome da categoria
    return res.status(200).json();

}



//listar todas as categorias
export const categoryAll = async (req, res) =>{
    const category = await Categoty.findAll()
    console.log({userId: req.userId});
    
    return res.json(category)
}

