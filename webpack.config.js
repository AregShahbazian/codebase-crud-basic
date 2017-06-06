var path = require('path');

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: __dirname,
        filename: 'dist/[name].bundle.js'
        /*
         Necessary for production build, when host is not /
         */
        // ,publicPath: "./"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,     // Use url-loader for smaller images - Base64 encrypted, in Webpack Dev Server memory
                loader: "url-loader?limit=100000&name=/dist/img/[name].[ext]"
            },
            {
                test: /\.jpe?g$/,   // Use file-loader for larger images - no Base64 encryption
                loader: "file-loader?name=/dist/img/[name].[ext]"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=/dist/fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=/dist/fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=/dist/fonts/[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=/dist/fonts/[name].[ext]'
            }

        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
