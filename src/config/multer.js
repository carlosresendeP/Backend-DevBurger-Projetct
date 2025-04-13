import multer from "multer";
import { v4 } from "uuid";
import {resolve, extname} from 'node:path'


/*export default{
    // Configura o armazenamento dos arquivos usando o método diskStorage do multer
    Storage: multer.diskStorage({
        
        // Define o diretório de destino onde os arquivos serão armazenados
        //destination:resolve(__dirname, 'uploads'),
        destination:(req, file, cb)=>{
            cb(null, resolve('uploads'));
        },
        
        // Define o nome do arquivo que será salvo
        filename: (request, file, callback )=> // Gera um nome único para o arquivo usando v4() e adiciona a extensão original do arquivo
            callback(null, v4()+ extname(file.originalname))
    })
}
*/


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, resolve('uploads'));
    },
    // Define o nome do arquivo que será salvo
    filename: (request, file, callback )=> // Gera um nome único para o arquivo usando v4() e adiciona a extensão original do arquivo
        callback(null, v4()+ extname(file.originalname))
})

const upload = multer({storage})

export default upload