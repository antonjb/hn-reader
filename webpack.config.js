const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: './src/index.tsx',
    mode: isDevelopment ? 'development' : 'production',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: [/node_modules/, path.resolve(__dirname, './src/service-worker.js')],
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: [/node_modules/],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
        }),
        new InjectManifest({
            swSrc: './src/service-worker.js',
            swDest: 'service-worker.js',
        }),
    ],
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, './build'),
    },
    devServer: {
        stats: 'errors-only',
        open: true,
    },
}
