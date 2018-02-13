const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const less        = require('gulp-less');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Compile Less & Inject Into Browser
gulp.task('less', function() {
    return gulp.src(['src/less/*.less'])
        .pipe(less())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass' , 'less'], function() {
    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);

    gulp.watch(['src/less/*.less'], ['less']);
    gulp.watch("src/*.html").on('change', browserSync.reload);

    gulp.watch(['src/css/*.css']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    
});

// NPM Start
gulp.task('start', ['serve']);