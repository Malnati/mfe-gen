// src/base-generator.ts

import * as fs from 'fs';
import { DbReaderConfig, Table } from "./interfaces";

export abstract class BaseGenerator {
    protected schema: Table[];
    protected config: DbReaderConfig;

    constructor(schemaPath: string, config: DbReaderConfig) {
        const schemaJson = fs.readFileSync(schemaPath, 'utf-8');
        this.schema = JSON.parse(schemaJson).schema;
        this.config = config;
    }

    abstract generate(): void;
}
