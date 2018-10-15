var gulp = require('gulp'),
    sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer')
;

gulp.task('sass', function () {
	var mainSass =  gulp.src('app/sass/main.scss')
        .pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));

	var bootstrap = gulp.src('app/sass/scss/bootstrap-grid.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: true}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('css-libs',['sass'], function () {
	var mainCss = gulp.src('app/css/main.css')
		.pipe(cssnano())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('app/css'));

	// var bootstrapGrid = gulp.src('app/css/bootstrap-grid.css')
	// 	.pipe(cssnano())
	// 	.pipe(rename({suffix: ".min"}))
	// 	.pipe(gulp.dest('app/css'));

	var normalize = gulp.src('app/css/normalize.css')
		.pipe(cssnano())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('clean', function () {
	return	del.sync('dist');
});

gulp.task('watch',['browser-sync','css-libs'], function () {
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('build', ['clean','css-libs'], function () {
	var buildCss = gulp.src('app/css/*.css')
		.pipe(gulp.dest('dist/css'));

	var buildImage = gulp.src('app/img/**/*')
		.pipe(gulp.dest('dist/img'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});
