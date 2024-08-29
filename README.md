Aqui está o README atualizado para refletir as mudanças feitas no gerador:

---

# mfe-gen

Single SPA micro-frontend code generator.

Este repositório contém um conjunto de geradores TypeScript para criar a estrutura de um projeto front-end completo em React, incluindo componentes, estilos, hooks, serviços, validações e contextos, bem como para realizar operações baseadas em requisições HTTP semelhantes a comandos CURL.

## Instalação

O *mfe-gen* é um pacote Node.js que pode ser instalado globalmente via npm. O registro está disponível em [@codegenerator/mfe-gen](https://www.npmjs.com/package/@codegenerator/mfe-gen), então você pode instalar o pacote diretamente a partir do NPM.

Para instalar todas as dependências necessárias, execute o comando:

```bash
npm install -g @codegenerator/mfe-gen
```

## Uso

### Geração de Código Front-End

Este repositório contém vários geradores para criar diferentes partes de um projeto React. Aqui está uma breve descrição de como invocar os geradores:

```bash
mfe-gen \
    --component "CPFInput" \
    --outputDir "./build" \
    --include "index,styles,hooks,types,service,validation,context"
```

### Executando Requisições HTTP Similares ao CURL

Você também pode utilizar o *mfe-gen* para executar operações baseadas em requisições HTTP, utilizando uma sintaxe similar ao CURL:

```bash
mfe-gen \
    --method POST \
    --url "https://DOMINIO.COM/api/resource" \
    --headers "Authorization: Bearer XYZ" \
    --data '{"key": "value"}'
```

#### Parâmetros Suportados

- `--method`: Especifica o método HTTP (GET, POST, PUT, DELETE). Padrão: `GET`.
- `--url`: URL do endpoint.
- `--headers`: Cabeçalhos HTTP no formato `"Key: Value"`.
- `--data`: Corpo da requisição (em formato JSON).
- `--outputDir`: Diretório de saída para os arquivos gerados.
- `--include`: Especifica quais componentes gerar (por exemplo, `index,styles,hooks,types,service,validation,context`).

## Estrutura do Projeto Gerado

Após a execução do gerador para código front-end, a estrutura do projeto gerado será semelhante a esta:

```bash
./build
├── components/
│   └── CPFInput/
│       ├── index.tsx
│       ├── styles.ts
│       ├── hooks.ts
│       ├── types.ts
├── services/
│   └── CPFService.ts
├── validations/
│   └── CPFValidation.ts
├── transformers/
│   └── CPFTransformer.ts
├── contexts/
│   └── ModalContext.tsx
```

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
