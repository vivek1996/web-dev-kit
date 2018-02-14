const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const less         = require('gulp-less');
const LESSreporter = require('gulp-less-reporter');
const minifyCSS    = require('gulp-clean-css');
const cssSCSS      = require('gulp-css-scss');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Compile Less & Inject Into Browser
gulp.task('less', function() {
    return gulp.src(['src/less/*.less'])
        .pipe(less()).on('error', LESSreporter)
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Watch & Serve
gulp.task('serve', ['sass' , 'less'], function() {
    browserSync.init({
        server: "./src"  
    });

    // Watch SCSS Files
    gulp.watch(['src/scss/*.scss'], ['sass']).on('change', browserSync.reload);

    // Watch LESS Files
    gulp.watch(['src/less/*.less'], ['less']).on('change', browserSync.reload);

    // Watch CSS Files
    gulp.watch(['src/css/*.css']).on('change', browserSync.reload);

    // Watch PHP Files
    gulp.watch(['src/*.php']).on('change', browserSync.reload);
    gulp.watch(['src/php/*.php']).on('change', browserSync.reload);

    // Watch JS Files
    gulp.watch(['./src/js/*.js']).on('change', browserSync.reload);

    // Watch HTML Files
    gulp.watch("src/html/*.html").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    
});

// NPM Start
gulp.task('start', ['serve']);