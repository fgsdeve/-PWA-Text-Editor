const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    stats:{children: true},
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        title: 'JATE'
      }),
     /*  new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }), */
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
   /*  resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "http": require.resolve("stream-http"),
        "url": require.resolve("url"),
        "querystring": require.resolve("querystring-es3"),
        "assert": require.resolve("assert/"),
        "vm": require.resolve("vm-browserify"),
        "fs": false,
        "net": false,
        "tls": false,
        "async_hooks": false
      }
    }, */
  };
};
