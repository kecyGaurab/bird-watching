module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'plugin:prettier/recommended'],
    env: {
      browser: true,
      jest: true,
    },
    plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
    rules: {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      'max-len': ['error', 100],
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
      'no-mixed-operators': 'off',
      'no-undefined': 'off',
      "react/prop-types": 0,
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': ['off'],
      "react/static-property-placement": [
        "error",
        "static public field"
      ],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.js'],
        },
      ],
      'prefer-arrow-callback': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          printWidth: 100,
          semi: true
        },
      ],
    },
  };
  