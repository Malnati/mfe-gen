// src/utils/ConfigUtil.ts

import { Command } from 'commander';
import { RequestConfig } from '../interfaces'

export class ConfigUtil {
    public static getConfig(): RequestConfig {
        const program = new Command();

        program
            .option('-X, --method <type>', 'Método HTTP (GET, POST, PUT, DELETE)', 'GET')
            .option('-U, --url <type>', 'URL do endpoint')
            .option('-H, --headers <type>', 'Cabeçalhos HTTP no formato "Key: Value"', (value, previous: Record<string, string> = {}) => {
                const [key, val] = value.split(':').map(v => v.trim());
                return { ...previous, [key]: val };
            })
            .option('-d, --data <type>', 'Corpo da requisição (JSON)')
            .parse(process.argv);

        const options = program.opts();

        return {
            method: options.method,
            url: options.url,
            headers: options.headers || {},
            body: options.data || null,
        };
    }
}
