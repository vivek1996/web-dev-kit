const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const less         = require('gulp-less');
const minifyCSS    = require('gulp-clean-css');
const git          = require('gulp-git');
const gitPush      = require('gulp-git-push');

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

// Git Add
gulp.task('git', function() {
    return gulp.src(['src/*'])
    .pipe(git.add());
});

// Watch & Serve
gulp.task('serve', ['sass' , 'less'], function() {

    browserSync.init({
        server: "./src"  
    }, (err) => {
        console.log(err);
    });

    // Watch SCSS Files
    gulp.watch(['src/scss/*.scss'], ['sass', 'git']).on('change', browserSync.reload);

    // Watch LESS Files
    gulp.watch(['src/less/*.less'], ['less', 'git']).on('change', browserSync.reload);

    // Watch CSS Files
    gulp.watch(['src/css/*.css'], ['git']).on('change', browserSync.reload);

    // Watch JS Files
    gulp.watch(['./src/js/*.js'], ['git']).on('change', browserSync.reload);

    // Watch HTML Files
    gulp.watch(['src/*.html', 'src/html/*.html', 'src/*.htm', 'src/html/*.htm', 'src/htm/*.html', 'src/htm/*.htm'], ['git']).on('change', browserSync.reload);
    
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