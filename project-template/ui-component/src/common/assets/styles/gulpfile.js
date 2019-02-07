'use strict'

const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cssmin = require('gulp-cssmin')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')

const path = require('path');

const srcDir = process.env.srcDir ? process.env.srcDir : path.join(__dirname, '../project-backup-template');
const distDir = process.env.distDir ? process.env.distDir : path.join(__dirname, '../../../../../lib');

const currentDir = path.join(srcDir, 'packages/common-20180524/assets/styles');

gulp.task('compile', function() {
  return gulp.src(path.join(currentDir, 'theme-default/index.scss'))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}),
      px2rem({ remUnit: 75 })
    ]))
    .pipe(cssmin())
    .pipe(gulp.dest(path.join(distDir, 'styles/theme-default')))
})

gulp.task('copyfont', function() {
  return gulp.src(path.join(currentDir, 'theme-default/fonts/**'))
    .pipe(gulp.dest(path.join(distDir, 'styles/theme-default/fonts')))
})

gulp.task('build', ['compile', 'copyfont'])
