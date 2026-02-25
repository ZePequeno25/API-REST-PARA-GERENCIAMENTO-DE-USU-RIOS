// start.js - Script pra instalar dependências e rodar o servidor automaticamente

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Cores pro terminal (pra ficar mais bonito)
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}Iniciando setup da API de usuários...${colors.reset}\n`);

// Função pra executar comandos e mostrar saída
function runCommand(command, successMsg, errorMsg) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.yellow}> ${command}${colors.reset}`);
    
    const child = exec(command, { cwd: __dirname });
    
    child.stdout.on('data', (data) => {
      console.log(data.toString().trim());
    });
    
    child.stderr.on('data', (data) => {
      console.error(data.toString().trim());
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`${colors.green}${successMsg}${colors.reset}\n`);
        resolve();
      } else {
        console.error(`${colors.red}${errorMsg} (código ${code})${colors.reset}`);
        reject(new Error(errorMsg));
      }
    });
  });
}

// Passo 1: Verifica se package.json existe, se não, cria com npm init -y
async function setup() {
  try {
    if (!fs.existsSync('package.json')) {
      await runCommand(
        'npm init -y',
        'package.json criado com sucesso!',
        'Erro ao criar package.json'
      );
    }

    // Passo 2: Instala as dependências
    await runCommand(
      'npm install express sqlite3',
      'Dependências instaladas com sucesso! (express + sqlite3)',
      'Erro ao instalar dependências'
    );

    // Passo 3: Verifica se o app.js existe antes de rodar
    const appPath = path.join(__dirname, 'src', 'app.js');
    if (!fs.existsSync(appPath)) {
      console.error(`${colors.red}Arquivo src/app.js não encontrado! Certifique-se que a estrutura está correta.${colors.reset}`);
      process.exit(1);
    }

    // Passo 4: Roda o servidor
    console.log(`${colors.cyan}Tudo pronto! Iniciando o servidor...${colors.reset}\n`);
    console.log(`${colors.green}API rodando em http://localhost:3000${colors.reset}\n`);

    // Executa o node src/app.js
    const server = exec('node src/app.js', { cwd: __dirname });
    
    server.stdout.on('data', (data) => {
      console.log(data.toString().trim());
    });
    
    server.stderr.on('data', (data) => {
      console.error(data.toString().trim());
    });
    
    server.on('close', (code) => {
      console.log(`${colors.yellow}Servidor finalizado (código ${code})${colors.reset}`);
    });

  } catch (err) {
    console.error(`${colors.red}Setup interrompido por erro: ${err.message}${colors.reset}`);
    process.exit(1);
  }
}

// Roda tudo
setup();