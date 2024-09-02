// src/interfaces.ts

export interface FrontendGeneratorConfig {
    app: string;
    outputDir: string;
    components: [
        "component" | "styles" | "types" | "services" | "validation" | "context" | "readme"
    ];
    scripts?: Record<string, string>; // Novas propriedades para scripts
    dependencies?: Record<string, string>; // Novas propriedades para dependências
    devDependencies?: Record<string, string>; // Novas propriedades para devDependencies
}

export interface ComponentOptions {
	name: string
	path: string
	styles?: boolean
	types?: boolean
	services?: boolean
	validation?: boolean
	context?: boolean
}

export interface FileGenerationResult {
	success: boolean
	filePath: string
	error?: string
}

export type SupportedFileExtensions = "tsx" | "ts" | "css" | "json" | "md"

export interface Column {
	columnName: string
	dataType: string
	characterMaximumLength: number | null
	isNullable: boolean
	isPrimaryKey: boolean
	columnDefault: string | null
	columnComment: string | null
}

export interface Table {
	tableName: string
	columns: Column[]
	relations: Relation[]
}

export interface Relation {
	columnName: string
	foreignTableName: string
	foreignColumnName: string
	relationType: "ManyToOne" | "OneToOne" | "OneToMany" | "ManyToMany" // Novo campo adicionado
}

export interface DbReaderConfig {
	app: string
	host: string
	port: number
	database: string
	user: string
	password: string
	outputDir: string
	components: [
		| "entities"
		| "services"
		| "interfaces"
		| "controllers"
		| "dtos"
		| "modules"
		| "app-module"
		| "main"
		| "env"
		| "package.json"
		| "readme"
		| "datasource"
		| "diagram",
	]
}

export type Format = "svg" | "dot" | "json" | "dot_json" | "xdot_json" | "png"
export type Engine =
	| "circo"
	| "dot"
	| "fdp"
	| "neato"
	| "osage"
	| "patchwork"
	| "twopi"

export interface IGenerator {
	generate(): void
}

export interface RequestConfig {
	method: string
	url: string
	headers: Record<string, string>
	body: string | null
}
