# WAD.md - Documentação Técnica

## Nome do Projeto

SambaPass – Plataforma web para exibição de eventos e venda de ingressos via WhatsApp

---

 ## Estrutura Técnica

##### Backend: 
* Node.js com Express.js

##### Frontend: 
* EJS (Embedded JavaScript Templates)

##### Banco de Dados: 
* Supabase (PostgreSQL + Storage + Autenticação)

##### Arquitetura: 
* MVC (Model-View-Controller)
---
## Funcionalidades Implementadas

* Listagem de cidades com eventos disponíveis
* Integração frontend-backend com Fetch API:
  * Exclusão de eventos no painel admin utilizando `fetch()` + método `DELETE`
  * Carregamento dinâmico dos eventos na tela `/eventos/:cidade`, com suporte a filtros via query string (`?cidade=sp`, `?cidade=reveillon`)


* Visualização de eventos por cidade

* Página individual do evento com imagem, descrição, data, local e botão de compra via WhatsApp
* Categoria exclusiva para Réveillons
##### Painel administrativo com:

* Login de administrador com proteção de rotas

* Dashboard com resumo de cidades e eventos

* CRUD completo de eventos (criação, edição e exclusão)

* Upload de imagem via URL manual (sem Cropper.js)

* Estilização responsiva com base em paleta verde escuro da marca e CSS externo modularizado (cada view tem seu próprio arquivo `.css` em `/public/css/`)

---
## Decisões Técnicas

* Supabase escolhido pela facilidade de integração com Node.js e suporte a storage

* Express + EJS por simplicidade na renderização do frontend server-side

* Organização em MVC para separar responsabilidades e facilitar manutenção


---





## Banco de Dados

O banco de dados é hospedado no Supabase e contém duas tabelas principais:

![Banco de dados](assets/modelo-banco.png)

* `users`: email, name, password (hash)
* `events`: id, nome, descricao, data, local, cidade, imagem\_url, whatsapp\_link
---
#### Modelo Físico

O modelo físico do banco de dados é implementado diretamente no Supabase, utilizando duas tabelas principais: admins e events.

##### Abaixo está o script SQL de criação:
```sql
-- USERS
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EVENTS
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  data TIMESTAMP WITH TIME ZONE,
  local TEXT,
  cidade TEXT,
  imagem_url TEXT,
  whatsapp_link TEXT
);
```

#### Cada tabela contém os seguintes campos:

 ```
 users
id: Identificador único (BIGINT, PK)
name: Nome do administrador (TEXT)
email: E-mail único (TEXT)
password: Senha criptografada (TEXT)
created_at: Data de criação automática (TIMESTAMP)

events
id: Identificador único (UUID, PK)
nome: Nome do evento (TEXT)
descricao: Descrição completa do evento (TEXT)
data: Data e hora do evento (TIMESTAMP WITH TIME ZONE)
local: Local onde ocorrerá (TEXT)
cidade: Cidade do evento (TEXT)
imagem_url: URL da imagem no Supabase Storage (TEXT)
whatsapp_link: Link para redirecionar compra no WhatsApp (TEXT)
```
---

## Arquitetura MVC

* O projeto segue a arquitetura MVC (Model-View-Controller), separando de forma clara a lógica de negócio, apresentação e acesso a dados:

*  Model: abstração do acesso aos dados, feita por meio do Supabase.

* Controllers: camada responsável por lidar com as requisições HTTP, manipular os dados (via Supabase) e decidir qual view renderizar.

* Views: páginas construídas com templates EJS, renderizadas no servidor com os dados dinâmicos.
---
## Diagrama de Arquitetura MVC

O projeto segue a arquitetura MVC (Model-View-Controller), conforme ilustrado abaixo:



![Diagrama MVC](assets/Arquitetura_MVC.png)


### Fluxo MVC:

1. O usuário acessa uma rota.

2. A controller associada executa a lógica da aplicação.

3. Os dados são buscados e manipulados via Supabase (model).

4. A view EJS é renderizada com os dados e enviada como resposta.





---

## Endpoints Disponíveis

### Rotas da Aplicação

| Método | Rota                            | Ação                                                                 |
|--------|---------------------------------|----------------------------------------------------------------------|
| GET    | `/`                             | Tela inicial (listar cidades e destaques de Réveillon)              |
| GET    | `/eventos`                      | Listar todos os eventos (sem filtro)                                |
| GET    | `/eventos/:cidade`              | Listar eventos por cidade ou categoria (ex: /eventos/reveillon)     |
| GET    | `/evento/:id`                   | Ver detalhes de um evento individual                                |
| GET    | `/admin/login`                  | Tela de login do administrador                                      |
| POST   | `/admin/login`                  | Efetuar login                                                       |
| GET    | `/admin/dashboard`              | Painel de resumo geral (eventos e cidades)                          |
| GET    | `/admin/eventos`                | Listar eventos cadastrados (modo admin)                             |
| GET    | `/admin/eventos/novo`           | Formulário para cadastrar novo evento                               |
| POST   | `/admin/eventos`                | Criar novo evento                                                   |
| GET    | `/admin/eventos/:id/editar`     | Formulário de edição de evento                                      |
| POST   | `/admin/eventos/:id`            | Atualizar dados de um evento existente                              |
| POST   | `/admin/eventos/:id/deletar`    | Excluir evento via formulário tradicional                           |
| DELETE | `/admin/eventos/:id`            | Excluir evento via integração Fetch API (JSON)                      |
| GET    | `/admin/logout`                 | Logout do admin e redirecionamento para tela de login               |

---

## Acesso ao Painel de Administradores

Para acessar o painel de administrador, utilize o seguinte login padrão:

* **Email:** [teste@gmail.com](mailto:teste@gmail.com)
* **Senha:** admin123

---

## Gerar Senha Hash para Admin

```js
const bcrypt = require('bcryptjs');
const senha = 'admin123';
bcrypt.hash(senha, 10).then(hash => console.log(hash));
```

Insira o hash gerado manualmente na tabela `users` do Supabase.

---

## Execução Local

```bash
# Clonar o repositório
$ git clone https://github.com/seu_usuario/Projeto_Individual_final.git

# Instalar dependências
$ npm install

# Rodar servidor
$ node server.js

# Acessar via navegador
http://localhost:3000
```
---
## Principais Aprendizados e Desafios

* Integração com Supabase e manipulação de imagens no backend

* Implementação de autenticação protegida com express-session

* Tratamento de erros e feedback visual para ações administrativas

* Melhoria do design para responsividade e usabilidade com CSS puro
---
##  O que Funcionou Bem

* Listagem e filtragem de eventos por cidade e também pela categoria Réveillon.

* Estrutura clara de rotas protegidas e públicas

* CRUD de eventos funcional e intuitivo
---
## Melhorias Recentes Aplicadas

* Separação de estilos CSS em arquivos externos
* Integração front-back com JavaScript assíncrono (`fetch`)
* Uso da camada `models/` para abstração de acesso ao Supabase

--- 

## O que Pode Melhorar Futuramente

* Substituir input manual de imagem por upload via arquivo

* Melhorar feedback visual com loading states e mensagens de confirmação

* Adicionar suporte a múltiplos administradores e níveis de permissão


---

## Considerações Finais

* O projeto é modular e pode ser expandido com novos recursos

* Possui design moderno e responsivo inspirado em sites como Apple e Google
---

## Estrutura de Pastas do Projeto

PROJETO_INDIVIDUAL/
├── assets/                  # Imagens e diagramas usados na documentação
├── config/                  # Configuração de acesso ao Supabase
│   └── database.js
├── controllers/             # Camada de controle (Controllers do MVC)
│   ├── AdminController.js
│   ├── AuthController.js
│   ├── EventController.js
│   └── HomeController.js
├── middlewares/            # Middlewares como autenticação
│   └── authMiddleware.js
├── models/                 # Modelos que abstraem o Supabase (Model do MVC)
│   ├── Event.js
│   └── User.js
├── public/                 # Arquivos estáticos servidos ao navegador
│   ├── css/                # CSS externo por view
│   │   ├── admin.css
│   │   ├── dashboard.css
│   │   ├── eventos.css
│   │   ├── eventos_indi.css
│   │   ├── form_evento.css
│   │   ├── home.css
│   │   ├── login.css
│   │   
│   └── js/
│       └── main.js         # JS frontend para carregamento dinâmico dos eventos
├── routes/                 # Arquivos de rotas (Express Router)
│   ├── adminRoutes.js
│   └── index.js
├── services/               # Lógica de serviço para manipulação de dados
│   └── eventService.j
├── utils/                  # Funções utilitárias como gerar hash
│   └── gerarHash.js
├── views/                  # Templates EJS (Views do MVC)
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── form_evento.ejs
│   │   ├── gerenciar_eventos.ejs
│   │   └── login.ejs
│   ├── eventos.ejs
│   ├── eventos_indi.ejs
│   └── home.ejs
├── .env                    # Variáveis de ambiente 
├── .gitignore              # Arquivos a ignorar no Git
├── package.json
├── package-lock.json
├── server.js               # Arquivo principal da aplicação
├── README.md
└── WAD.md
