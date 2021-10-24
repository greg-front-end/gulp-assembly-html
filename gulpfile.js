const { src, dest } = require('gulp');

// get variables
const scss = require('gulp-sass');

// create function for convert scss to css
function styles() {
  // get src of scss
  return src('app/scss/style.scss')
    // convert to css by using gulp-sass
    .pipe(scss())
    // send the finish css file to the src
    .pipe(dest('app/css'));
}

exports.styles = styles;