import express from "express"
import Routes from "./routes.js"
import { resolve } from 'node:path'
import cors from 'cors'

import './database/index.js'

const app = express();

app.use(cors('http://localhost:5173/')); //crie uma whitelist para o cors depois que o projeto estiver pronto

app.use(express.json());

app.use(
    '/product-file',
    express.static(resolve('uploads'))
)

app.use(
    '/category-file',
    express.static(resolve('uploads'))
)

//mantenha o use routes abaixo do use express.json
app.use(Routes);

export default app

/*
class App {
    constructor() {
        this.app = express();

        this.app.use(cors('http://localhost:5173/'));
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(
            '/product-file',
            express.static(resolve('uploads'))
        );

        this.app.use(
            '/category-file',
            express.static(resolve('uploads'))
        );
    }

    routes() {
        this.app.use(Routes);
    }
}

export default new App().app;*/