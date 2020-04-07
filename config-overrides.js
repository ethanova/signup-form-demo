const { override, fixBabelImports } = require('customize-cra');

// https://ant.design/docs/react/use-in-typescript

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);