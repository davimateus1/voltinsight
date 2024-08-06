export const replaceValue = (value: string) => {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
};
