import { generatorHandler } from "@prisma/generator-helper";
import { onGenerate } from "./onGenerate";
import { onManifest } from "./onManifest";

// Defines the entry point of the generator.
generatorHandler({
  onManifest,
  onGenerate,
});
