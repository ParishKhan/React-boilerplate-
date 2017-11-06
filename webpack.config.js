const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
    name: 'client',
    entry: [
        "react-hot-loader/patch",
        'webpack-hot-middleware/client?path=http://localhost:3005/__webpack_hmr',
        "./src/browser/index.js"
    ],
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ["react", "env"]
            }
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'public/css/main.css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    target: 'web',
    devtool: "cheap-module-source-map"
}

const serverConfig = {
    name: 'server',
    entry: [
        "react-hot-loader/patch",
        "./src/server/index.js"
    ],
    output: {
        path: __dirname,
        filename: "server.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ["react", "env"]
            }
        }, {
            test: /\.scss$/,
            loaders: [
                'null-loader'
            ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    target: "node",
    externals: [nodeExternals()],
    devtool: "cheap-module-source-map"
}

module.exports = [browserConfig, serverConfig]