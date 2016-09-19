/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-clean-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr gulp-webserver gulp-replace gulp-template gulp-inject
 *  gulp-util
 *  gulp-imagemin
 *  gulp-ruby-sass
 *  gulp-clean-css
 *  gulp-jshint//
 *  gulp-uglify
 *  gulp-rename
 *  gulp-concat
 *  gulp-clean
 *  gulp-livereload
 *  tiny-lr
 *  gulp-webserver
 *  gulp-template
 *  gulp-inject
 *  gulp-usemin // 替换为min版本  ,  目前不用
 *  gulp-all-base64
 *
 */

// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-clean-css'),     //css压缩
   /* jshint = require('gulp-jshint'),         //js检查*/
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload //刷新
    server = tinylr(),
    port = 63342,
    webserver = require('gulp-webserver'),
    inject=require('gulp-inject'),             //gulp-inject 读取文件合并
    livereload = require('gulp-livereload'),    //livereload
    template = require('gulp-template'),       //template  模板引擎
    replace = require("gulp-replace"),          //replace 文本替换
    base64 = require("gulp-all-base64");         //base64 转换


var basePath="src/",
    cdn="http://oai1j38hq.bkt.clouddn.com/",
    injects_html=[
        {
            src:"./base/base.html",
            tag:"<!-- inject:base:{{ext}} -->"
        },
        {
            src:"./base/footer.html",
            tag:"<!-- inject:footer:{{ext}} -->"
        },
        {
            src:"./base/header.html",
            tag:"<!-- inject:header:{{ext}} -->"
        },
        {
            src:"./base/common.html",
            tag:"<!-- inject:common:{{ext}} -->"
        },
        {
            src:"./base/statistical.html",
            tag:"<!-- inject:statistical:{{ext}} -->"
        }
    ];




// HTML处理 -dist
gulp.task('html', function() {
    var htmlSrc = './*.html',
        htmlDst = './dist/',
        datas=new Date(),
        v_num=datas.getTime();
    gulp.src(htmlSrc)
/*        .pipe(inject(gulp.src(injects_html[0].src), {
            starttag: injects_html[0].tag,
            removeTags:true,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[1].src), {
            starttag: injects_html[1].tag,
            removeTags:true,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[2].src), {
            starttag: injects_html[2].tag,
            removeTags:true,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[3].src), {
            starttag: injects_html[3].tag,
            removeTags:true,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[4].src), {
            starttag: injects_html[3].tag,
            removeTags:true,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))*/
        .pipe(replace('href="'+basePath, 'href="'+cdn))/*替换资源CDN地址*/
        .pipe(replace('src="'+basePath, 'src="'+cdn))
        .pipe(replace(/<[^>]+(?:src|href)=\s*["']?([^"]+\.(?:js|css|png|jpg|gif))/g,function(obj){
            obj+="?v="+v_num;
            return obj;
        }))
        .pipe(gulp.dest(htmlDst));
});

// HTML处理 -debug
gulp.task('html-local', function() {
    var htmlSrc = './*.html',
        htmlDst = '.';
    gulp.src(htmlSrc)
/*        .pipe(inject(gulp.src(injects_html[0].src), {
            starttag: injects_html[0].tag,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[1].src), {
            starttag: injects_html[1].tag,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[2].src), {
            starttag: injects_html[2].tag,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[3].src), {
            starttag: injects_html[3].tag,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(injects_html[4].src), {
            starttag: injects_html[4].tag,
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))*/
        .pipe(replace('href="'+cdn, 'href="'+basePath))/*替换资源CDN地址*/
        .pipe(replace('src="'+cdn, 'src="'+basePath))
        .pipe(gulp.dest(htmlDst));
});




// 样式处理
gulp.task('css', function () {
    var cssSrc = './src/css/*',
        cssDst = './dist/css';
    gulp.src(cssSrc)
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});


// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/image/**/*.{jpg,png,gif,jpeg}',
        imgDst = './dist/image';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});
gulp.task('font',function(){
    var fontSrc = './src/font/*',
        fontDst = './dist/font';
    gulp.src(fontSrc)
        .pipe(gulp.dest(fontDst));
});

// js处理
gulp.task('js', function () {
    var jsSrc = ['./src/js/*.js'],
        jsDst ='./dist/js';

    gulp.src(jsSrc)
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/img/'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js');
});

