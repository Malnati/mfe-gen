// src/styles-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class StylesGenerator extends BaseGenerator implements IGenerator {
    generate() {
        const stylesTemplate = `
        import { makeStyles } from '@material-ui/core/styles';

        export const useStyles = makeStyles({
            container: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            },
            input: {
                padding: '10px',
                fontSize: '16px',
                width: '200px',
                borderRadius: '5px',
                border: '1px solid #ccc',
            },
        });
        `;

        // Definir o caminho do arquivo a ser gerado
        const filePath = path.join(this.config.outputDir, `components/${this.config.app}/styles.ts`);

        // Escrever o arquivo de estilos no sistema de arquivos
        fs.writeFileSync(filePath, stylesTemplate);
        console.log(`Styles generated at ${filePath}`);
    }
}
