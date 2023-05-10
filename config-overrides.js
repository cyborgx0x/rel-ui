const path = require('path');

const { useBabelRc, override, addWebpackAlias } = require('customize-cra');

module.exports = override([useBabelRc(), addWebpackAlias({ '@': path.resolve(__dirname, './src') })]);
