import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
{
files: ['**/*.ts', '**/*.tsx'],
languageOptions: {
parser: tsParser,
ecmaVersion: 2021,
sourceType: 'module',
},
plugins: {
'@typescript-eslint': tseslint,
prettier: eslintPluginPrettier,
},
rules: {
...tseslint.configs.recommended.rules,
'prettier/prettier': 'error',
},
},
];
