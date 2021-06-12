/* eslint-disable import/no-extraneous-dependencies */
const mix = require('laravel-mix');
const ESLintPlugin = require('eslint-webpack-plugin');
require('dotenv').config();
const webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const dotEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
        APP_NAME: JSON.stringify(process.env.APP_NAME || 'Default app name'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
});

const { APP_DOMAIN, SERVER_PORT } = process.env;

mix
    .webpackConfig({ plugins: [new ESLintPlugin(), dotEnvPlugin] })
    .sourceMaps(false, 'source-map')
    .copyDirectory('resources/_public', 'public')
    .copyDirectory('resources/img', 'public/img')
    .js('resources/js/index.js', 'public/js')
    .postCss('resources/css/index.css', 'public/css', [])
    .react()
    .browserSync({ proxy: `${APP_DOMAIN}:${SERVER_PORT}`, ui: false, open: 'external', host: APP_DOMAIN });
