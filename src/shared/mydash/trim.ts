export function trim(str: string, customDelims: string = '') {
  const delims = `[ ${customDelims}]+`;
  const regStart = new RegExp(`^${delims}`);
  const regEnd = new RegExp(`${delims}\$`);

  return str.replace(regStart, '').replace(regEnd, '');
}
