//login do usuário
import * as yup from 'yup';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const sessionController = async (req, res) => {


    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })



    const isValid = await schema.isValid(req.body); //vai validar os dados que estão no req.body

    //caso o email ou a senha não sejam válidos, vai retornar uma mensagem de erro
    const emailOrPassword = ()=>{
        return res.status(401).json({ error: 'Make sure your email or password are correct' })
    }

    //caso os dados não sejam válidos
    if (!isValid) {
        return emailOrPassword();
    }

    const { email, password } = req.body; //pegando os dados do req.body

    //verificar se o email do usuário existe
    const user = await User.findOne({
        where: {
            email,
        }
    });

    if (!user) {
        return emailOrPassword();
    }


    const isSamePassword = await user.checkPassword(password);
    //retorna true ou false no console dizendo se a senha é a mesma
    if (!isSamePassword){
        return emailOrPassword();
    }

    return res.status(201).json({ 
        id: user.id,
        name: user.name,
        email,
        admin: user.admin,
        token: jwt.sign({id: user.id, name:user.name},authConfig.secret, {expiresIn: authConfig.expiresIn})
    }) 

}

export default sessionController;

//token : gsdyukhsgyf. yhasvyhfasgh. ysvfySGYF
//token é uma string que é gerada e que é usada para autenticar o usuário
/*TOKEN hearder. pyload . chave que valida o token*/

//gerar a chave é no site md5 generate