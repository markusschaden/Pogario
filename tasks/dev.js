import gulp from 'gulp'
import watch from 'gulp-watch'
import webserver from 'gulp-webserver'

gulp.task('dev', ['build'], function (cb) {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      host: '0.0.0.0',
      port: 3000
    }))

  watch('src/**/*.js', () => {
    gulp.start('scripts')
  })

  watch('src/index.html', () => {
    gulp.start('static')
  })
})
