import type {
  GeneratorConfig,
  GeneratorOptions,
} from "@prisma/generator-helper";
import { generateTypes } from "./generateTypes";
import fs from "node:fs";
import path from "node:path";

export type PrismaClientTypesGeneratorConfig = {
  /**
   *
   *
   * @example
   *
   * ```ts
   * typeAliases = '{snake_case_model: SnakeCaseModel}
   * ```
   *
   * @default undefined
   */
  aliases?: string;

  // Whether to use PascalCase for the generated types.
  pascalCase?: boolean;
};

/** Runs the generator with the given options. */
export async function onGenerate(options: GeneratorOptions) {
  const outputFile = options.generator.output;
  if (!outputFile || !outputFile.value) {
    throw new Error("No output file specified");
  }

  let output = generateTypes(
    options.dmmf.datamodel,
    options.generator.config as PrismaClientTypesGeneratorConfig
  );

  const outputPath = path.resolve(outputFile.value);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, "utf-8");
}
