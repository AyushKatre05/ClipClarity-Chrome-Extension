const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.tsx", // Entry point for your React code
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js' // Output bundle
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
