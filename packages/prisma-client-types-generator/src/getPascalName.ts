export const getPascalName = (
  str: string,
  aliases: Record<string, string> = {}
) => {
  if (str in aliases) {
    return aliases[str];
  }

  const pascalCase = str
    .split("_")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");

  return pascalCase;
};
