require('es6-promise').polyfill();

var gulp 		= require('gulp');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var cssmin 		= require('gulp-cssmin');
var eslint      = require('gulp-eslint');
var newer 		= require('gulp-newer');
var rename 		= require('gulp-rename');
var uglify		= require('gulp-uglify');
var $ 			= require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];


/* Copy latest version of React to production JS folder*/
gulp.task('copy-react', function() {
  return gulp.src([
  	'node_modules/react/dist/react.min.js',
  	'node_modules/react-dom/dist/react-dom.min.js'
  ])
    .pipe(newer('./js/react.min.js'))
    .pipe(newer('./js/react-dom.min.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('eslint', function() {
  return gulp.src('./js/*.js')
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Process JS...
gulp.task('app', function() {
    return gulp.src('./js/app.js')
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('./js'));
});

// Create JS file from JSX, Lint first...
gulp.task('app-react', ['eslint'], function() {
	return gulp.src('./jsx/app-react.jsx')
	.pipe(babel({
      only: [
        './jsx',
      ],
      compact: false
    }))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(gulp.dest('./js'));
});

// Foundation SASS...
gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    //.pipe(cssmin())
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['app', 'sass', 'copy-react', 'app-react'], function() {
	gulp.watch(['./scss/**/*.scss'], ['sass']);
	gulp.watch('./js/app.js', ['app', 'eslint']);
	gulp.watch('./jsx/*.{js,jsx}', ['app-react']);
});
