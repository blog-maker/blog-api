import * as yup from 'yup';

export const CreateMailerConfigSchema = yup.object({
  host: yup.string().required(),
  port: yup.number().required(),
  secure: yup.boolean(),
  auth: yup
    .object({
      user: yup.string().required(),
      pass: yup.string().required(),
    })
    .required(),
  sender: yup.object({
    name: yup.string(),
    email: yup
      .string()
      .email()
      .required(),
  }),
});
