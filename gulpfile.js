// Core Dependencies
const gulp = require('gulp');
const path = require('path');

// Convert ES6 to ES5
const webpack = require('webpack-stream');
gulp.task('transpile-es6', () => {
  gulp.src('./app_client/main.js')
    .pipe(webpack({
      entry: './app_client/main.js',
      output: {
        path: path.resolve(__dirname, './public/dist/'),
        filename: 'main.bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('./public/dist/'))
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch('./app_client/*.js', ['transpile-es6']);
});

// Default Task
gulp.task('default', ['transpile-es6', 'watch']);

