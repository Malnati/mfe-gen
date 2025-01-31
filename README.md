# mfe-gen

Single SPA micro-frontend code generator.

Este repositório contém um conjunto de geradores TypeScript para criar a estrutura de um projeto front-end completo em React, incluindo componentes, estilos, serviços, validações e contextos, bem como para realizar operações baseadas em requisições HTTP semelhantes a comandos CURL.

## Instalação

O *mfe-gen* é um pacote Node.js que pode ser instalado globalmente via npm. O registro está disponível em [@codegenerator/mfe-gen](https://www.npmjs.com/package/@codegenerator/mfe-gen), então você pode instalar o pacote diretamente a partir do NPM.

Para instalar todas as dependências necessárias, execute o comando:

```bash
npm install -g @codegenerator/mfe-gen
```

## Uso

### Geração de Código Front-End

Este gerador funciona realizando uma requisição HTTP ao servidor com base nos parâmetros fornecidos pelo usuário. A resposta desta requisição é utilizada para criar um arquivo JSON de metadados que contém tanto as informações da requisição quanto da resposta. A partir desses metadados, todos os arquivos de código-fonte necessários são gerados.

### Utilizando Metadados para Geração de Arquivos `.env`

Após a criação do arquivo `request-response-metadata.json`, o gerador de arquivos `.env` utiliza essas informações para preencher automaticamente os parâmetros relevantes nos arquivos `.env.development`, `.env.production`, e `.env.stage`. Isso garante que os arquivos `.env` reflitam de forma precisa os ambientes de desenvolvimento, produção e estágio, utilizando dados reais obtidos do back-end.

Por exemplo, os valores das variáveis de ambiente como `VITE_API_URL`, `VITE_DATABASE_URL`, e outros URLs podem ser preenchidos com a URL da requisição realizada. Se os metadados não contiverem todas as informações necessárias, o gerador aplicará valores padrão, garantindo a robustez do processo.

### Geração de Arquivo `types.d.ts`

O gerador também cria automaticamente um arquivo `types.d.ts`, que contém todas as definições de tipos e interfaces necessárias para o micro front-end. Esse arquivo é crucial para garantir a integridade e a segurança dos tipos entre o front-end e o back-end, fornecendo tipagem forte para os dados de requisição e resposta. As interfaces incluem estruturas como `IRequest` e `IResponse`, que são geradas com base nos dados presentes nos metadados.

### Comando de Geração

Para gerar os componentes, serviços, contextos, arquivos de ambiente, estilos, validações, e o `README.md` personalizado de um projeto React, você precisa informar os parâmetros necessários para a requisição e o nome da aplicação. Aqui está um exemplo:

```bash
npm run build && npx ts-node src/main.ts \
  -X 'GET' \
  -U 'https://DOMINIO.COM/api/resource' \
  -H 'Authorization: Bearer XYZ' \
  -a 'MyApp' \
  -o './build' \
  -f 'component,services,context,styles,validation'
```

> **Nota:** Os arquivos `.env`, `types.d.ts`, `request-response-metadata.json`, `package.json`, e `README.md` são gerados automaticamente e não precisam ser especificados nos parâmetros.

> **Nota:** Os arquivos `.env`, `types.d.ts`, `request-response-metadata.json`, `package.json`, e `README.md` são gerados automaticamente e não precisam ser especificados nos parâmetros.

### Parâmetros Suportados

- `--method`: Especifica o método HTTP (GET, POST, PUT, DELETE).
- `--url`: URL do endpoint.
- `--headers`: Cabeçalhos HTTP no formato `"Key: Value"`.
- `--data`: Corpo da requisição (em formato JSON). (opcional)
- `--app`: Nome da aplicação.
- `--outputDir`: Diretório de saída para os arquivos gerados (padrão: `./build`).
- `--components`: Especifica quais componentes gerar (por exemplo, `component,services,styles,validation,context,readme`).
- `--dependencies`: Lista de dependências a serem instaladas. (opcional)
- `--devDependencies`: Lista de devDependencies a serem instaladas. (opcional)

## Estrutura do Projeto Gerado

Após a execução do gerador para código front-end, a estrutura do projeto gerado será semelhante a esta:

```bash
./build
├── components/
│   └── MyApp/
│       ├── index.tsx
│       ├── styles.ts
│       ├── types.ts
│       └── MyAppContext.tsx
├── services/
│       └── MyAppService.ts
├── .env.development
├── .env.production
├── .env.stage
├── request-response-metadata.json
├── types.d.ts
├── README.md
```

> O `package.json` é sempre gerado.

## Executando o Projeto Gerado

Para executar o projeto gerado, use os seguintes comandos:

1. Navegue até o diretório `./build`:
   ```bash
   cd build
   ```

2. Instale as dependências do projeto gerado:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npm start
   ```

Isso iniciará o projeto React utilizando a estrutura gerada.

---

### Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Pré-requisitos

Este gerador assume que você já tem uma estrutura básica de projeto React configurada. Certifique-se de ter o Node.js e o npm instalados em seu ambiente de desenvolvimento.
