export const prismaTypeMap = new Map<string, string>([
  ["String", "string"],
  ["Boolean", "boolean"],
  ["Int", "number"],
  ["BigInt", "bigint"],
  ["Float", "number"],
  ["Decimal", "number"],
  ["DateTime", "Date"],
  ["Json", "any"],
  ["Bytes", "Buffer"],
  ["Unsupported", "any"],
]);
