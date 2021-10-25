const { src, dest, watch, parallel, series } = require('gulp');

// get variables
//** or for scss we can use other method
/*  import dartSass from 'sass'
    import gulpSass from 'gulp-sass'
    const sass = gulpSass(dartSass)
*/
const scss       = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del          = require('del');
const fileinclude  = require('gulp-file-include'); 
const ttf2woff     = require('gulp-ttf2woff');
const ttf2woff2    = require('gulp-ttf2woff2');
const imagemin     = require('gulp-imagemin');

let fs = require('fs');

// for reload browser when did some change
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
}

// for clean dist folder 
function cleanDist() {
  return del('dist')
}

// for min images and sage good quality
function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

// for get html files and concat it
function html() {
  return src(['app/*.html', '!app/_*.html'])
    .pipe(fileinclude())
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
}

// forking with scripts and min their
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.min.js',
    'app/js/main.js'
  ])
  .pipe(fileinclude())
  // before we min js filse we should contac all of them
  .pipe(concat('main.min.js'))
  // after min them
  .pipe(uglify())
  // after send all of them in app/js folder
  .pipe(dest('dist/js'))
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
    // add prefixes for older browsers
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    // send the finish css file to the src
    .pipe(dest('dist/css'))
    // now tracking these file by using browserSync
    .pipe(browserSync.stream())
}

// convert .ttf2woff to woff2
function fonts() {
  src("app/fonts/*.ttf")
    .pipe(ttf2woff())
    .pipe(dest('dist/fonts/'));
  return src("app/fonts/*.ttf")
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts/'));
}

// get all fonts and add path for them
function fontsStyle() {
  let fileContent = fs.readFileSync('app/scss/fonts.scss');
  console.log(fileContent)
  if (fileContent == '') {
    fs.writeFile('app/scss/fonts.scss', '', cb);
    return fs.readdir('dist/fonts/', function (err, items) {
      if (items) {
        let cFontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (cFontname != fontname) {
            fs.appendFile('app/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          cFontname = fontname;
        }
      }
    })
  }
}

function cb() {}

// for build files in dist folder production
// function build() {
//   return src([
//     'app/css/style.min.css',
//     'app/fonts/**/*',
//     'app/js/main.min.js',
//     '!app/_*.html'
//   ], {base: 'app'})
//   .pipe(dest('dist/'))
// }

// function for tracking changes
function watching() {
  // gulp.watch starting to track the files and 
  watch(['app/*.html'], html);
  // start using styles if it need
  watch(['app/scss/**/*.scss'], styles);
  // tracking all files js exept !main.min.js
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  // tracking after all images
  watch('app/images/**/*.{jpg,png,svg,gif,ico,webp}', images);
  // reload browser when has some changing in html file
  watch(['app/*.html']).on('change', browserSync.reload);
}

let build   = series(cleanDist, parallel(scripts, styles, html, images, fonts), fontsStyle); 
// when we starting gulp by write gulp the both function will be strated
exports.default = parallel(build, watching, browsersync);

exports.html        = html;
exports.fonts       = fonts;
exports.fontsStyle  = fontsStyle;
exports.styles      = styles;
exports.watching    = watching;
exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.imagemin    = imagemin;
exports.cleanDist   = cleanDist;
exports.build       = build;


// async function builds() { scss() };
// export { builds };