// src/readme-generator.ts

import * as fs from 'fs';
import * as path from 'path';
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
        const filePath = path.join(this.config.outputDir, 'README.md');
        fs.writeFileSync(filePath, content);
        console.log(`README generated at ${filePath}`);
    }

    private createReadmeContent(): string {
        return `
# ${this.config.app}

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

1. Navegue até o diretório \`${this.config.outputDir}\`:

\`\`\`
cd ${this.config.outputDir}
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
- **hooks/**: Contém hooks personalizados utilizados nos componentes.
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
./${this.config.outputDir}
├── components/
│   └── ${this.config.app}/
│       ├── index.tsx
│       ├── styles.ts
│       ├── hooks.ts
│       ├── types.ts
├── services/
│   └── ${this.config.app}Service.ts
├── validations/
│   └── ${this.config.app}Validation.ts
├── contexts/
│   └── ${this.config.app}Context.tsx
├── .env.development
├── .env.production
├── .env.stage
        `;
    }
}
