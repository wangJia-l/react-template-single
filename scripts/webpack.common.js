/* eslint-disable */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaderUtils = require('loader-utils');
const paths = require('./paths');
const getEnv = require('./webpack.env');
// 设置 常量
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const imageInlineSizeLimit = 4 * 1024;
const isDev = process.env.NODE_ENV === 'development';
const getStyleLoaders = (isDev, cssLoaderOptions = {}, preLoader) => {
    const loaders = [
        'style-loader',
        {
            loader: 'css-loader',
            options: Object.assign(
                {
                    sourceMap: isDev,
                },
                cssLoaderOptions
            ),
        },
        'postcss-loader',
    ];
    if (preLoader) {
        loaders.push(preLoader);
    }
    return loaders;
};
const getLocalIdentFn = isDev => {
    return (context, localIdentName, localName, options) => {
        // 获取更好命名，移除根目录、src目录，并替换/为-
        const className =
            context.context
                // remove root context
                .replace(context.rootContext, '')
                // remove src
                .replace('/src/', '')
                .replace(/\//g, '-') +
            '_' +
            localName;
        // 获取hash数字
        const hash = loaderUtils.getHashDigest(className, 'md5', 'base64', 8);
        // 是否增加hash到className上
        const isUseHashClassNameInProd = false;
        return isDev ? className : isUseHashClassNameInProd ? hash : className;
    };
};
module.exports = function(options) {
    return {
        mode: options.mode,
        entry: {
            app: [...(isDev ? ['react-hot-loader/patch'] : []), paths.appIndexJs],
        },
        output: {
            publicPath: '/',
            path: paths.appBuild,
        },
        cache: {
            // 使用持久化缓存
            type: 'filesystem', // memory:使用内容缓存 filesystem：使用文件缓存
        },
        devtool: false,
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: getStyleLoaders(isDev, {
                                importLoaders: 1,
                            }),
                            // Import css even if package claims to have no side effects.
                            // https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        {
                            test: cssModuleRegex,
                            exclude: cssRegex,
                            use: getStyleLoaders(isDev, {
                                importLoaders: 1,
                                // css modules
                                modules: {
                                    getLocalIdent: getLocalIdentFn(isDev),
                                },
                            }),
                            // Import css even if package claims to have no side effects.
                            // https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        {
                            test: lessRegex,
                            exclude: lessModuleRegex,
                            use: getStyleLoaders(
                                isDev,
                                {
                                    importLoaders: 2,
                                },
                                {
                                    loader: 'less-loader',
                                    options: {
                                        sourceMap: isDev,
                                    },
                                }
                            ),
                            // Import css even if package claims to have no side effects.
                            // https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        {
                            test: lessModuleRegex,
                            use: getStyleLoaders(
                                isDev,
                                {
                                    importLoaders: 2,
                                    // css modules
                                    modules: {
                                        getLocalIdent: getLocalIdentFn(isDev),
                                    },
                                },
                                {
                                    loader: 'less-loader',
                                    options: {
                                        sourceMap: isDev,
                                    },
                                }
                            ),
                        },
                        {
                            test: /\.(svg|jpe?g|png|gif|ico)$/,
                            use: {
                                loader: 'url-loader',
                                options: {
                                    // 配置
                                    outputPath: 'images/', // 输出到images文件夹下
                                    regExp: /(\/src|\/node_modules)([^.]+)/,
                                    name(file) {
                                        // 以源文件名字及格式输出
                                        if (isDev) {
                                            return '[name].[ext]';
                                        }
                                        return '[name].[hash:8].[ext]';
                                    },
                                    limit: imageInlineSizeLimit, // 超过10kb打包为图片
                                },
                            },
                        },
                        {
                            test: /\.(eot|ttf|woff2?)$/,
                            use: {
                                loader: 'file-loader',
                                options: {
                                    // 配置
                                    outputPath: 'fonts/', // 输出到fonts文件夹下
                                    regExp: /(\/src|\/node_modules)([^.]+)/, // remove `src`|`node_modules` from path
                                    name(file) {
                                        // 以源文件名字及格式输出
                                        if (isDev) {
                                            return '[name].[ext]';
                                        }
                                        return '[name].[hash:8].[ext]';
                                    },
                                },
                            },
                        },
                        {
                            test: /\.(js|jsx)$/,
                            exclude: /node_modules/,
                            include: [
                                paths.appSrc,
                                // using babel to replace `import 'core-js/stable'` in react-app-polyfill
                                /react-app-polyfill/,
                            ],
                            use: [
                                {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            [
                                                '@babel/preset-env',
                                                {
                                                    useBuiltIns: 'usage',
                                                    corejs: '3',
                                                },
                                            ],
                                            '@babel/preset-react',
                                        ],
                                        plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties'],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        devServer: {},
        plugins: [
            new webpack.DefinePlugin(getEnv().stringified),
            new HtmlWebpackPlugin({
                template: paths.appHtml,
                inject: 'body',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
        ],
        resolve: {
            modules: [paths.appNodeModules],
            extensions: ['.js', '.jsx', '.css'],
            alias: {
                '@': paths.appSrc,
                src: paths.appSrc,
                public: paths.appPublic,
            },
            mainFiles: ['index', 'UI'],
        },
        stats: options.stats, // 打包日志发生错误和新的编译时输出
    };
};
