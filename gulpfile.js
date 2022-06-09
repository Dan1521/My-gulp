const {src, dest} = require("gulp"),
    gulp = require("gulp"),
    rename = require("gulp-rename"),
    prefixe = require("gulp-autoprefixer"),
    cssnano = require("gulp-clean-css"),
    del = require("del"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    fileinclude = require("gulp-file-include"),
    sass = require("gulp-sass")(require("sass")),
    group_media = require("gulp-group-css-media-queries"),
    svgmin = require("gulp-svgmin"),
    cheerio = require("gulp-cheerio"),
    replace = require("gulp-replace"),
    sprite = require("gulp-svg-sprite"),
    fonter = require("gulp-fonter"),
    webp = require("gulp-webp"),
    browserSync = require("browser-sync").create();



const srcPath = 'src/';
const distPath = 'dist/';

const path = {
    build: {
        html:   distPath,
        js:     distPath + "assets/js/",
        css:    distPath + "assets/css/",
        images: distPath + "assets/images/",
        svg: distPath + "assets/images/sprite/",
        fonts:  distPath + "assets/fonts/"
    },
    src: {
        html:   srcPath + "*.html",
        js:     srcPath + "assets/js/*.js",
        css:    srcPath + "assets/scss/*.scss",
        svg: srcPath + "assets/images/sprite/*.svg",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf}"
    },
    watch: {
        html:   srcPath + "**/*.html",
        js:     srcPath + "assets/js/**/*.js",
        css:    srcPath + "assets/scss/**/*.scss",
        images: srcPath + "assets/images/**/*.{jpg,png,gif,svg,ico,svg,webp}",
        svgSprite: srcPath + "assets/images/sprite/*.svg",
        svg: srcPath + "assets/images/svg/*.svg",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf}"
    },
    clean: "./" + distPath
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath,
            notify: false,
            online: false,
        }
    });
}

function html(cd){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
    cd();
}

function fonts(cd){
    return src(path.src.fonts)
        .pipe(fonter({
            subset: [66,67,68, 69, 70, 71],
            formats: ['woff']
        }))
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({stream: true}));
    cd()
}
function css(cd){
    return src([
      srcPath + "assets/scss/*.scss",
      srcPath + "assets/scss/vendors/*.scss",
    ])
    .pipe(sass({
        includePaths: './node_modules/'
    }))
    .pipe(prefixe({
        browsers: ['last 4 versions'],
        grid: true,
    }))
    .pipe(group_media())
    // .pipe(cssnano())
    // .pipe(rename({
    //     suffix: ".min",
    //     extname: ".css"
    // }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({stream: true}));

    cd();
}


function js(cd){
    return src([
      srcPath + "assets/js/*.js",
      srcPath + "assets/js/libs/*.js",
    ])
      // .pipe(uglify())
      // .pipe(rename({
      //     suffix: ".min",
      // }))
      .pipe(dest(path.build.js))
      .pipe(browserSync.reload({stream: true}));
  cd();
}

function images(cd){
    return src([
        'src/assets/images/**/*.png',
        'src/assets/images/**/*.jpg',
        'src/assets/images/**/*.webp',
    ])
        .pipe(webp())
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({stream: true}));
    cd()
}
function svgOptimiz(cd) {
    return src([
        'src/assets/images/svg/*.svg',
    ])
        .pipe(svgmin({
            s2svg: {
                pretty: true,
            }
        }))
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({ stream: true }));
    cd()
}

function svgSprite(cd){
    return src(path.src.svg)
        .pipe(svgmin({
            s2svg: {
                pretty: true,
              }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(sprite({
            mode: {
                symbol:{
                    sprite: "../sprite.svg"
                }
            },
        }))
        .pipe(dest(path.build.svg))
        .pipe(browserSync.reload({stream: true}));
    cd();
}

function clean(cb) {
    return del(path.clean);
    cb();
}

function watchFiles() {
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.svg], svgOptimiz);
    gulp.watch([path.watch.fonts], fonts);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.svgSprite], svgSprite);
}

const build = gulp.series(clean, gulp.parallel(css, html, images, svgOptimiz, fonts, js, svgSprite));
const watch = gulp.parallel(server, watchFiles, build);

exports.html = html;
exports.clean = clean;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.js = js;
exports.svgSprite = svgSprite;
exports.svgOptimiz = svgOptimiz;

exports.watch = watch;
exports.build = build;
exports.default = watch;