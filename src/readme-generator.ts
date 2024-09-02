// src/readme-generator.ts

import { FrontendGeneratorConfig, IGenerator, RequestConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class ReadmeGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.frontendConfig = frontendConfig;
        this.requestConfig = requestConfig;
    }
    generate() {
        const content = this.createReadmeContent();
        this.writeFileSync('README.md', content);
    }

    private createReadmeContent(): string {
        return `
# ${this.frontendGeneratorConfig.app}

Este projeto foi gerado automaticamente usando o *mfe-gen*. Ele contém uma estrutura básica para um micro-frontend desenvolvido em React.

## Estrutura de Pastas e Arquivos

A estrutura do projeto gerado será semelhante a esta:

\`\`\`
${this.generateFolderStructure()}
\`\`\`

## Instalação

Para instalar todas as dependências necessárias, execute o comando:

\`\`\`
npm install
\`\`\`

## Uso

Este projeto é um micro-frontend que pode ser integrado em uma aplicação maior usando Single SPA. Aqui estão algumas instruções básicas para começar:

### Executando o Projeto

1. Navegue até o diretório \`${this.frontendGeneratorConfig.outputDir}\`:

\`\`\`
cd ${this.frontendGeneratorConfig.outputDir}
\`\`\`

2. Instale as dependências do projeto gerado:

\`\`\`
npm install
\`\`\`

3. Inicie o projeto:

\`\`\`
npm start
\`\`\`

Isso iniciará a aplicação no modo de desenvolvimento. Geralmente, o projeto será acessível em \`http://localhost:3000\`.

### Estrutura do Código

- **components/**: Contém os componentes React específicos do seu projeto.
- **services/**: Inclui os serviços responsáveis pelas requisições ao back-end.
- **contexts/**: Fornece contextos para gerenciamento de estado global.
- **validations/**: Funções de validação dos dados de entrada.
- **styles/**: Estilização dos componentes.
- **types/**: Tipos e interfaces TypeScript utilizados no projeto.

### Personalização

Sinta-se à vontade para modificar e expandir este projeto conforme necessário para atender às necessidades do seu produto.

---

### Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
`;
    }

    private generateFolderStructure(): string {
        return `
./${this.frontendGeneratorConfig.outputDir}
├── components/
│   └── ${this.frontendGeneratorConfig.app}/
│       ├── index.tsx
│       ├── styles.ts
│       ├── types.ts
├── services/
│   ├──  ${this.frontendGeneratorConfig.app}Service.ts
│   └── ${this.frontendGeneratorConfig.app}Validation.ts
├── contexts/
│   └── ${this.frontendGeneratorConfig.app}Context.tsx
├── .env.development
├── .env.production
├── .env.stage


├── components/
│   └── MyApp/
│       ├── index.tsx
│       ├── styles.ts
│       ├── types.ts
│       ├── MyAppValidation.ts
├── services/
│       ├── MyAppTransformer.ts
│       └── MyAppService.ts
├── contexts/
│   └── MyAppContext.tsx
├── .env.development
├── .env.production
├── .env.stage
├── request-response-metadata.json
├── types.d.ts
├── README.md
        `;
    }
}
