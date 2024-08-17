import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    env: 'node',
    languageOptions: { globals: globals.node },
    overrides: [
      {
        files: ['tests/**/*'],
        env: {
          jest: true,
        },
      },
    ],
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
