const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nunjucks = require('gulp-nunjucks-render');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const connect = require('gulp-connect');

// Set up a minimalist http server !
gulp.task('serve', () =>
    connect.server({
        root: 'dist',
        livereload: true
    })
);

// Compile all sass files 
gulp.task('compile:sass', () =>
  gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(connect.reload())
);


// Compile all ES6 JS files to ES5
gulp.task('compile:js', () =>
  gulp.src('./src/scripts/*.js', {base: './src/scripts'})
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload())
);

// Move our dependencies
gulp.task('move:dependencies', () =>
  gulp.src([
    './node_modules/jquery/dist/jquery.js',
  ])
    .pipe(gulp.dest('./dist/libs'))
);

// Move our fonts
gulp.task('move:fonts', () =>
  gulp.src([
    './src/fonts/*'
  ])
  .pipe(gulp.dest('./dist/fonts'))
);

// Move our images
gulp.task('move:images', () => 
  gulp.src('./src/img/*', {base: './src'})
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
);

// Compile our HTML templates
gulp.task('compile:html', () => 
  gulp.src('./src/pages/**/*.njk', {base: './src/pages'})
    .pipe(nunjucks({
      path: './src'
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
);

gulp.task('watch', () => {
  gulp.watch('./src/styles/*.scss', ['compile:sass']);
  gulp.watch('./src/scripts/*.js', ['compile:js']);
  gulp.watch('./src/**/*.njk', ['compile:html']);
  gulp.watch('./src/img/*', ['move:images']);
});

gulp.task('compile', [
  'compile:js',
  'compile:sass',
  'move:dependencies', 
  'move:images',
  'move:fonts',
  'compile:html',
]);

gulp.task('default', [
  'compile:js', 
  'compile:sass', 
  'move:dependencies', 
  'move:images',
  'move:fonts',
  'compile:html',
  'watch', 
  'serve'
]);
