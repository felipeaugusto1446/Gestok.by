import express, { Request, Response, NextFunction } from "express";
import { router } from './routes'
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from"../swagger.json"
// Importa o Express para criar o servidor
// Importa o roteador definido no arquivo routes.ts

const app = express();
// Cria a aplicação Express (servidor)

const port = 3333;
// Define a porta onde o servidor será executado

app.use(express.json());
// Configura o servidor para aceitar requisições com corpo em formato JSON

app.use(cors());

app.use("/v1", router);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
// Adiciona as rotas definidas em routes.ts ao servidor

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    // Esse é o middleware de tratamento de erros.
    // Ele só é chamado quando alguma rota ou middleware anterior lança uma exceção
    // ou passa um erro para o "next(err)".

    if (err instanceof Error) {
        // Verifica se o erro é uma instância da classe Error
        // (ou seja, um erro comum lançado no código).
        // Nesse caso, retorna status 400 (Bad Request).
        return response.status(400).json({
            error: err.message, // Mostra a mensagem de erro para o cliente
        });
    }
    // Se não for uma instância de Error, significa que o problema não foi tratado diretamente.
    // Aqui é um "catch all" para qualquer erro inesperado.

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.' // Mensagem genérica para não expor detalhes
    })
})

app.listen(port, () => {
    console.log("Servidor rodando na porta 3333 - Projeto Controle de Estoque curso NodeJs")
});
// Inicia o servidor na porta configurada e exibe uma mensagem no console