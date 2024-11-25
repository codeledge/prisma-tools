import { PrismaClientTypesGeneratorConfig } from "./onGenerate";

let aliasesMap: Record<string, string> | undefined;

export const formatEntityName = (
  rawEntityName: string,
  { aliases, pascalCase }: PrismaClientTypesGeneratorConfig
) => {
  if (aliases) {
    aliasesMap = aliasesMap || JSON.parse(aliases);
    if (rawEntityName in aliasesMap) {
      return aliasesMap[rawEntityName];
    }
  }

  if (pascalCase) {
    return rawEntityName
      .split("_")
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join("");
  }

  return rawEntityName;
};
