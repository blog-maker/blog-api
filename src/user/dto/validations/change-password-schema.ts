import * as yup from 'yup';

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(),
  newPassword: yup
    .string()
    .required()
    .min(6)
    .notOneOf(
      [yup.ref('currentPassword')],
      'The new password should be different from the current.'
    ),
});
