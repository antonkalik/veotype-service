export const getRandomString = (length: number): string => {
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const timestamp = Date.now();
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex =
      Math.floor(Math.random() * (alphanumeric.length + timestamp)) % alphanumeric.length;
    result += alphanumeric.charAt(randomIndex);
  }

  return result;
};
