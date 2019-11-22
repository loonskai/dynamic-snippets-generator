import ExpressionTypes from '../../constants/expressionTypes';

export const parseObjectDestructuringProps = (str?: string): string[] => {
  if (!str) return [];
  return str.indexOf(',') ? str.split(',') : [str];
};

export const parseObjectProperty = (value: string): ObjectProperty => ({
  type: ExpressionTypes.OBJECT_PROPERTY,
  shorthand: true,
  value: {
    type: ExpressionTypes.IDENTIFIER,
    name: value,
  },
  key: {
    type: ExpressionTypes.IDENTIFIER,
    name: value,
  },
});
