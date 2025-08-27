import express, {Request, Response, NextFunction} from "express";
import { router } from './routes'
// Importa o Express para criar o servidor
// Importa o roteador definido no arquivo routes.ts

const app = express();
// Cria a aplicação Express (servidor)

const port = 3333;
// Define a porta onde o servidor será executado

app.use(express.json());
// Configura o servidor para aceitar requisições com corpo em formato JSON

app.use(router);
// Adiciona as rotas definidas em routes.ts ao servidor

app.listen(port,()=>{
    console.log("Servidor rodando na porta 3333 - Projeto Controle de Estoque curso NodeJs")
});
// Inicia o servidor na porta configurada e exibe uma mensagem no console