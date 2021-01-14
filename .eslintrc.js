module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always' // 'never' なら全部省略
    ],
    'no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': '^_' // 使わない引数は _ で始める
      }
    ]
  }
};
