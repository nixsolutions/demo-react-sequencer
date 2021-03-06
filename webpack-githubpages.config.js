var path = require('path');
var webpack = require('webpack');
var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    devtool: false,
    entry: [
        './public/index'
    ],
    output: {
        path: path.join(__dirname, 'docs'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'public/images'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'public/shared/sprite.png'),
                css: path.resolve(__dirname, 'public/shared/sprite.less')
            },
            apiOptions: {
                cssImageRef: "/demo-react-sequencer/demo-react-sequencer/images/sprite.png"
            }
        })
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
                loader: "file?name=demo-react-sequencer/images/[name].[ext]"
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
            selectors: path.join(__dirname, '/public/selectors'),
        },
        extensions: ['', '.js', '.less']
    }
};
