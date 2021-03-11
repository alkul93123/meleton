const mix = require('laravel-mix');
const path = require('path');

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

mix.js('resources/js/app.js', 'public/js').vue()
    .sass('resources/sass/app.scss', 'public/css');

mix.js("resources/src/js/admin/app.js", "public/js/admin/app.js").vue()
    .sass("resources/src/sass/app-admin.scss", "public/admin/css");

mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources"),
            // "@admin-mixins": path.resolve(__dirname,"resources/assets/admin/js/mixins"),
            "@admin-custom": path.resolve(
                __dirname,
                "resources/src/js/admin/components/custom/"
            ),
            "@admin-mixins": path.resolve(
                __dirname,
                "resources/src/js/admin/components/mixins/"
            ),
            "@admin": path.resolve(__dirname, "resources/src/js/admin/"),
        },
    },
});
