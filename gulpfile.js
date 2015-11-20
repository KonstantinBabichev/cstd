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
var lr = require('tiny-lr')();

var babelify = require('babelify');
var config = {
    LIVERELOAD_PORT : 35729,
    EXPRESS_ROOT : __dirname
};

var path = {
  HTML: 'index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'public/js',
  DEST_SRC: 'public/js',
  ENTRY_POINT: 'app-fe.js'
};

function startLivereload() {
  console.log('liveReload started on ' + config.LIVERELOAD_PORT);
  lr.listen(config.LIVERELOAD_PORT);
}

function onBundleUpdated() {
  console.log('Bundle Updated');
  //var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  lr.changed({
    body: {
      files: ['public\js\build.js']
    }
  })
}
gulp.task('watch-client', function () {
  startLivereload();

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher
      .on('update', function (e) {
        watcher
            .bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC))
            .on('end', onBundleUpdated);
      })
      .on('error', function (err) {
        console.log('error');
      })
      .on('bytes', function (err) {
        console.log('bytes');
      })
      .on('time', function (time) {
        console.log('time ' + time);
      })
      .on('log', function (err) {
        console.log('log');
      })
      .transform(babelify)
      .bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      .on('end', function () {
        console.log('Watching...');
      });
});

gulp.task('watch-server', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: [
        'node_modules/**/*.js',
        'bin/**/*',
        'public/**/*',
        'app-fe.js',
        'componets/**/*.js' // TODO : remove when express restart will became faster
    ],
    env: {'NODE_ENV': 'development'}
  })
      .on('restart', function () {
        console.log('server restarted');
      })
      .on('start', function () {
        console.log('server started');
      })
      .on('crash', function () {
        console.log('server crashed');
      })
      .on('error', function () {
        console.log('server error');
      })
});

gulp.task('build', function () {
  browserify({
    entries: [path.ENTRY_POINT],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  })
      .transform(babelify)
      .bundle()
      .pipe(source(path.MINIFIED_OUT))
      .pipe(streamify(uglify(path.MINIFIED_OUT)))
      .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('default', ['watch-server', 'watch-server']);
