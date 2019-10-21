var gulp = require("gulp"),
	rename  = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	browserSync = require("browser-sync").create(),
	runSequence = require("run-sequence"),
	del = require("del"),
	glob = require("glob"),
	autoprefixer = require("gulp-autoprefixer");

var config = {

	// Trocque a url!
	remoteURL: "https://www.poemese.com/",

	srcDir: "./src",
	injectDir: "./build",
	localPath: "/local-assets",

	localAssets: {
		css: [
			"css/**/*.css"
		],
		js: [
			"js/**/*.js"
		]
	}

};

gulp.task("clean", function() {
	return del.sync(config.injectDir);
});

gulp.task("css", function(){
	return gulp.src(config.srcDir + "/scss/**/*.css")
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(autoprefixer())
	.pipe(rename({
		extname:".min.css"
	}))	
	.pipe(gulp.dest(config.injectDir + "/css"))
	.pipe(browserSync.stream());

});

gulp.task('images', function() {
	return gulp.src(config.srcDir + '/img/**/*')
		.pipe(imagemin([imagemin.optipng({optimizationLevel: 3})]))
		.pipe(gulp.dest(config.injectDir + '/img'))
});

gulp.task("js", function() {
	return gulp.src(config.srcDir + "/js/**/*.js")	
		.pipe(uglify())
		.pipe(rename({
			extname:".min.js"
		}))	
		.pipe(gulp.dest(config.injectDir + "/js"))
		.pipe(browserSync.stream());
});

gulp.task("browserSync", ["css", "js"], function() {
	browserSync.init({
		proxy: {
			target: config.remoteURL
		},
		rewriteRules: [{
			// injetando Local CSS no final do HEAD
			match: /<\/head>/i,
			fn: function(req, res, match) {
				var localCssAssets = "";
				for (var i = 0; i < config.localAssets.css.length; i++) {

					var files = glob.sync(config.localAssets.css[i], {
						cwd: config.injectDir
					});

					for (var file in files) {
						localCssAssets += "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + config.localPath + "/" + files[file] + "\">";
					}
				}

				return localCssAssets + match;
			}
		}, {
			// injetando Local JS no final do BODY
			match: /<\/body>/i,
			fn: function(req, res, match) {
				var localJsAssets = "";
				for (var i = 0; i < config.localAssets.js.length; i++) {

					var files = glob.sync(config.localAssets.js[i], {
						cwd: config.injectDir
					});

					for (var file in files) {
						localJsAssets += "<script src=\"" + config.localPath + "/" + files[file] + "\" type='module'></script>";
					}
				}

				return localJsAssets + match;
			}
		}],
		serveStatic: [{
			route: config.localPath,
			dir: config.injectDir
		}],
		watchTask: true
	});
});

gulp.task("watch", ["browserSync", "js", "images", "css"], function() {
	gulp.watch(config.srcDir + "/scss/**/*.css", ["css"]);
	gulp.watch(config.srcDir + "/img/**/*", ["images"]);
	gulp.watch(config.srcDir + "/js/**/*.js", ["js"]);
});

gulp.task("build", function() {
	runSequence([
		"clean",
		"css",
		"js",
		"images"
	]);
});

gulp.task("default", function() {
	runSequence(["build", "browserSync", "watch"]);
});
