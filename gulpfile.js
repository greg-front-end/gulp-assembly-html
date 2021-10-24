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
const uglify      = require('gulp-uglify-es').default();

// for reload browser when did some change
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

// forking with scripts and min their
function scripts() {
  return src([
    'app/js/main.js'
  ])
  // before we min js filse we should contac all of them
  .pipe(concat(main.min.js))
  // after min them
  .pipe(uglify())
  // after send all of them in app/js folder
  .pipe(dest('app/js'))
  // after reload browser
  .pipe(browserSync.stream())
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
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles      = styles;
exports.watching    = watching;
exports.browsersync = browsersync;
exports.scripts     = scripts;

// when we starting gulp by write gulp the both function will be strated
exports.default = parallel(scripts, browsersync, watching);

// async function builds() { scss() };
// export { builds };