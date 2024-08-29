// src/base-generator.ts

import { FrontendGeneratorConfig } from "./interfaces";

export abstract class BaseGenerator {
    protected config: FrontendGeneratorConfig;

    constructor(config: FrontendGeneratorConfig) {
        this.config = config;
    }

    abstract generate(): void;
}
