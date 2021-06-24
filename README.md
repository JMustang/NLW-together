# CRUDizão da massa - NWL Together

## Documentação da trilha NODEJS.

### Passo a passo do projeto.

1. Comando '**yarn init -y**'

- isso vai criar uma arquivo json, e seria de onde começa todo o projeto.

### inserindo dependências.

1. Comando '**yarn add typescript -D**'

### Configurando o tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": false,
    "strictPropertyInitialization": false,
    "esModuleInterop": true ,
    "experimentalDecorators": true,
     "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
```

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

### Tipos de parâmetros.

1. Routes Params: http://localhost:3000/exemplos/13049871240981674087234630847

- Routes Params sao parâmetros que fazem parte da rota

2. Query Params:

- São parâmetros que fazem parte de uma query,
  utilizamos quando queremos fazer um filtro, quando queremos buscar algo. A diferença entre query e routes params, query são parâmetros não obrigatórios e eles não são explícitos.

3. Body Params:

- São os parâmetros utilizados nos métodos post, put ou patch, são parâmetros que vão no corpo da requisição.

### Bancos de dados.

1. SQLite

- SQLite sera o banco de dados utilizado na aplicação.
- Comando '**yarn add sqlite3 --save**'
- crie uma pasta dentro de **src** de nome **database** e dentro de **database** crie o arquivo **index.ts**, dentro de **index.ts** ponha.

```ts
import { createConnection } from "typeorm";
createConnection();
```

2. ORM => TypeORM

- ORM (**Object Relational Mapper**) é uma técnica de mapeamento objeto relacional que permite fazer uma relação dos objetos com os dados que os mesmos representam, ele fazes a integração da aplicação com o banco de dados sem a necessidade de criar códigos em SQL.
- Comando '**yarn add typeorm --save**'
- Crie um novo arquivo na pasta **src** com o nome **ormconfig.json** e adicione isso.

```json
{
  "type": "sqlite",
  "database": "src/database/database.sqlite",
  "migrations": ["src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "src/database/migrations",
    "entitiesDir": "src/entity"
  }
}
```

3. Reflect-metadata

- reflect-metadata permite os decoreitos no código.

```ts
import "reflect-metadata";
```

- Apos as configurações acima, se você não estiver com o **ts-node-dev** rodando, de um **yarn dev** e o banco de dados sera criado na pasta **database**.

### Configurando as Migrations.

- Migrations seria o controle de versionamento de tabelas dentro do banco de dados, permite que você mantenha um registro das mudanças feitas no banco de dados em termos de migrações de dados que são versionadas em conjunto com o código fonte da aplicação.

1. Comando '**yarn typeorm migration:create -n CreateUsers**'

- Esse comando cria uma migration de nome **CreateUsers**, dentro desse arquivo criaremos a tabela do banco de dados.

- A migration ficara assim:

```ts
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1624482127636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "admin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
```

2. Comando '**yarn typeorm migration:run**'

- Esse comando faz rodar as migrations e cria a tabela dentro do banco de dados.

3. Comando '**yarn typeorm migration:revert**'

- Esse comando remove as migrations.

### Criando entidades

- Entidades, são instâncias de tipos de entidades como Clientes, Produtos os quais estão estruturados em registros e chaves.
- Uma entidade seria como uma tabela, entao, quando criamos a entidade **User** criamos a tabela **User**.

1. Comando '**yarn typeorm entity:create -n User**'

- Esse comando ira criar a entidade **User**.

- Como ficara a entidade.

```ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  admin: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { User };
```

2. Comando '**yarn add uuid**'

- Esse comando adiciona a dependência da **uuid** na aplicação.

3. Comando '**yarn add @types/uuid -D**'

- Adicona as tipagens da dependência **uuid**.
