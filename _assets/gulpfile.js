( function() {

  var config = {
    clean: '../assets',
    fonts: {
      src: [ 'fonts/**/*.woff', 'fonts/**/*.otf' ],
      dest: '../assets/fonts'
    },
    images: {
      src: 'images/**/*.*',
      dest: '../assets/images'
    },
    styles: {
      src: 'styles/**/*.*',
      main: 'styles/styles.sass',
      dest: '../assets/styles',
      outFile: '../assets/styles/styles.css'
    },
    scripts: {
      src: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/waypoints/lib/jquery.waypoints.js',
        'scripts/scripts.js'
      ],
      dest: '../assets/scripts'
    }
  };

  var gulp = require( 'gulp' ),
    del = require( 'del' ),
    plumber = require( 'gulp-plumber' ),
    pngquant = require('imagemin-pngquant'),
    imagemin = require('gulp-imagemin'),
    browserSync = require( 'browser-sync' ).create(),
    concat = require( 'gulp-concat' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    base64 = require('gulp-base64'),
    minifyCss = require( 'gulp-clean-css' ),
    sass = require( 'gulp-sass' ),
    uglify = require( 'gulp-uglify' );

  gulp.task( 'clean', function() {
    return del( config.clean, {force: true} );
  } );

  gulp.task( 'fonts', function() {
    return gulp
      .src( config.fonts.src )
      .pipe( gulp.dest( config.fonts.dest ) );
  } );

  gulp.task( 'images', function() {
    return gulp
      .src( config.images.src )
      .pipe(
        imagemin( {
          progressive: true,
          svgoPlugins: [ {
            removeViewBox: false
          } ],
          use: [ pngquant() ]
        } )
      )
      .pipe( gulp.dest( config.images.dest ) );
  } );

  gulp.task( 'styles:build', function() {
    return gulp
      .src( config.styles.main )
      .pipe( sass(
        {
          outputStyle: 'compressed',
          sourceMap: false
        }
      ).on( 'error', sass.logError ) )
      .pipe( plumber() )
      .pipe(
        base64( {
          extensions: [ 'svg', 'png', 'gif', 'jpg', 'otf', 'woff', 'woff2', 'eot', 'ttf' ],
          maxImageSize: 1024*1024,
          debug: false
        } )
      )
      .pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4' ) )
      .pipe(
        minifyCss( {
          compatibility: 'ie8',
          processImport: true
        } )
      )
      .pipe( gulp.dest( config.styles.dest ) );
  } );

  gulp.task( 'styles', gulp.series( 'images', 'fonts', 'styles:build' ) );

  gulp.task( 'scripts', function() {
    return gulp
      .src( config.scripts.src )
      .pipe( plumber() )
      .pipe( concat( 'scripts.js' ) )
      .pipe( uglify() )
      .pipe( gulp.dest( config.scripts.dest ) );
  } );

  gulp.task( 'deploy', gulp.parallel( 'styles', 'scripts' ) );

  gulp.task( 'watch', function() {
    gulp.watch( config.images.src ).on( 'change', gulp.series( 'images' ) );
    gulp.watch( config.styles.src ).on( 'change', gulp.series( 'styles' ) );
    gulp.watch( config.scripts.src ).on( 'change', gulp.series( 'scripts' ) );
  } );

  gulp.task( 'default', gulp.series( 'clean', 'deploy', gulp.parallel( 'watch' ) ) );

} )();
