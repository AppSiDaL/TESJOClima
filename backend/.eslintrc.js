module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: [
      'standard-with-typescript',
      'plugin:@typescript-eslint/recommended', // Agregar esta línea
    ],
    parserOptions: {
      ecmaVersion: 12, // Cambiar "latest" a "12"
      sourceType: 'module', // Cambiar "script" a "module"
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  };
  