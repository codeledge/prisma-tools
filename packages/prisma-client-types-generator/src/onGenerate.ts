import type {
  GeneratorConfig,
  GeneratorOptions,
} from "@prisma/generator-helper";
import { generateTypes } from "./generateTypes";
import fs from "node:fs";
import path from "node:path";

export type PrismaClientTypesGeneratorConfig = {
  /**
   * @description
   * The path to a file that contains a record of aliases for the models.
   * @example
   * ```ts
   * aliases = "../aliases.ts"
   * ```
   *
   * @default undefined
   */
  aliases?: string;
  /**
   * @description
   * Whether to use PascalCase for the generated types.
   * @default undefined
   */
  pascalCase?: boolean;
};

export type InternalGeneratorOptions = PrismaClientTypesGeneratorConfig & {
  aliasMap?: Record<string, string>;
};

/** Runs the generator with the given options. */
export async function onGenerate(options: GeneratorOptions) {
  const outputFile = options.generator.output;
  if (!outputFile || !outputFile.value) {
    throw new Error("No output file specified");
  }

  const config = options.generator.config as PrismaClientTypesGeneratorConfig;

  let aliasMap: Record<string, string> | undefined;
  if (config.aliases) {
    try {
      // Resolve the aliases path relative to the schema file location
      const schemaDir = path.dirname(options.schemaPath);
      const aliasesPath = path.resolve(schemaDir, config.aliases);

      const aliasesModule = await import(aliasesPath);
      aliasMap = aliasesModule.default;
    } catch (error) {
      throw new Error(
        `Failed to load aliases from ${config.aliases}: ${error.message}`
      );
    }
  }

  let output = generateTypes(options.dmmf.datamodel, {
    ...config,
    aliasMap,
  });

  const outputPath = path.resolve(outputFile.value);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, "utf-8");
}
