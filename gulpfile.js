// const gulp        = require('gulp');
const { src, dest, watch, parallel } = require('gulp');
// const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));;
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const cssmin = require('gulp-cssmin');
// const devip = require('dev-ip');
const imagemin = require('gulp-imagemin')
// const htmlmin = require('gulp-htmlmin');

// Static server


// function server() {

//     browserSync.init({
//         server: {
//             baseDir: "dist"
//         }
//     });

//     watch("src/*.html").on('change', browserSync.reload);
//     watch("src/js/**/*.js").on('change', browserSync.reload);
// }

function styles() {
	return src("src/sass/**/*.+(sass|scss)")
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({
			prefix: "",
			suffix: ".min"
		}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(dest("styles"))
}

function watching() {
	watch("src/sass/**/*.+(sass|scss|css)").on("change", parallel("styles"));
	// watch('src/css/**/*.css').on('change', parallel("stylesAll"));
	// watch("src/audio/**/*.mp3").on("change", parallel ("audio"));
	// watch("src/*.html").on("change", parallel('htmlMin'));
	// watch("src/js/**/*.js").on("change", parallel('scripts'));
	// watch("src/icons/**/*").on("all", parallel('icons'));
	// watch("src/fonts/**/*").on("all", parallel('fonts'));
	watch("src/img/**/*").on("all", parallel('images'));
	// watch("public/admin.css").on('all', parallel('stylesAdmin'));
}

// gulp.task('stylesAll', function() {
//     return gulp.src("src/css/**/*.css")
//         .pipe(gulp.dest('dist/css'));
// });

// function htmlMin() {
//     return src("src/*.html")
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(dest('dist'));
// }

// function audio() {
//     return src ("src/audio/*.mp3")
//         .pipe(dest("dist/audio"))
//         .pipe(browserSync.stream());
// }

// function scripts() {
//     return src("src/js/**/*.js")
//         .pipe(dest('dist/js'));
// }

// function fonts() {
//     return src("src/fonts/**/*")
//         .pipe(dest('public/fonts'));
// }

// function icons() {
//     return src("src/icons/**/*")
//         .pipe(dest('public/icons'));
// }

// gulp.task('mailer', function() {
//     return gulp.src("src/mailer/**/*")
//         .pipe(gulp.dest('dist/mailer'));
// });

function images() {
	return src("src/img/**/*")
		.pipe(imagemin())
		.pipe(dest('public/img'))
};

// gulp.task('default', gulp.parallel('watch','server','styles','html','scripts','fonts','icons'/*, 
// 'mailer', 'images'*/));

// exports.browserSync = server;
exports.styles = styles;
exports.watching = watching;
// exports.htmlMin = htmlMin;
// exports.scripts = scripts;
// exports.fonts = fonts;
// exports.icons = icons;
exports.images = images;
// exports.audio = audio;
// exports.stylesAdmin = stylesAdmin;

exports.default = parallel(watching, styles, images);



