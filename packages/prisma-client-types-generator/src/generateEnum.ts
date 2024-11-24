import { DMMF } from "@prisma/generator-helper";
import { getPascalName } from "./getPascalName";

export const generateEnum = (
  prismaEnum: DMMF.DatamodelEnum,
  aliases?: Record<string, string>
) => {
  let out = "";

  const name = getPascalName(prismaEnum.name, aliases);

  out += `export const ${name} = {\n`;

  for (const value of prismaEnum.values) {
    out += `  ${value.name}: '${value.name}',\n`;
  }

  out += `} as const;\n`;
  out += "\n";
  out += `export type ${name} = (typeof ${name})[keyof typeof ${name}]\n`;
  out += "\n";

  return out;
};
