//esse arquivo é responsável por criar um pedido, ele vai receber um array de produtos e vai retornar um pedido com os produtos e o usuário que fez o pedido

import * as yup from 'yup'
import Order from '../schemas/Order.js'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import User from '../models/user.js'

export const OrderController = async (req, res) => {

    //validando os dados
    const schema = yup.object({
        //va em products e pegue um array de objetos "de" (of), apenas usaremeos o id e a quantidade
        products: yup.array().required().of(yup.object({
            id: yup.number().required(),
            quantity: yup.number().required(),
        })),
    })

    //verifica se tem erro
    try {
        await schema.validate(req.body, { abortEarly: false }); //abortEarly: false vai retornar todos os erros de uma vez
    } catch (error) {
        return res.status(400).json({ error: error.errors })
    }

    //salvando no banco
    const { products } = req.body;

    //pegando apenas os ids dos produtos
    const productsIds = products.map(product => product.id);

    //buscar dados no banco
    const findProducts = await Product.findAll({
        where: {
            id: productsIds,
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['name'],
            },
        ],
    });

    //formatando os produtos para o pedido
    const formattedProducts = findProducts.map(product => {

        //pegando o index do produto para pegar a quantidade do item
        //findindex é uma função que retorna o index do item
        //isso verifica se o id do produto é igual ao id do produto para pegar a quantidade
        const productIndex = products.findIndex(item => item.id === product.id);

        const newProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category.name,
            url: product.url,
            quantity: products[productIndex].quantity, //pegando a quantidade do produto com base no index
        }
        return newProduct;
    })


    //criando o pedido com os produtos formatados
    const order = {
        user: {
            id: req.userId,
            name: req.userName
        },
        products: formattedProducts,
        status: 'Pedido Realizado',

    };

    //criando o pedido no banco
    const createdOrder = await Order.create(order);

    return res.status(201).json(createdOrder);


}


//função para buscar todos os pedidos
export const OrdersAll = async (req, res) =>{
    
    const orders = await Order.find();

    return res.json(orders);
}

//função para atualizar o status do pedido
export const UpdateOrder = async (req, res) => {
    const schema = yup.object({
        status: yup.string().required(),
    });

    //verifica se tem erro
    try {
        await schema.validate(req.body, { abortEarly: false }); 
    } catch (error) {
        return res.status(400).json({ error: error.errors })
    }

        //verifica se o usuário é admin
    //findBk é uma função do sequelize que busca um usuário pelo id
    const {admin: isAdmin} = await User.findByPk(req.userId)
    if (!isAdmin){
        return res.status(401).json()
    }


    const {id} = req.params; //pegando o id do pedido
    const {status}= req.body; //pegando o status do pedido


    try{
        //verificar se o status é válido
        //updateOne é uma função do mongoose que atualiza um item
        await Order.updateOne({_id: id}, {status});
    }catch(err){
        return res.status(400).json({error: err.message});
    }

    return res.json({message: 'Status updated sucessfully'});
}
