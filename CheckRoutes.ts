import fs from "fs";
import fetch from "node-fetch";
import chalk from "chalk";

const baseURL = "http://localhost:3333"; 
const swaggerPath = "./swagger.json";    

async function checkRoutes() {
  console.log(chalk.blue("\n🔍 Verificando rotas do Swagger com o servidor...\n"));

  
  const swagger = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
  const paths = swagger.paths;

  for (const [path, methods] of Object.entries(paths)) {
    for (const [method] of Object.entries(methods as object)) {
      const fullURL = `${baseURL}${path}`;

      try {
        const res = await fetch(fullURL, { method: method.toUpperCase() });
        if (res.status >= 200 && res.status < 400) {
          console.log(chalk.green(`✅ ${method.toUpperCase()} ${fullURL} → ${res.status}`));
        } else {
          console.log(chalk.yellow(`⚠️ ${method.toUpperCase()} ${fullURL} → ${res.status}`));
        }
      } catch (err: any) {
        console.log(chalk.red(`❌ ${method.toUpperCase()} ${fullURL} → ERRO (${err.message})`));
      }
    }
  }

  console.log(chalk.blue("\n✅ Verificação concluída.\n"));
}

checkRoutes();
