// src/types-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class TypesGenerator extends BaseGenerator implements IGenerator {
    constructor(config: FrontendGeneratorConfig) {
        super(config);
    }

    generate() {
        const typeName = `${this.config.app}Props`;  // Define o nome da interface baseada no nome da aplicação

        // Conteúdo do arquivo types.ts
        const typesContent = `
export interface ${typeName} {
    // Defina aqui as props específicas para o componente ${this.config.app}
}
`;

        // Define o caminho para o arquivo types.ts
        const filePath = path.join(this.config.outputDir, `components/${this.config.app}/types.ts`);

        // Cria o diretório caso não exista
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Escreve o conteúdo no arquivo types.ts
        fs.writeFileSync(filePath, typesContent.trim());

        console.log(`Types generated at ${filePath}`);
    }
}
