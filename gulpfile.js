// Core Dependencies
const gulp = require('gulp');
var path = require('path');

// Convert ES6 to ES5
var webpack = require('webpack-stream');
gulp.task('transpile-es6', function () {
  gulp.src('./app_client/main.js')
    .pipe(webpack({
      entry: './app_client/main.js',
      output: {
        path: path.resolve(__dirname, './app_client/dist/'),
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
    .pipe(gulp.dest('./app_client/dist/'))
});

// Default Task
gulp.task('default', ['transpile-es6']);

