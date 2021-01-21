const { src, watch, dest, parallel } = require("gulp");
const sass = require("gulp-sass");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const imageminJpg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");
const imageminGif = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");

// sassコンパイル
const compileSass = () =>
  src("scss/app.scss")
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(dest("dist/css"));

// css(圧縮)
const compileCss = () =>
  src("dist/css/app.css")
    .pipe(cleancss())
    .pipe(rename({
      extname:'.min.css'
    }))
    .pipe(dest("dist/css"));

// js(圧縮)
const compileJs = () =>
  src("js/app.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(dest("dist/js"));

// 画像圧縮
const img = () =>
  src("img/*.+(jpg|jpeg|JPG|png|PNG|gif|svg)") //画像を指定
    .pipe(changed("dist/img")) //変更があるかチェック
    .pipe(
      imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
          interlaced: false,
          optimizationLevel: 3,
          colors: 180
        }),
        imagemin.svgo()
      ])
    )
    .pipe(dest("dist/img")); //同じ場所に書き出し

// sassファイル監視(コンパイル)
const watchSassFiles = () => watch("scss/app.scss", compileSass);
// cssファイル監視(圧縮)
const watchCssFiles = () => watch("dist/css/app.css", compileCss);
// jsファイル監視(圧縮)
const watchJsFiles = () => watch("js/app.js", compileJs);
// 画像圧縮監視
const watchImg = () => watch("img/*.(jpg|jpeg|JPG|png|PNG|gif|svg)", img);

exports.default = parallel(watchSassFiles, watchJsFiles, watchImg, watchCssFiles);
