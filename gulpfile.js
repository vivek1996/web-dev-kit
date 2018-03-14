const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const scss         = require('gulp-sass');
const less         = require('gulp-less');
const minifyCSS    = require('gulp-clean-css');
const git          = require('gulp-git');
const gitPush      = require('gulp-git-push');
const ts           = require('gulp-typescript');
const coffee       = require('gulp-coffeescript');

const settings     = JSON.parse(require('./src/config'));

// Compile Sass
gulp.task('scss', function() {
    if(settings.css !== 'none' && settings.css !== 'less') {
        if(settings.cssMinify === true) {
            return gulp.src(['src/scss/*.scss'])
                .pipe(scss())
                .pipe(minifyCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest("src/css"))
                .pipe(browserSync.stream());
        } else {
            return gulp.src(['src/scss/*.scss'])
                .pipe(scss())
                .pipe(gulp.dest("src/css"))
                .pipe(browserSync.stream());
        }
    }
});

// Compile Less
gulp.task('less', function() {
    if(settings.css !== 'none' && settings.css !== 'scss') {
            if(settings.cssMinify === true) {
                return gulp.src(['src/less/*.less'])
                    .pipe(less())
                    .pipe(minifyCSS({compatibility: 'ie8'}))
                    .pipe(gulp.dest("src/css"))
                    .pipe(browserSync.stream());
            } else {
                return gulp.src(['src/less/*.less'])
                    .pipe(less())
                    .pipe(gulp.dest("src/css"))
                    .pipe(browserSync.stream());
            }
    }
});

// Compile TypeScript
gulp.task('ts', function() {
    if(settings.js !== 'none' && settings.js !== 'coffee') {
        return gulp.src(['src/ts/*.ts'])
            .pipe(ts())
            .pipe(gulp.dest('src/js'))
            .pipe(browserSync.stream());
    }
});

// Compile CoffeeScript
gulp.task('coffee', function() {
    if(settings.js !== 'none' && settings.js !== 'ts') {
        return gulp.src(['src/coffee/*.coffee'])
            .pipe(coffee())
            .pipe(gulp.dest('src/js'))
            .pipe(browserSync.stream());
    }
});

// Git Add
gulp.task('git', function() {
    return gulp.src(['src/*'])
    .pipe(git.add());
});

// Watch & Serve
gulp.task('serve', ['scss' , 'less'], function() {

    browserSync.init({
        server: "./src"  
    }, (err) => {
        console.log(err);
    });

    // Watch SCSS Files
    gulp.watch(['src/scss/*.scss'], ['scss', 'git']).on('change', browserSync.reload);

    // Watch LESS Files
    gulp.watch(['src/less/*.less'], ['less', 'git']).on('change', browserSync.reload);

    // Watch TypeScript Files
    gulp.watch(['src/ts/*.ts'], ['ts', 'git']).on('change', browserSync.reload);

    // Watch CoffeeScript Files
    gulp.watch(['src/ts/*.ts'], ['ts', 'git']).on('change', browserSync.reload);

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
gulp.task('gitpages', ['less', 'scss', 'git', 'ts', 'coffee'], () => {

    gulp.src(['./src/*.html'])
        .pipe(gulp.dest("./Gitpages-Ready-Site"));

    gulp.src(['./src/js/*.js'])
        .pipe(gulp.dest("./Gitpages-Ready-Site/js/"));

    gulp.src(['./src/css/*.css'])
        .pipe(gulp.dest("./Gitpages-Ready-Site/css/"));

});