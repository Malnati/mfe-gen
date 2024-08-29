// src/utils/ConfigUtil.ts

import { Command } from 'commander';
import { RequestConfig, FrontendGeneratorConfig } from '../interfaces';
import * as fs from 'fs-extra';
import path from "path";
import { exec } from "child_process";
import * as prettier from "prettier";

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

    public static async copyStaticFiles(destDir: string) {
        try {
            const staticPath = path.resolve(__dirname, '../../static');
            await fs.copy(staticPath, destDir, {
                overwrite: true,
            });
            console.log('Arquivos estáticos copiados com sucesso.');
        } catch (err) {
            console.error('Erro ao copiar arquivos estáticos:', err);
        }
    }

    public static async formatFiles(destDir: string) {
        try {
            const configFile = await prettier.resolveConfigFile(destDir);

            const options = {
                config: configFile,
                ignorePath: path.join(destDir, '.prettierignore'),
                editorconfig: true,
            };

            const files = await fs.promises.readdir(destDir);

            for (const filePath of files) {
                const content = await fs.promises.readFile(path.join(destDir, filePath), 'utf8');
                const formatted = await prettier.format(content, { ...options, filepath: filePath });
                await fs.promises.writeFile(path.join(destDir, filePath), formatted);
            }

            console.log('Arquivos gerados formatados com sucesso.');
        } catch (err) {
            console.error('Erro ao formatar arquivos gerados:', err);
        }
    }

    public static async runNpmInstall(directory: string): Promise<void> {
        console.log('Instalando dependências via npm install...');
        return new Promise((resolve, reject) => {
            exec('npm install', { cwd: directory }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro ao executar npm install: ${error.message}`);
                    reject(error);
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }
                console.log(`stdout: ${stdout}`);
                console.log('Dependências instaladas com sucesso.');
                resolve();
            });
        });
    }
}
