import { SchemaDefinition, Schema } from 'mongoose';
import { RequiredString, OptionalObject, requiredBooleanType } from './types';

export function defaultSchema(definition: SchemaDefinition) {
  const aditionalSchema = {
    isActive: requiredBooleanType({ default: true }),
    customAttributes: [
      {
        name: RequiredString,
        value: RequiredString,
      },
    ],
    extensionsAttributes: OptionalObject,
  };
  const schema = { ...definition, ...aditionalSchema };
  return new Schema(schema, { timestamps: true });
}
