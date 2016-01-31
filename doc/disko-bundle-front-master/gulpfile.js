// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var cmq = require('gulp-combine-media-queries');

// Some vars

var srcPath      = 'src/';
var buildPath    = 'build/';
var bowerPath    = 'bower_components/';
var srcJsPath    = srcPath + 'js/';
var srcCssPath   = srcPath + 'css/'
var srcSassPath  = srcCssPath + 'sass/';
var buildJsPath  = buildPath + 'js/';
var buildCssPath = buildPath + 'css/';

var browsersPrefix = ['> 0%'];


/***********************
 * STYLES
 ***********************/
// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(srcSassPath + '*.scss')
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(srcCssPath));
});

// Autoprefix rules
gulp.task('autoprefixer', ['sass'], function () {
    return gulp.src(srcCssPath + 'styles.css')
        .pipe(autoprefixer({
            browsers: browsersPrefix,
            cascade: false
        }))
        .pipe(rename({suffix: '.vendor'}))
        .pipe(gulp.dest(srcCssPath));
});


gulp.task('cmq',  ['autoprefixer'], function () {
    return gulp.src(srcCssPath + 'styles.vendor.css')
    .pipe(cmq({
      log: true
    }))
    .pipe(rename('styles.vendor.queries.css'))
    .pipe(gulp.dest(srcCssPath));
});


gulp.task('styles', ['cmq'], function() {
    return  gulp.src([
                srcCssPath + 'styles.vendor.queries.css',
                bowerPath  + 'bootstrap/dist/css/bootstrap.min.css'
            ])
            .pipe(concat('styles.css'))
            .pipe(gulp.dest(buildCssPath))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(buildCssPath));
});



/***********************
 * SCRIPTS
 ***********************/
// Lint Task
gulp.task('lint', function() {
    return gulp.src(srcJsPath + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        bowerPath + 'modernizr/dist/modernizr-build.js',
        bowerPath + 'jquery/dist/jquery.min.js',
        srcJsPath + 'script.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(buildJsPath))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildJsPath));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(srcSassPath + '**/*.scss', ['styles']);
    gulp.watch(srcJsPath + '**/*.js', ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['styles', 'scripts', 'watch']);