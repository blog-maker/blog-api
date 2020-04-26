db.users.insertOne({
  username: 'admin',
  password: 'admin',
  firstName: 'admin',
  lastName: 'admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});
