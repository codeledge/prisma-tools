import type { GeneratorOptions } from "@prisma/generator-helper";
import { generateTypes } from "./generateTypes";
import fs from "node:fs";
import path from "node:path";

export type PrismaClientTypesGeneratorConfig = {
  /**
   * (./ -> relative to schema, or an importable path to require() it)
   *
   * @default ./prismaTypes.ts
   */
  output?: string;

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
};

/** Runs the generator with the given options. */
export async function onGenerate(options: GeneratorOptions) {
  const outputFile = options.generator.output;
  if (!outputFile || !outputFile.value) {
    throw new Error("No output file specified");
  }

  const aliases =
    typeof options.generator.config.aliases === "string"
      ? JSON.parse(options.generator.config.aliases)
      : undefined;

  let output = generateTypes(options.dmmf.datamodel, { aliases });

  const outputPath = path.resolve(outputFile.value);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, "utf-8");
}
