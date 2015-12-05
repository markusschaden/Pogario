import gulp from 'gulp'
import gutil from 'gulp-util'
import less from 'gulp-less'
import sourcemaps from 'gulp-sourcemaps'

gulp.task('styles', function () {
  return gulp.src('app/index.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: ['node_modules']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
})
