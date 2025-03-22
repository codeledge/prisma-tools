import { DMMF } from "@prisma/generator-helper";
import { formatEntityName } from "./formatEntityName";
import { InternalGeneratorOptions } from "./onGenerate";

export const generateEnum = (
  prismaEnum: DMMF.DatamodelEnum,
  config: InternalGeneratorOptions
) => {
  let out = "";

  const name = formatEntityName(prismaEnum.name, config);

  out += `export const ${name} = {\n`;

  for (const value of prismaEnum.values) {
    out += `  ${value.name}: "${value.name}",\n`;
  }

  out += `} as const;\n`;
  out += "\n";
  out += `export type ${name} = (typeof ${name})[keyof typeof ${name}];\n`;
  out += "\n";

  return out;
};
