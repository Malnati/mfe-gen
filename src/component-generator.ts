
// src/component-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, DbReaderConfig, Table } from "./interfaces";
import { BaseGenerator } from "./base-generator";


export class ComponentGenerator extends BaseGenerator implements IGenerator {
    generate() {
        // Implementação específica para gerar componentes
    }
}
