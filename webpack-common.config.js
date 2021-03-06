var path = require('path');
var webpack = require('webpack');
var SpritesmithPlugin = require('webpack-spritesmith');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: !isProduction && 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './public/index'
    ],
    output: {
        path: path.join(__dirname, 'docs'),
        filename: 'bundle.js',
        publicPath: '/docs/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
                cssImageRef: "/shared/sprite.png"
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
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     exclude: /node_modules/,
            //     loader: "url?name=[path][name].[ext]&limit=4096"
            // },
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
            selectors: path.join(__dirname, '/public/selectors'),
        },
        extensions: ['', '.js', '.less']
    }
};

if (process.env.NODE_ENV === 'production') {

    module.exports.entry = [
        './public/index'
    ];

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
} else {
    module.exports.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}
