
const autoprefixer = require('autoprefixer');
const tailwindcss=require('tailwindcss')
const path = require('path');


module.exports = {
    mode: "development",
    entry: {
        background: "./public/background.js",
        contentScript: "./public/contentScript.js",
        popup: "./public/popup.js",
        index:"./src/index.tsx"
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
            },
            {
                use:['style-loader','css-loader',{
                    loader: 'postcss-loader',
                    options:{
                        postcssOptions:{
                            indent: 'postcss',
                            plugins:[tailwindcss,autoprefixer]
                        }
                    }
                }],
                test:/\.css$/i
            }
        ]
    }
};
