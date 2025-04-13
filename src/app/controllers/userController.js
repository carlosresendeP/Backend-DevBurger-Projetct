/*
    store: cadastrar/adicionar
    index: listar varios
    show: listar um
    update: atualizar
    delete: deletar
*/
import { v4 } from "uuid"; //v4 é uma função que gera um id único


//yup é uma biblioteca para validação de dados
import * as yup from 'yup'; //vai importar todas as funções do yup



import User from "../models/user.js";

//criando um schema para validar os dados
const userController = async (req, res) => {

    const schema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        admin: yup.boolean(),

    })

    /*
    //validando os dados

    //isValid vai retornar true ou false
    const isValid = await schema.isValid(req.body); //vai validar os dados que estão no req.body

    console.log(isValid);

    //se não for válido, vai retornar um erro
    if (!isValid) {
        return res.status(400).json({ error: "Make sure all fields are correct" })
    }
    */


    //validando os dados
    try {
        await schema.validate(req.body, { abortEarly: false }); //abortEarly: false vai retornar todos os erros de uma vez
    } catch (error) {
        return res.status(400).json({ error: error.errors })
    }

    //se passar pela validação, vai criar um novo usuário
    const { name, email, password, admin } = req.body;

    //verificar se o usuário já existe
    const userExists = await User.findOne({ 
        where: { 
            email,
        }
    });

    /*
    null, undefined = false
    {},[], 1 = true
    */

    if  (userExists) {
        return res.status(409).json({ error: "User already exists" })
    }

    //criando um novo usuário
    const user = await User.create({
        id: v4(),
        name,
        email,
        password,
        admin,
    });

    return res.status(201).json({
        id: user.id,
        name,
        email,
        admin,
    })

    


};

export default userController