import gulp from 'gulp'
import webserver from 'gulp-webserver'

gulp.task('serve', function () {
  gulp.src('dist')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 3000
    }))
})
