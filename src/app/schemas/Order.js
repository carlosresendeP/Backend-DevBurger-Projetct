// arquivo responsável pelo schema do pedido


import mongoose from "mongoose";
//criando o schema do pedido
const OrderSchema = new mongoose.Schema({
    //id do pedido gerado automaticamente
    user: {
        id:{
            type: String,
            required: true 
        },
        name:{
            type: String,
            required: true
        },
    },
    //produtos do pedido
    products: [
        {
            id:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },

            category:{
                type: String,
                required: true
            },

            url:{
                type: String,
                required: true
            },
            quantity:{
                type: String,
                required: true
            },
            
        },
    ],
    //status do pedido
    status:{
        type: String,
        required: true
    },
    
},
//timestamps para criar a data de criação e atualização do pedido
{
    timestamps: true
},
);


export default mongoose.model('Order', OrderSchema);