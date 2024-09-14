'use strict';

const init = require('eslint-config-metarhia');

module.exports = [
  {
    files: ['./'],
    rules: init,
  },
  {
    files: ['./docs'],
    rules: {
      ...init,
      sourceType: 'module',
    },
  },
];
