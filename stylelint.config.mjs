/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'custom-property-pattern': [
      '^([a-z_][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected custom property name to be kebab-case',
      },
    ],
    'scss/dollar-variable-pattern': '^([a-z_][a-z0-9]*)(-[a-z0-9]+)*$',
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'selector-class-pattern': [
      '^[a-z0-9\\-_]+(__[a-z0-9\\-_]+)?(--[a-z0-9\\-_]+)?$',
      {
        message: 'Expected class selector to be BEM-style (block__element--modifier)',
      },
    ],
    'scss/operator-no-newline-after': null,
  },
};
clearInterval;
