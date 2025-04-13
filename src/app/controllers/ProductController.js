import * as yup from 'yup'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import User from '../models/user.js'

//função para criar um produto
export const productsController = async(req, res) =>{

    const schema = yup.object({
        name: yup.string().required(),
        price: yup.number().required(),
        category_id: yup.number().required(),
        offer: yup.boolean(),
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



    //salvando no banco
    const {file} = req;
    const { filename: path } = file;
    const {name, price, category_id, offer} = req.body;
    //console.log(file); // Exibe o nome do arquivo
    //console.log(path); // Exibe o caminho do arquivo
    const product = await Product.create({
        name,
        price,
        category_id,
        path,
        offer,
    });


    return res.status(201).json(product)

}

//função para listar todos os produtos
export const productsAll = async (req, res) =>{
    //retornando todos os produtos
    const products = await Product.findAll({ 
        include: { //incluindo a categoria
            model: Category, as: "category", attributes: ["id", "name"] 
        },
    })
    console.log({userId: req.userId});
    
    return res.json(products)
}


//função para fazer o update de um produto
export const productsUpdate = async(req, res) =>{

    const schema = yup.object({
        name: yup.string(),
        price: yup.number(),
        category_id: yup.number(),
        offer: yup.boolean(),
    })

    //verifica se tem erro
    try {
        await schema.validate(req.body, { abortEarly: false }); 
    } catch (error) {
        return res.status(400).json({ error: error.errors })
    }

    //verifica se o usuário é admin
    const {admin: isAdmin} = await User.findByPk(req.userId)
    if (!isAdmin){
        return res.status(401).json()
    }

    //pegando o id do produto e verificando se ele existe
    const {id} = req.params;

    const findProduct = await Product.findByPk(id);

    if (!findProduct){
        return res.status(404).json({error: 'Make sure your product ID is correct'})
    }


    //Nao deixar obrigatorio todos os campos para atualizar
    //deixando a variavel path opcional
    let path;
    if (req.file){
        path = req.file.filename;
    }
    
    //atualizando o produto
    const {name, price, category_id, offer} = req.body;

    await Product.update({
        name,
        price,
        category_id,
        path,
        offer,
    },
    {
        where: {id}
    });

    //fazer update onde o id é igual ao id do produto


    return res.status(201).json()

}