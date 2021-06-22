# CRUDizão da massa - NWL Together

## Documentação da trilha NODEJS.

### Passo a passo do projeto.

1. Comando '**yarn init -y**'

- isso vai criar uma arquivo json, e seria de onde começa todo o projeto.

### inserindo dependências.

1. Comando '**yarn add typescript -D**'

- Essa dependências adiciona o typescript ao projeto.
- O **-D**, defini as dependências como dependências de desenvolvimento.
- Comando '**yarn tsc --init**'
- Esse comando inicia o **typescript**.
- Comando '**yarn tsc**'
- Esse comando converte o código para javascript puro.

2. Comando '**yarn add express**'

- Esse comando adiciona a biblioteca do **express** ao projeto.
- Comando '**yarn add @types/express -D'**.
- Esse comando adiciona as tipagens ao **express**.
- O **@type/** serve para adicionar as tipagens de alguma lib.
- Apos instalar a lib do **express**, criar uma pasta **SRC** na raiz do projeto.

3. Comando '**yarn add ts-node-dev -D**'

- Esse comando adiciona a lib do **ts-node-dev**, equivalente ao **nodemon**.

```ts
// Servidor inicializado.
import express from "express";
const app = express();
app.listen(3000, () => console.log("Sever is runnig..."));
```

- Adicione isso ao arquivo **package.json**.

```json
 "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },

  // Apos adicionar, digite no terminal
  // yarn dev
// o retorno deve ser esse.

// yarn run v1.22.5
// $ ts-node-dev src/server.ts
// [INFO] 20:52:18 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.3.4)
// Sever is runnig...
```

### Metodos usados em um CRUD.

**C**reate,
**R**ead,
**U**pdate,
**D**elete.

- GET => Busca uma informacao
- POST => Inserir (Criar) uma informacao
- PUT => Altera uma informacao
- DELETE => Remove um dado
- PATCH => Altera uma informacao especifica
