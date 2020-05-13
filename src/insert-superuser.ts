import { INestApplication } from '@nestjs/common';

import { UserService } from './user/user.service';

const superUser = {
  username: 'admin',
  email: 'admin@mail.com',
  password: 'admin',
  firstName: 'Admin',
  lastName: 'Admin',
  phoneNumber: '',
  admin: true,
  superuser: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const insertSuperUser = async (app: INestApplication) => {
  const userService = app.get(UserService);

  await userService.createSuperUserIfNotExists(superUser);
};
