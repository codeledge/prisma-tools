import { DMMF } from "@prisma/generator-helper";
import { getPascalName } from "./getPascalName";
import { prismaTypeMap } from "./prismaTypeMap";

const formatNull = (field: DMMF.Field) => {
  return !field.isRequired ? " | null" : "";
};

const isBaseField = (field: DMMF.Field, foreignKeysMap: Record<string, 1>) => {
  return !(
    field.isId ||
    field.isUnique ||
    field.kind === "object" ||
    foreignKeysMap[field.name]
  );
};

export const generateModel = (
  model: DMMF.Model,
  aliases?: Record<string, string>
) => {
  let out = "";

  const modelTypeName = getPascalName(model.name, aliases); // TODO: use also model.dbName with alias?

  // console.log(model.fields);

  // Example of foreignKeysMap:
  // { categoryId: 1, userId: 1 }
  const foreignKeysMap = model.fields
    .filter((field) => field.kind === "object")
    .reduce((acc, field) => {
      field.relationFromFields?.forEach((fromField) => {
        acc[fromField] = 1;
      });
      return acc;
    }, {} as Record<string, 1>);

  // Create Keys type
  out += `export type ${modelTypeName}Keys = {\n`;

  for (const field of model.fields) {
    if (isBaseField(field, foreignKeysMap)) {
      continue;
    }
    switch (field.kind) {
      case "scalar":
        out += `  ${field.name}: ${prismaTypeMap.get(field.type)}${
          field.isList ? "[]" : ""
        }${formatNull(field)}\n`;
        break;
      default:
        break;
    }
  }

  out += `}\n`;
  out += "\n";

  // Create Values type
  out += `export type ${modelTypeName}Values = {\n`;

  for (const field of model.fields) {
    if (!isBaseField(field, foreignKeysMap)) {
      continue;
    }
    switch (field.kind) {
      case "enum":
        out += `  ${field.name}: ${getPascalName(field.type)}${formatNull(
          field
        )}\n`;
        break;
      case "scalar":
      case "unsupported": // Untested
        out += `  ${field.name}: ${prismaTypeMap.get(field.type)}${
          field.isList ? "[]" : ""
        }${formatNull(field)}\n`;
        break;
      default:
        break;
    }
  }

  out += `}\n`;
  out += "\n";

  // Create Relations type
  out += `export type ${modelTypeName}Relations = {\n`;

  for (const field of model.fields) {
    switch (field.kind) {
      case "object":
        out += `  ${field.name}: ${field.type}${
          field.isList ? "[]" : ""
        }${formatNull(field)}\n`;
        break;
      default:
        break;
    }
  }

  out += `}\n`;
  out += "\n";

  // Create DB type
  out += `export type ${modelTypeName} = ${modelTypeName}Keys & ${modelTypeName}Values\n`;
  out += "\n";

  // Create Extended type
  out += `export type ${modelTypeName}Extended = ${modelTypeName} & ${modelTypeName}Relations\n`;
  out += "\n";

  return out;
};

// Examples:
// RELATION
// {
//   name: 'author',
//   kind: 'object',
//   isList: false,
//   isRequired: false,
//   isUnique: false,
//   isId: false,
//   isReadOnly: false,
//   hasDefaultValue: false,
//   type: 'AdminUser',
//   relationName: 'AdminUserToAudit',
//   relationFromFields: [ 'authorId' ],
//   relationToFields: [ 'id' ],
//   relationOnDelete: 'Cascade',
//   isGenerated: false,
//   isUpdatedAt: false
// }
