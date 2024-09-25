import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.node
    }
  },
  {
    files: ['**/*.js'],
    rules: {
      // Aqui você pode adicionar regras específicas para JS
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      globals: globals.node
    },
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
    rules: {
      
    }
  },
  pluginJs.configs.recommended,   // Configurações recomendadas do ESLint para JavaScript
  typescriptEslint.configs.recommended // Configurações recomendadas do @typescript-eslint
];
