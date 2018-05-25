'use strict'
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// const imagemin = require('gulp-imagemin');
// ^ not currently used. Will add if we need static assets

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const zip = require('gulp-zip');

const sassIn = './scss/*scss';
const cssOut = './style.css';

const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
const browserList = [
    "defaults",
    "iOS >= 7"
];
const autoprefixerOptions = {
    "browsers": browserList
};

const jsIn = './js/**/*.js';
const jsOut = './';
gulp.task('scripts', () => {
    return gulp
        .src(jsIn)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(jsOut))
        .pipe(uglify())
        .pipe (sourcemaps.write())
        .pipe(gulp.dest(jsOut));
});
gulp.task('sass', () =>{
    return gulp
        .src(sassIn)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(cssOut));
});
gulp.task('watch', () => {
    gulp.watch(sassIn, gulp.series('sass'))
        .on('change', (event) =>{
            console.log('Sass file' + event.path + ' was ' + event.type + ', running tasks...');
        });
    // gulp.watch(jsIn, ()=>{gulp.series('scripts')})
    // .on('change', (event) =>{
    //     console.log('Javascript file' + event.path + ' was ' + event.type + ', running tasks...');
    // });
});
gulp.task('sass-prod', ()=>{
    return gulp 
        .src(sassIn)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(cssOut));
})
gulp.task('prod', ()=>{
    gulp.parallel('scripts','sass-prod');
});