/* eslint-disable no-prototype-builtins */
export const numberWithDecimal = (n: number) => {
  return n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
};
