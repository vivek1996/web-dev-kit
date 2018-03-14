const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const less         = require('gulp-less');
const minifyCSS    = require('gulp-clean-css');

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
        .pipe(less())
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
    // Watch JS Files
    gulp.watch(['./src/js/*.js']).on('change', browserSync.reload);

    // Watch HTML Files
    gulp.watch("src/html/*.html").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    
});

// NPM Start
gulp.task('start', ['serve']);

// NPM RUN GITPAGES
gulp.task('gitpages', () => {

    gulp.src(['./src/*.html'])
        .pipe(gulp.dest("./Gitpages-Ready-Site"));

    gulp.src(['./src/js/*.js'])
        .pipe(gulp.dest("./Gitpages-Ready-Site/js/"));

    gulp.src(['./src/scss/*.scss'])
        .pipe(sass())
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./Gitpages-Ready-Site/css/"));

    gulp.src(['./src/less/*.less'])
        .pipe(less())
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./Gitpages-Ready-Site/css/"));

    gulp.src(['./src/css/*.css'])
        .pipe(gulp.dest("./Gitpages-Ready-Site/css/"));

});