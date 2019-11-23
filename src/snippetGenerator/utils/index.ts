export const getPlaceholder = (count: number): string => `\$${count}`;

export const getNamedPlaceholder = (count: number, name: string): string =>
  `\${${count}:${name}}`;

export const isPlaceholder = (name: string): boolean =>
  /^\${?\d+:?.*}?$/.test(name);
