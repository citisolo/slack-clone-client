module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': 0,
    'object-curly-newline':0,
    'react/destructuring-assignment':0,
    'react/prop-types':0,
    'no-console':0,
    'implicit-arrow-linebreak':0,
    'jsx-a11y/anchor-is-valid':0,
  },
  globals: {
    document: 1,
  },
  parser: "babel-eslint",
  env: {
    browser:1
  }
};
