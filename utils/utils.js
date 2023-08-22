export const FormatCurr = (curr) =>
  new Intl.NumberFormat().format(parseInt(curr));
