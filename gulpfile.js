// ================================
// ================================
// ================================
// ================================
// === START ======================
// ================================
// ================================
// ================================
// ================================
// ================================

// === LOAD ALL PACKAGE.JSON PLUGIN
// ================================
// ================================
var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')();
var combineMq = require('gulp-combine-mq');
var critical  = require('critical');
// ================================
// ================================
// ================================

// === VARIABLES ==================
// ================================
// ================================
var sourcePath         = './src/';
var sourcePathCSS      =  sourcePath + './css/';
var sourcePathLESS     =  sourcePath + './css/less/';
var sourcePathJS       =  sourcePath + './js/';
var sourcePathImg      =  sourcePath + './img/';

var destinationPath    = './build/';
var destinationPathCSS = destinationPath + './css/';
var destinationPathJS  = destinationPath + './js/';
var destinationPathImg = destinationPath + './img/';


// Tâche de gestion des erreurs à la volée
var onError = {
    errorHandler: function (err) {
        $.util.beep();
        console.log(err);
        this.emit('end');
    }
};


// ================================
// ================================
// ================================



// === STYLES =====================
// ================================
// ================================
gulp.task('buildCSS', function () {
    return gulp.src(sourcePathLESS + '*.less')

        // Prevent pipe breaking caused by errors from gulp plugins.
        .pipe(plugins.plumber(onError))

        // Source map support.
        .pipe(plugins.sourcemaps.init())

        // Compile LESS file.
        .pipe(plugins.less())

        // Generates pixel fallbacks for rem units.
        .pipe(plugins.pixrem({
            rootValue : '10px'
            // browsers  : 'last 2 versions'
        }))

        // Makes your code beautiful.
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify())

        // Parse CSS and add vendor prefixes.
        .pipe(plugins.autoprefixer())

        // To write external source map files.
        .pipe(plugins.sourcemaps.write('../css/'))

    .pipe(gulp.dest(sourcePathCSS));
});

gulp.task('optimCSS', function () {
    return gulp.src(sourcePathCSS + '*.css')

        // Prevent pipe breaking caused by errors from gulp plugins.
        .pipe(plugins.plumber(onError))

        // Combine matching media queries into one.
        .pipe(plugins.combineMq({
            beautify : false
        }))

        // Remove unused CSS.
        .pipe(plugins.uncss({
            html : [sourcePath + '*.html']
        }))

        // CSS minimizer unlike others.
        .pipe(plugins.csso())

        .pipe(plugins.rename({
            suffix : '.min'
        }))

    .pipe(gulp.dest(destinationPathCSS));
});
// ================================
// ================================
// ================================

gulp.task('critical', ['prod'], function (cb) {
    critical.generate({
        inline  : true,
        base    : 'build/',
        css     : 'build/css/app.min.css',
        src     : 'index.html',
        dest    : 'build/index-min.html',
        minify  : true,
        width   : 768,
        height  : 1024,
        extract : false,
        ignore  : ['font-face']
    });
});


// === HTML ======================
// ================================
// ================================
gulp.task('optimHTML', function() {
    return gulp.src(sourcePath + '*.html')

        // Prevent pipe breaking caused by errors from gulp plugins.
        .pipe(plugins.plumber(onError))

        // Minify HTML.
        .pipe(plugins.htmlmin({
            removeComments              : true,
            collapseWhitespace          : true,
            conservativeCollapse        : true,
            collapseInlineTagWhitespace : true,
            removeEmptyAttributes       : true
        }))

        // Extracts & inlines critical-path (above-the-fold) CSS from HTML.
        // .pipe(critical({
        //     inline : true,
        //     width  : 320,
        //     height : 480,
        //     minify : true
        // }))



    .pipe(gulp.dest(destinationPath))
});
// ================================
// ================================
// ================================




// === SCRIPT =====================
// ================================
// ================================
gulp.task('buildJS', function() {
    return gulp.src(sourcePathJS + '*.js')

        // Prevent pipe breaking caused by errors from gulp plugins.
        .pipe(plugins.plumber(onError))

        .pipe(plugins.uglify())

        .pipe(plugins.concat('script.min.js'))

    .pipe(gulp.dest(destinationPathJS));
});
// ================================
// ================================
// ================================



// === IMAGES OPTIMISATION ========
// ================================
// ================================
gulp.task('buildImg', function () {
    return gulp.src(sourcePathImg + '*.{png,jpg,jpeg,gif,svg}')

        // Prevent pipe breaking caused by errors from gulp plugins.
        .pipe(plugins.plumber(onError))

        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [plugins.imagemin-pngquant()]
        }))

    .pipe(gulp.dest(destinationPathImg));
});
// ================================
// ================================
// ================================







// === MAIN TASK LAUNCHER =========
// ================================
// ================================
// === DEV ========================
// ================================
gulp.task('default', ['buildCSS']);
// ================================
// === PROD =======================
// ================================
gulp.task('prod', ['buildCSS', 'optimCSS', 'optimHTML']);
// ================================
// === WATCH ======================
// ================================
gulp.task('watch', function () {
    gulp.watch(sourcePathLESS + '**/*.{less,css}', ['buildCSS']);
    // gulp.watch(sourcePath + '*.html', ['html']);
});
// ================================
// ================================
// ================================
// ================================



