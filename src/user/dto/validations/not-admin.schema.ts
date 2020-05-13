import * as yup from 'yup';

export const NotAdminSchema = yup.object().shape({
  admin: yup
    .boolean()
    .test('is-not-admin', 'User should not be admin', value => !value),
});
