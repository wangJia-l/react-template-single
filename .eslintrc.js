module.exports = {
    root: true,
    // 参考：https://www.npmjs.com/package/@ecomfe/eslint-config
    extends: [
        '@ecomfe/eslint-config',
        // npm i -D eslint-plugin-import
        // '@ecomfe/eslint-config/import',
        // npm i -D eslint-plugin-react eslint-plugin-react-hooks
        '@ecomfe/eslint-config/react',
        // npm i -D eslint-plugin-vue
        // '@ecomfe/eslint-config/vue',
        // npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
        // '@ecomfe/eslint-config/typescript',
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'object-curly-spacing': ['error', 'always'],
        '@babel/object-curly-spacing': ['error', 'always'],
        'react/jsx-uses-react': 2,
        'react/jsx-no-bind': 0,
        'react-hooks/rules-of-hooks': 0,
        'indent': 'off',
        'quotes': ['error', 'always']
    },
    'settings': {
        'react': {
            'version': 'detect',
        },
    },
    'globals': {
        'BMapGL': true,
    },
};