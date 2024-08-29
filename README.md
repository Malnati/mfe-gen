# mfe-gen

Single SPA micro-frontend code generator.

Este repositório contém um conjunto de geradores TypeScript para criar a estrutura de um projeto front-end completo em React, incluindo componentes, estilos, hooks, serviços, validações e contextos.

## Instalação

O *react-gen* é um pacote Node.js que pode ser instalado globalmente via npm. O registro está disponível em [@codegenerator/mfe-gen](https://www.npmjs.com/package/@codegenerator/mfe-gen), então você pode instalar o pacote diretamente a partir do NPM.

Para instalar todas as dependências necessárias, execute o comando:

```bash
npm install -g @codegenerator/mfe-gen
```

## Uso

Este repositório contém vários geradores para criar diferentes partes de um projeto React. Aqui está uma breve descrição de cada gerador:

```bash
npm run build && \
    npx ts-node src/main.ts \
                    --component "CPFInput" \
                    --outputDir "./build" \
                    --include "index,styles,hooks,types,service,validation,context"
```

## Executando o Gerador

Para executar o gerador e criar toda a estrutura do projeto, use o comando `mfe-gen`:

```bash
react-gen \
    --component "CPFInput" \
    --outputDir "./build" \
    --include "index,styles,hooks,types,service,validation,context"
```

Este comando executará todos os geradores na ordem correta e copiará os arquivos estáticos para o diretório de destino.

## Estrutura do Projeto Gerado

Após a execução do script, a estrutura do projeto gerado será semelhante a esta:

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
