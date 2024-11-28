import { DMMF } from "@prisma/generator-helper";
import { PrismaClientTypesGeneratorConfig } from "./onGenerate";

export const generateCrud = (
  datamodel: DMMF.Datamodel,
  config: PrismaClientTypesGeneratorConfig
) => {
  const models = datamodel.models;

  const crud = {};

  console.dir(datamodel.indexes, { depth: null });

  for (const model of models) {
    console.dir(model.fields, { depth: null });
    break;
    crud[model.name] = {
      read: {
        fields: model.fields.map((field) => {
          return {
            name: field.name,
            type: field.type,
            required: field.isRequired,
          };
        }),
      },
      list: {
        filters: model.fields.map((field) => {
          return {
            name: field.name,
            type: field.type,
            index: {
              unique: model.uniqueIndexes.some((index) => {
                return index.fields[0] === field.name;
              }),
            },
          };
        }),
        fields: model.fields.map((field) => {
          return {
            name: field.name,
            type: field.type,
            required: field.isRequired,
          };
        }),
      },
      create: {
        fields: model.fields.map((field) => {
          return {
            name: field.name,
            type: field.type,
            required: field.isRequired,
          };
        }),
      },
      update: {
        fields: model.fields.map((field) => {
          return {
            name: field.name,
            type: field.type,
            required: field.isRequired,
          };
        }),
      },
      delete: {
        fields: model.fields
          .filter((field) => field.isUnique)
          .map((field) => {
            return {
              name: field.name,
              type: field.type,
              required: field.isRequired,
            };
          }),
      },
    };
  }

  return crud;
};
