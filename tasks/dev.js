import gulp from 'gulp'
import watch from 'gulp-watch'

gulp.task('dev', ['build'], function (cb) {
  gulp.start('serve')

  watch('src/**/*.js', () => {
    gulp.start('scripts')
  })

  watch('src/index.html', () => {
    gulp.start('static')
  })
})
