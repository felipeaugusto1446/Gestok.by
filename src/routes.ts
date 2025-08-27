import { Router, Request, Response } from 'express';
// Importa o Router do Express (para agrupar rotas)
// Request e Response são tipos do TypeScript, usados apenas para tipar os parâmetros

const router = Router();
// Cria uma instância do roteador, que será usada para registrar as rotas

router.get('/test', (request: Request, response: Response) => {
  // Define uma rota GET acessível em http://localhost:3333/test
  // A função de callback é executada sempre que essa rota for chamada

  return response.json({ ok: true });
  // Retorna uma resposta em formato JSON
});

export { router };
// Exporta o roteador para que ele possa ser utilizado em outros arquivos
