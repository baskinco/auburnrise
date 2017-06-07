var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('cssnano'),

    source = 'development/',
    dest = 'production/';


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
    .pipe(gulp.dest(dest + 'JS'));

    gulp.src(source + 'JS/libs/*.js')
    .pipe(gulp.dest(dest + 'JS/libs/'));
});

// CSS
gulp.task('css', function() {
    gulp.src(source + '**/*.css')
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
});

// Run a livereload web server because lazy
gulp.task('webserver', function() {
    gulp.src(dest)
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['html', 'javascript', 'css', 'watch', 'webserver']);
