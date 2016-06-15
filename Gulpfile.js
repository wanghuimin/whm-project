/* jshint node:true */
'use strict';
// generated on 2015-01-25 using generator-gulp-webapp 0.2.0
var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var amdOptimize  = require('amd-optimize');
var filename     = require('gulp-asset-manifest');
var autoprefixer = require('gulp-autoprefixer');
var cssmin       = require('gulp-cssmin');
var rename       = require('gulp-rename');
var gutil        = require('gulp-util');
var gulpSequence = require('gulp-sequence'); 



var servePath = 'frontend/.tmp'; // 开发目录
var buildPath = 'public'; // 发布目录


/**
 * Sass -> CSS task
 * ========================================================================
 */
// Sass task
// ===============================(Styles_1
// 
gulp.task('sass', function () {
    return gulp.src([
            'frontend/app/assets/css/scss/*.scss',
            'frontend/app/assets/css/scss/**/*.scss'
        ])
        .pipe($.plumber())
        .pipe($.rubySass({
            style: 'expanded',  //nested compact compressed expanded
            precision: 10,
            'sourcemap=none': true,
            cacheLocation: 'frontend/.sass-cache'
        }))
        .pipe($.autoprefixer({browsers: ['Chrome 25', 'Firefox 15' , 'IE 8'], cascade: false}))
        .pipe(gulp.dest(buildPath + '/assets/css'));
});

// bower_components paths
var plugsPaths = {
    js: [
        'frontend/app/assets/js/lib/modernizr/modernizr.js',
        'frontend/app/assets/js/lib/jquery/jquery.js',
        'frontend/app/assets/js/lib/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        'frontend/app/assets/js/lib/perfect-scrollbar/src/perfect-scrollbar.js',
        'frontend/app/assets/js/lib/jquery-cookie/jquery.cookie.js',
        'frontend/app/assets/js/lib/jquery-pjax/jquery.pjax.js',
        'frontend/app/assets/js/lib/cropper/dist/cropper.js',
        'frontend/app/assets/js/components/artTemplate/dist/template.js',
        'frontend/app/assets/js/components/respondjs/respond.src.js',
        'frontend/app/assets/js/tklib/nprogress/nprogress.js',
        'frontend/app/assets/js/tklib/nocaptche/nc.js',
        'frontend/app/assets/js/tklib/lazyload-1.3/lazyload.min.js',
        'frontend/app/assets/js/tklib/lazyload-1.3/jquery.scrollstop.min.js',
    ]
}

// CSS min task
// ===============================(Styles_2 && Serve_Styles_3
// 
gulp.task('cssmin', function() {
    return gulp.src([
            'public/assets/css/**/*.css',
            'public/assets/css/*.css'
        ])
        .pipe(cssmin({keepSpecialComments: 1}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath + '/assets/css'));
})


gulp.task('buildStyles', function(callback) {
    gulpSequence('clearBuildCss', 'sass', 'cssmin')(callback)
});
/**
 * Javascript task
 * ========================================================================
 */
// JavaScript Jshint
// ===============================(Scripts_1
// 
gulp.task('jshint', function() {

    return gulp.src([
            'frontend/app/assets/js/apps/**/*.js',
            'frontend/app/assets/js/**/*.js',
            'frontend/app/assets/js/*.js'
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
});


// CopyJs task
// ===============================(Scripts_2
// 
gulp.task('copyJs', function () {
    // Copy RequireJs task
    gulp.src(['frontend/app/assets/js/lib/requirejs/require.js'])
        .pipe(gulp.dest(buildPath + '/assets/js/'));

    // Copy bower_components task
    gulp.src(plugsPaths.js)
        .pipe(concat('plugs.js'))
        .pipe(gulp.dest(buildPath + '/assets/js/'))

    // Copy Other javascript task
    return gulp.src([
            'frontend/app/assets/js/apps/**/*.js',
            'frontend/app/assets/js/**/*.js',
            'frontend/app/assets/js/*.js'
        ])
        .pipe($.if('*.js', $.uglify().on('error', gutil.log)))
        .pipe(gulp.dest(buildPath + '/assets/js'));  
});




gulp.task('buildScripts', function(callback) {
    gulpSequence('clearBuildJs', 'copyJs', 'jshint')(callback)
});



/**
 * Images task
 * ========================================================================
 */
gulp.task('images', ['clearBuildImage'], function () {

    return gulp.src('frontend/app/assets/images/**/*.{gif,png,jpg,jpeg}')
        // .pipe($.imagemin({
        //     progressive: true,
        //     interlaced: true
        // }))

        // 图片缓存 目前有bug 2015.2.9
        // .pipe($.cache($.imagemin({
        //  progressive: true,
        //  interlaced: true
        // })))
        .pipe(gulp.dest(buildPath + '/assets/images/'));
});


/**
 * Fonts & Iconfont task
 * ========================================================================
 */
gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')().concat('frontend/app/assets/fonts/**/*'))
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(buildPath + '/assets/fonts'));
});




/**
 * audio task
 * ========================================================================
 */
gulp.task('audio', function () {
    return gulp.src('frontend/app/assets/mp3/*.*')
        .pipe(gulp.dest(buildPath + '/assets/mp3/'));
});




/**
 * Gulp build task
 * ========================================================================
 */
gulp.task('buildSequence', function(callback) {
    gulpSequence('buildStyles', 'buildScripts', 'images', 'fonts', 'audio')(callback)
});
gulp.task('build', ['buildSequence'], function () {
    return gulp.src(buildPath + '/assets/**/*').pipe($.size({title: 'build', gzip: true}));
});





/**
 * Serve Sass -> CSS task
 * ========================================================================
 */
// ===============================(Serve_Styles_1
gulp.task('serveSass', function () {
    return gulp.src([
            'frontend/app/assets/css/scss/*.scss',
            'frontend/app/assets/css/scss/**/*.scss'
        ])
        .pipe($.plumber())
        .pipe($.rubySass({
            style: 'expanded',  //nested compact compressed expanded
            precision: 10,
            'sourcemap=none': true,
            cacheLocation: 'frontend/.sass-cache'
        }))
        .pipe($.autoprefixer({browsers: ['Chrome 25', 'Firefox 15' , 'IE 8'], cascade: false}))
        .pipe(gulp.dest(servePath + '/assets/css'));
});


// CSS min task
// ===============================(Styles_2 && Serve_Styles_3
// 
gulp.task('serveCssmin', function() {
    return gulp.src([
            'frontend/.tmp/assets/css/*.css',
            'frontend/.tmp/assets/css/**/*.css'
        ])
        .pipe(cssmin({keepSpecialComments: 1}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('frontend/.tmp/assets/css'));
})


// ===============================(Serve_Styles_2
gulp.task('serveCopyCss', function () {

    return gulp.src([
            'frontend/.tmp/assets/css/*.css',
            'frontend/.tmp/assets/css/**/*.css'
        ])
        .pipe(gulp.dest(buildPath + '/assets/css/'));  
});

gulp.task('serveCss', function(callback) {
    gulpSequence('clearServe', 'serveSass','serveCssmin','serveCopyCss')(callback)
});

/**
 * Javascript task
 * ========================================================================
 */
// Gulp serve watch js change task
gulp.task('serveJs', function(callback) {
    gulpSequence('clearBuildJs', 'copyJs', 'jshint')(callback)
});



/**
 * Gulp serve 
 * ========================================================================
 */
gulp.task('connect', ['serveCss'],function () {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(require('connect-livereload')({port: 35729}))
        .use(serveStatic('frontend/.tmp'))
        .use(serveStatic('frontend'))


        // paths to bower_components should be relative to the current file
        // e.g. in app/index.html you should use ../bower_components

        .use('/frontend/app/assets/js/lib/bootstrap-sass-official/', serveStatic('frontend/app/assets/js/lib/'))
        .use(serveIndex('frontend'));

    require('http').createServer(app)
        .listen(8080)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:8080');
        });
});





// Gulp serve watch task
gulp.task('watch', ['connect'], function () {
    $.livereload.listen();

    // watch for changes
    gulp.watch([
        'frontend/*.html',
        'frontend/app/*.html',
        'frontend/app/**/*.html',
        '!frontend/app/assets/js/*.html',
        '!frontend/app/assets/js/**/*.html',
        'frontend/.tmp/assets/css/**/*.css',
        'frontend/.tmp/assets/css/*.css',

        // 'frontend/app/assets/js/**/*.js',
        'frontend/app/assets/images/**/*.{gif,png,jpg,jpeg}'
    ]).on('change', $.livereload.changed);

    gulp.watch([
        'frontend/app/assets/js/**/**/*.js',
        '!frontend/app/assets/js/lib/**/*'
    ], ['serveJs']).on('change', $.livereload.changed);


    gulp.watch('frontend/app/assets/css/scss/**/*.scss', ['serveCss']);
    gulp.watch('bower.json', ['wiredep']);
});

// Gulp serve watch bower components change task
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('frontend/app/assets/css/scss/*.scss')
        .pipe(wiredep())
        .pipe(gulp.dest('frontend/app/assets/css'));

    gulp.src('frontend/app/**/*.html')
        .pipe(wiredep())
        // .pipe(wiredep({exclude: ['bootstrap-sass-official']}))
        .pipe(gulp.dest('frontend'));
});

gulp.task('serve', ['clearServe','clearBuildCss', 'connect', 'watch'], function () {
    require('opn')('http://localhost:8080/whm-project.html');
});



/**
 * Gulp clear task 
 * ========================================================================
 */
// Gulp serve clear
gulp.task('clearServe', require('del').bind(null, ['frontend/.tmp']));
gulp.task('clearBuildCss', require('del').bind(null, ['public/assets/css']));
gulp.task('clearBuildJs', require('del').bind(null, ['public/assets/js']));
gulp.task('clearBuildImage', require('del').bind(null, ['public/assets/images']));
gulp.task('clearBuildFonts', require('del').bind(null, ['public/assets/fonts']));
gulp.task('clearBuildHtml', require('del').bind(null, ['public/assets/html']));

gulp.task('clear', function(callback) {
    gulpSequence('clearServe', 'clearBuildCss', 'clearBuildJs', 'clearBuildImage', 'clearBuildFonts', 'clearBuildHtml')(callback)
});

gulp.task('default', ['clear'], function () {
    gulp.start('build');
});
