var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './public/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
        {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'public'),
            plugins: ['transform-runtime']
        },
        {
            test: /\.less$/,
            loaders: [
                'style?sourceMap',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                'less'
            ]
        },
        {
            test: /\.(png|jpg|svg|woff|woff2|eot|ttf|gif)$/,
            exclude: /node_modules/,
            loader: "url?name=[path][name].[ext]&limit=4096"
        },
        {
            test: /\.(png|jpg|svg|woff|woff2|eot|ttf|gif)$/,
            exclude: /node_modules/,
            loader: "file"
        }
    ]
  },
  resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            components: path.join(__dirname, '/public/components'),
            containers: path.join(__dirname, '/public/containers'),
            middleware: path.join(__dirname, '/public/middleware'),
            modules: path.join(__dirname, '/public/store/modules'),
            shared: path.join(__dirname, '/public/shared'),
            utils: path.join(__dirname, '/public/utils'),
        },
        extensions: ['', '.js', '.less']
    }
};
