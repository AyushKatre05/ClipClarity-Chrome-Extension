const path=require('path')

module.exports={
    mode: "development",
    entry: "./src/app.tsx",
    
    module: {
        rules: [{
            use: "ts-loader",
            test: /\.tsx?$/,
            exclude: /node_modules/
        }]
    },
    resolve:{
        extensions: ['.ts','.tsx','.js']
    },
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    }
}