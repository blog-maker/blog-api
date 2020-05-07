export const allowedCharacters = (characters: string) => (value: string) => {
  return value.split('').every(c => characters.indexOf(c) >= 0);
};

export const AllowedUsernameCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@';
