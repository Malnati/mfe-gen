// src/base-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { FrontendGeneratorConfig } from "./interfaces";

export abstract class BaseGenerator {
    protected frontendGeneratorConfig: FrontendGeneratorConfig;

    constructor(config: FrontendGeneratorConfig) {
        this.frontendGeneratorConfig = config;
    }

    abstract generate(): void;

    protected writeFileSync(relativePath: string, content: string) {
        const filePath = path.join(this.frontendGeneratorConfig.outputDir, relativePath);

        try {
            // Criar o diretório se não existir
            fs.mkdirSync(path.dirname(filePath), { recursive: true });

            // Escrever o conteúdo no arquivo
            fs.writeFileSync(filePath, content);
            console.log(`${path.basename(filePath)} generated at ${filePath}`);
        } catch (error) {
            console.error(`Error writing file at ${filePath}: ${error}`);
        }
    }

    protected loadMetadata(): any {
        try {
            const metadataPath = path.join(this.frontendGeneratorConfig.outputDir, 'request-response-metadata.json');
            const metadata = fs.readFileSync(metadataPath, 'utf-8');
            return JSON.parse(metadata);
        } catch (error) {
            console.error("Failed to load metadata:", error);
            return null;
        }
    }
}
