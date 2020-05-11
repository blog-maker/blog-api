import { SchemaTypeOpts } from 'mongoose';

export const OptionalString = { type: String };
export const OptionalObject = { type: Object };
export const OptionalNumber = { type: Number };
export const OptionalBoolean = { type: Boolean };
export const OptionalDate = { type: Date };

export const RequiredString = { type: String, required: true };
export const RequiredBoolean = { type: Boolean, required: true };
export const RequiredNumber = { type: Number, required: true };

export const optionalNumberType = (options?: SchemaTypeOpts<any>) => ({
  ...OptionalNumber,
  ...options,
});
export const optionalBooleanType = (options?: SchemaTypeOpts<any>) => ({
  ...OptionalBoolean,
  ...options,
});
export const optionalDateType = (options?: SchemaTypeOpts<any>) => ({
  ...OptionalDate,
  ...options,
});

export const requiredStringType = (options?: SchemaTypeOpts<any>) => ({
  ...RequiredString,
  ...options,
});
export const requiredBooleanType = (options?: SchemaTypeOpts<any>) => ({
  ...RequiredBoolean,
  ...options,
});
export const requiredNumberType = (options?: SchemaTypeOpts<any>) => ({
  ...RequiredNumber,
  ...options,
});
