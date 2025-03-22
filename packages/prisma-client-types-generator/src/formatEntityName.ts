import { InternalGeneratorOptions } from "./onGenerate";

export const formatEntityName = (
  rawEntityName: string,
  { aliasMap, pascalCase }: InternalGeneratorOptions
) => {
  if (aliasMap) {
    if (rawEntityName in aliasMap) {
      return aliasMap[rawEntityName];
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
