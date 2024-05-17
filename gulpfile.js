
const { watch, series, parallel, src,dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass')(require('sass'));
const rename =require('gulp-rename');

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}



function buildStyles() {
    return src('src/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('src/'));
  };

function productionBuild() {
    return src('src/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('./output'));

};

exports.productionBuild=productionBuild;

exports.buildStyles = buildStyles;

exports.build = series(clean, parallel(css, javascript));

exports.default = function() {

    series(clean, parallel(css, javascript));
    buildStyles();
    // You can use a single task
    watch('src/*.css', parallel(css));
    // Or a composed task
    watch('src/*.js', series(clean, javascript));

return src('src/*.js')
    .pipe(babel())
    .pipe(src('src/*.js'))
    .pipe(dest('src/')).pipe(livereload({ basePath:'./src/', start: true }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'))
    
};
