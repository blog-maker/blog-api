import * as yup from 'yup';

export const CreateUserSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});
