const gulp    = require("gulp");
const webpack = require("webpack-stream");
const sass    = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");

const dist = "app/admin/";
const prod = "./admin/";

function html()
{
    return gulp.src("src/index.html")
               .pipe(gulp.dest(dist));
}

function jsbuild()
{
    return gulp.src("src/main.js")
               .pipe(webpack(
                {
                    mode: "development",
                    output: {filename: "script.js" },
                    devtool: "source-map",
                    module:
                    {
                        rules:
                        [
                            {
                                test: /\.m?js$/,
                                exclude: /(node_modules)/,
                                use:
                                    {
                                        loader: 'babel-loader',
                                        options:
                                        {
                                            presets:
                                            [
                                                ["@babel/preset-env",
                                                    {
                                                       debug: true,
                                                       corejs: 3,
                                                       useBuiltIns: "usage" 
                                                    }
                                                ],
                                                "@babel/preset-react"
                                            ]
                                        }
                                    }
                            }
                        ]
                    }                      
                }))
               .pipe(gulp.dest(dist));
}

function scss()
{
    return gulp.src("src/scss/style.scss")
               .pipe(sass().on("error", sass.logError))
               .pipe(gulp.dest(dist)); 
}

function api()
{
    gulp.src("src/api/.*")
        .pipe(gulp.dest(`${dist}/api`));

    return gulp.src("src/api/*.*")
               .pipe(gulp.dest(`${dist}/api`));
}

function assets()
{
    return gulp.src("src/assets/*.*")
               .pipe(gulp.dest(`${dist}/assets`));
}

function production()
{
    gulp.src("src/index.html")
        .pipe(gulp.dest(prod));

    gulp.src("src/api/.*")
        .pipe(gulp.dest(`${prod}/api`));
    gulp.src("src/api/*.*")
        .pipe(gulp.dest(`${prod}/api`));

    gulp.src("src/assets/*.*")
        .pipe(gulp.dest(`${prod}/assets`));

    gulp.src("src/main.js")
        .pipe(webpack(
            {
                mode: "production",
                output: {filename: "script.js" },                
                module:
                {
                    rules:
                    [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules)/,
                            use:
                            {
                                loader: 'babel-loader',
                                options:
                                {
                                    presets:
                                    [
                                        ["@babel/preset-env",
                                            {                                                
                                                corejs: 3,
                                                useBuiltIns: "usage" 
                                            }
                                        ],
                                        "@babel/preset-react"
                                    ]
                                }
                            }
                        }
                    ]
                }                      
            }))
        .pipe(gulp.dest(prod));

    return gulp.src("src/scss/style.scss")
               .pipe(sass().on("error", sass.logError))
               .pipe(postcss([autoprefixer]))
               .pipe(cleanCSS())
               .pipe(gulp.dest(prod));

}

function watch()
{
    gulp.watch("src/*.html", html);
    gulp.watch("src/**/*.js", jsbuild);
    gulp.watch("src/scss/*.scss", scss);
    gulp.watch("src/api/.*", api);
    gulp.watch("src/api/*.*", api);
    gulp.watch("src/assets/*.*", assets);
}

module.exports =
{
    html, scss, jsbuild, api, assets, watch, production,
    default: gulp.series(gulp.parallel(html, scss, jsbuild, api, assets), watch)
};
