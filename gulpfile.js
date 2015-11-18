var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var babel = require("gulp-babel");

var nodemon = require("gulp-nodemon");
var livereload = require('gulp-livereload');

var babelify = require('babelify');

var path = {
  HTML: 'index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'public/js',
  DEST_SRC: 'public/js',
  ENTRY_POINT: 'app-fe.js'
};

gulp.task('copy', function () {
  gulp.src(path.HTML)
      .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function () {
  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher
  .on('update', function () {
    console.log('Updated');

    watcher
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC))
        .pipe(livereload());
  }).on('bytes', function (bytes) {
    console.log('bytes');
  })
  .on('error', function (err) {
    console.log('error');
  })
      .transform(babelify)
      .bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function () {
  browserify({
    entries: [path.ENTRY_POINT],
    debug: true
  })
      .transform(babelify)
      .bundle()
      .pipe(source(path.MINIFIED_OUT))
      .pipe(streamify(uglify(path.MINIFIED_OUT)))
      .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function () {
  gulp.src(path.HTML)
      .pipe(htmlreplace({
        'js': 'build/' + path.MINIFIED_OUT
      }))
      .pipe(gulp.dest(path.DEST));
});

gulp.task('watch-server', function () {
  livereload({
    start:true,
    port:34322
  });

  nodemon({
    script: 'server.js',
    ext: 'jsx',
    ignore: ['app-fe.js', 'bin/**/*', 'public/**/*', 'node_modules/**/*.js'],
    env: {'NODE_ENV': 'development'}
  })
  .on('restart', function () {
    console.log('server restarted');

    gulp.src('bundle.js')
        .pipe(livereload());
  })
  .on('start', function () {
    console.log('server started');
  })
  .on('crash', function () {
    console.log('server crashed');
  })
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch']);