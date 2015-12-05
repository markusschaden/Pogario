import gulp from 'gulp'

gulp.task('static', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
})
