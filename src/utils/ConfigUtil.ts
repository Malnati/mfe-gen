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
            .requiredOption('-X, --method <type>', 'Método HTTP (GET, POST, PUT, DELETE)', 'GET')
            .requiredOption('-U, --url <type>', 'URL do endpoint')
            .requiredOption('-H, --headers <type>', 'Cabeçalhos HTTP no formato "Key: Value"', (value, previous) => {
                const [key, val] = value.split(':').map(v => v.trim());
                return { ...previous, [key]: val };
            }, {})
            .requiredOption('-d, --data <type>', 'Corpo da requisição (JSON)', '')
            .requiredOption('-a, --app <type>', 'Nome da aplicação')
            .requiredOption('-o, --outputDir <type>', 'Diretório de saída para os arquivos gerados', './build')
            .requiredOption('-f, --components <type>', 'Especifique quais componentes gerar (component, styles, hooks, services, validation, context)', 'component')
            .option('--dependencies <items>', 'Dependências para instalar', (value) => value.split(','), [])
            .option('--devDependencies <items>', 'DevDependencies para instalar', (value) => value.split(','), [])
            .parse(process.argv);

        const options = program.opts();

        const requestConfig: RequestConfig = {
            method: options.method,
            url: options.url,
            headers: options.headers,
            body: options.data,
        };

        const components: ['component' | 'styles' | 'hooks' | 'services' | 'validation' | 'context'] = options.components
            .split(',')
            .map((c: string) => c.trim().toLowerCase()) as ['component' | 'styles' | 'hooks' | 'services' | 'validation' | 'context'];

        const frontendConfig: FrontendGeneratorConfig = {
            app: options.app,
            outputDir: options.outputDir,
            components: components,
            dependencies: options.dependencies,
            devDependencies: options.devDependencies,
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
			const ignorePath = path.resolve(__dirname, '../../.prettierignore');
			const options = {
				ignorePath: ignorePath,
				editorconfig: true,
			};

			// Função recursiva para formatar arquivos dentro de diretórios
			async function formatDirectory(directory: string) {
				const entries = await fs.promises.readdir(directory, { withFileTypes: true });

				for (const entry of entries) {
					const fullPath = path.join(directory, entry.name);

					if (entry.isDirectory()) {
						await formatDirectory(fullPath);  // Recurse into subdirectory
					} else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.json') || fullPath.endsWith('.css') || fullPath.endsWith('.md') || fullPath.endsWith('.html')) {
						const content = await fs.promises.readFile(fullPath, 'utf8');
						const formatted = await prettier.format(content, { ...options, filepath: fullPath });
						await fs.promises.writeFile(fullPath, formatted);
					} else {
						console.log(`Ignorando arquivo não suportado pelo Prettier: ${fullPath}`);
					}
				}
			}

			// Inicia o processo de formatação a partir do diretório raiz
			await formatDirectory(destDir);

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
