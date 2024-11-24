import type { GeneratorManifest } from "@prisma/generator-helper";

const { version } = require("../package.json");

/** Generates simple metadata for this generator. */
export function onManifest(): GeneratorManifest {
  return {
    version,
    // TODO: We should change this to the real output of the generator in some way. But we cannot get its real output here
    // because we need to await the prisma client to be generated first.
    defaultOutput: "./prismaTypes.ts",
    prettyName: "Prisma Client Types Generator",
    requiresGenerators: ["prisma-client-js"],
  };
}
