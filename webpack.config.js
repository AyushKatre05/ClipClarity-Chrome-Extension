const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        background: "./public/background.js",
        contentScript: "./public/contentScript.js",
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js' // Output bundle
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Test for both .ts and .tsx files
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
