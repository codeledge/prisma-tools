import type { GeneratorManifest } from "@prisma/generator-helper";

const { version } = require("../package.json");

/** Generates simple metadata for this generator. */
export function onManifest(): GeneratorManifest {
  return {
    version,
    defaultOutput: "./prismaCrud.ts",
    prettyName: "Prisma CRUD Generator",
    requiresGenerators: ["prisma-client-js"],
  };
}
