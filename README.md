# Voltsinsight

**Voltsinsight** é uma solução inovadora para gerenciar faturas de energia elétrica. O projeto extrai dados das faturas, organiza essas informações em um banco de dados PostgreSQL e disponibiliza os dados por meio de uma API. A aplicação web, desenvolvida com React, permite que os usuários visualizem e analisem suas faturas de forma clara e eficiente.

## Funcionalidades

- **Extração Automática de Dados**: Extrai dados relevantes das faturas de energia elétrica automaticamente.
- **Organização em Banco de Dados**: Armazena os dados extraídos em um banco de dados PostgreSQL para fácil acesso e análise.
- **API para Acesso aos Dados**: Disponibiliza uma API robusta para acessar e manipular os dados armazenados.
- **Visualização e Análise de Faturas**: Fornece uma interface web intuitiva, desenvolvida com React, para visualização e análise detalhada das faturas através de tabelas, gráficos e filtros.

## Tecnologias Utilizadas

- **Backend**: Node.js, Fastify, Prisma ORM e TypeScript
- **Frontend**: React, Tailwind CSS, ShadcnUI, Axios, React Query, Recharts, React Table e TypeScript
- **Banco de Dados**: Neon Database (PostgreSQL)
- **API**: RESTful API

## Como Executar o Projeto

### Pré-requisitos

- Node.js
- PostgreSQL
- Yarn ou NPM

### Passos para Execução

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/voltsinsight.git
   cd voltsinsight

2. **Instale as Dependências:**
   ```bash
   yarn
   # ou
   yarn install
   # ou
   npm install

3. **Instale as Dependências:**
   - Certifique-se de que o PostgreSQL esteja instalado e em execução.
   - Crie um banco de dados e configure as credenciais no arquivo .env.

4. **Inicie o Servidor:**
   ```bash
   yarn dev
   
5. **Acesse a Aplicação Web:**
   - Abra o navegador e acesse `http://localhost:3000`.
  
## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorar o projeto.
