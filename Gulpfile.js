var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('cssnano'),
    image = require('gulp-image'),
    cache = require('gulp-cached'),
    plumber = require('gulp-plumber'),

    source = 'development/',
    dest = 'production/';

// Optimize images through gulp-image
gulp.task('imageoptim', function() {
  gulp.src(source + 'images/**/*')
  .pipe(cache(image()))
  .pipe(gulp.dest(dest + 'images'));
});

// HTML
gulp.task('html', function() {
    gulp.src(source + '*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(gulp.dest(dest));
});

// JavaScript
gulp.task('javascript', function() {
    gulp.src(source + 'JS/*.js')
        .pipe(plumber())
        .pipe(gulp.dest(dest + 'JS'));
});

// CSS
gulp.task('css', function() {
    gulp.src(source + '**/*.css')
        .pipe(plumber())
        .pipe(postcss([
            precss(),
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest(dest));
});

// Watch everything
gulp.task('watch', function() {
    gulp.watch(source + '**/*.html', ['html']);
    gulp.watch(source + 'JS/**/*.js', ['javascript']);
    gulp.watch(source + '**/*.css', ['css']);
    gulp.watch(source + 'images/**', ['imageoptim']);
});

// Run a livereload web server because lazy
gulp.task('webserver', function() {
    gulp.src(dest)
    .pipe(webserver({
        livereload: true,
        open: true,
        host: '10.0.4.50s'
    }));
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['html', 'javascript', 'css', 'watch', 'webserver']);
