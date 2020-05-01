export const allowedCharacters = (characters: string) => (value: string) => {
  return characters.split('').some(c => value.indexOf(c) < 0);
};
