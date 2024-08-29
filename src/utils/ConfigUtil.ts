// src/utils/ConfigUtil.ts

import { Command } from 'commander';
import { RequestConfig, FrontendGeneratorConfig } from '../interfaces';

export class ConfigUtil {

    public static getConfigs(): { requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig } {
        const program = new Command();

        program
            .option('-X, --method <type>', 'Método HTTP (GET, POST, PUT, DELETE)', 'GET')
            .option('-U, --url <type>', 'URL do endpoint')
            .option('-H, --headers <type>', 'Cabeçalhos HTTP no formato "Key: Value"', (value, previous) => {
                const [key, val] = value.split(':').map(v => v.trim());
                return { ...previous, [key]: val };
            }, {})
            .option('-d, --data <type>', 'Corpo da requisição (JSON)', '')
            .option('-a, --app <type>', 'Nome da aplicação')
            .option('-o, --outputDir <type>', 'Diretório de saída para os arquivos gerados', './build')
            .option('-f, --components <type>', 'Especifique quais componentes gerar (component, styles, hooks, types, services, validation, context, readme)', 'component')
            .parse(process.argv);

        const options = program.opts();

        const requestConfig: RequestConfig = {
            method: options.method,
            url: options.url,
            headers: options.headers,
            body: options.data,
        };

        const components: ['component' | 'styles' | 'hooks' | 'types' | 'services' | 'validation' | 'context' | 'readme'] = options.components
            .split(',')
            .map((c: string) => c.trim().toLowerCase()) as ['component' | 'styles' | 'hooks' | 'types' | 'services' | 'validation' | 'context' | 'readme'];

        const frontendConfig: FrontendGeneratorConfig = {
            app: options.app,
            outputDir: options.outputDir,
            components: components,
        };

        return { requestConfig, frontendConfig };
    }
}
