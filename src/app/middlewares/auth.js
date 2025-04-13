import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

function authMiddleware(request, response, next){
    //console.log(req.headers.auyhorization);
    /*gera esse 'Bearer bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiZmFmOWUyLWU0ZGMtNDlkOS1hZDQwLWQwYTA4ZDY4NDVmYyIsImlhdCI6MTczNjU1MDY0NSwiZXhwIjoxNzM2NjM3MDQ1fQ.n6DNv9o5rDmqb8x'*/

    //pegando o token
    const authToken = request.headers.authorization;
    //verificando se o token foi passado
    if(!authToken){
        return response.status(401).send({error: 'Token not provided'});
    }

    //verificando se o token é valido
    //split separa o token em 2 partes, o 'Bearer' e o token
    //split é um array, o at(0) pega o primeiro elemento do array
    //pegando o token sem o 'Bearer'
    const token = authToken.split(' ').at(1); 

    try{
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err){
                throw new Error();
            }

            request.userId = decoded.id;
            request.userName = decoded.name;

            console.log(decoded);
            
            
    });
    }catch(err){
        return response.status(401).send({error: 'Token invalid'});
    };

    return next();


}

export default authMiddleware;