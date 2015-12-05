import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('build', function (cb) {
  runSequence(['scripts', 'styles', 'static'], cb)
})
