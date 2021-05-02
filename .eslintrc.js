module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: [
      'error',
      'always', // 'never' なら全部省略
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // 変数名が '_' で始まる場合は許可
      },
    ],
  },
};
