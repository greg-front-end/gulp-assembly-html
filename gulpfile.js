const { src, dest, watch, parallel } = require('gulp');

// get variables
const scss       = require('gulp-sass')(require('sass'));
//** or for scss we can use other method
/*  import dartSass from 'sass'
    import gulpSass from 'gulp-sass'
    const sass = gulpSass(dartSass)
*/
const concat      = require('gulp-concat');
const browserSync = require('browser-sync').create();

// for reload browser when did some change
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

// the function for convert scss to css
function styles() {
  // get src of scss
  return src('app/scss/style.scss')
    // convert to css by using gulp-sass
    .pipe(scss({outputStyle: 'compressed'})) // for default expanded
    // rename file css
    .pipe(concat('style.min.css'))
    // send the finish css file to the src
    .pipe(dest('app/css'))
    // now tracking these file by using browserSync
    .pipe(browserSync.stream())
}

// function for tracking changes
function watching() {
  // gulp.watch starting to track the files and 
  // start using styles if it need
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles   = styles;
exports.watching = watching;
exports.browsersync = browsersync;

// when we starting gulp by write gulp the both function will be strated
exports.default = parallel(browsersync, watching);

// async function builds() { scss() };
// export { builds };