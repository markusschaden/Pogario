import babelify from 'babelify'
import browserify from 'browserify'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import buffer from 'vinyl-buffer'
import shim from 'browserify-shim'
import source from 'vinyl-source-stream'

gulp.task('scripts', function () {
  return browserify({
      entries: 'src/index.js',
      debug: true,
    })
    .transform(babelify, {
      presets: ['es2015']
    })
    .transform(shim)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', (err) => {
      gutil.log(err.message)
      notifier.notify({
        title: 'Building Scripts Failed',
        message: err.message
      })
      this.emit('end')
    })
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist'))
})
