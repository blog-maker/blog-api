import { SchemaDefinition, Schema } from 'mongoose';

import { RequiredString, OptionalObject, requiredBooleanType } from './types';

export function defaultSchema(definition: SchemaDefinition) {
  return new Schema(definition, { timestamps: true });
}

export function customSchema(definition: SchemaDefinition) {
  const aditionalSchema = {
    isActive: requiredBooleanType({ default: true }),
    customAttributes: [
      {
        _id: false,
        name: RequiredString,
        value: RequiredString,
      },
    ],
    extensionsAttributes: OptionalObject,
  };
  const schema = { ...definition, ...aditionalSchema };
  return defaultSchema(schema);
}
