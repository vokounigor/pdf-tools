import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: 'Types' }],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      semi: 'error',
    },
  },
  {
    ignores: ['src/public/'],
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
