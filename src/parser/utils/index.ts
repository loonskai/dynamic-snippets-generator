import types from '../../constants/expressionTypes';

export const parseObjectDestructuringProps = (str?: string): string[] => {
  if (!str) return [];
  return str.indexOf(',') ? str.split(',') : [str];
};

export const parseASTProperty = (value: string) => ({
  type: types.OBJECT_PROPERTY,
  shorthand: true,
  value: {
    type: types.IDENTIFIER,
    name: value,
  },
  key: {
    type: types.IDENTIFIER,
    name: value,
  },
});
