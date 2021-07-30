const {
    src, dest, series, parallel, watch
} = require('gulp');



// sass編譯

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');



function sassmap() {
    return src('./sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('./css'))
}




//images壓圖 

const imagemin = require('gulp-imagemin');

function minify() {
    return src('/images/*.*')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 80, progressive: true }), // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
            imagemin.optipng({ optimizationLevel: 3 }) // png
        ]))
        .pipe(dest('images'))
}


// js babal es6 - >es5

const babel = require('gulp-babel');

function babel5() {
    return src('js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('js/babal/'));
}


// html template


const fileinclude = require('gulp-file-include');
function html() {
    return src('./html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        })).pipe(dest('./'))
}





// 監看
exports.watch = () =>
    watch(['./sass/*.scss', './sass/**/*.scss'], sassmap);
    watch(['./html/*.html', './html/**/*.html'], html);
    watch(['./js/*.js'], babel5);


// 壓縮圖片
exports.packimg = minify





