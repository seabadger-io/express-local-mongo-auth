const gulp = require('gulp');
const eslint = require('gulp-eslint');
const spawn = require('child_process').spawn;
let serverapp;

gulp.task('server', () => {
  if (serverapp) serverapp.kill();
  serverapp = spawn('./bin/www', { stdio: 'inherit' });
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!public/javascripts/*.js'])
      .pipe(eslint())
      .pipe(eslint.format());
      // .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint', 'server'], () => {
});

gulp.task('watch', ['lint', 'server'], () => {
  gulp.watch(['./**/*.js'], ['lint', 'server']);
});

process.on('exit', () => {
  if (serverapp) serverapp.kill();
});
