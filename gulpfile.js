var gulp = require('gulp'),
  gutil = require('gulp-util'),
  path = require('path');

var runSequence = require('run-sequence');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var minifyCss = require('gulp-minify-css');
var stylus = require('gulp-stylus');
var prefix = require('gulp-autoprefixer');
var nib = require('nib');
var rupture = require('rupture');


var jade = require('gulp-jade');


var srcFolder = path.join(__dirname, 'src'),
  buildFolder = __dirname;


gulp.task('css', function() {
  var stylusCompiler = stylus({
    use: [ nib(), rupture() ]
  })

  return gulp.src( path.join(srcFolder, 'stylus', 'app.styl') )
    .pipe( stylusCompiler )
    .on('error', function(err) {
      gutil.log(err.stack);
      stylusCompiler.end();
    })
    .pipe( prefix() )
    .pipe( minifyCss() )
    .pipe( gulp.dest(path.join(buildFolder, 'css')) )
});



gulp.task('jade', function() {
  return gulp.src( path.join(srcFolder, 'index.jade') )
    .pipe( jade({
      pretty: false,
    }))
    .pipe( gulp.dest(buildFolder) )
});



gulp.task('img', function() {
  return gulp.src( path.join(srcFolder, 'img', '*.*') )
    .pipe( gulp.dest(path.join(buildFolder, 'img')) )
});




gulp.task('js', function() {
  return gulp.src( path.join(srcFolder, 'js', 'app.js') )
    .pipe( babel() )
    .pipe( uglify() )
    .pipe( gulp.dest(path.join(buildFolder, 'js')) )
  ;
});



gulp.task('default', ['css', 'jade', 'img', 'js']);


gulp.task('watch', ['default'], function() {
  gulp.watch( path.join(srcFolder, 'img', '*.*'), ['img'] );
  gulp.watch( path.join(srcFolder, 'js', '*.*'), ['js'] );
  gulp.watch( path.join(srcFolder, 'stylus', '*.*'), ['css'] );
  gulp.watch( path.join(srcFolder, '*.jade'), ['jade'] );
});


