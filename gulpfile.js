// Dev Dependencies
var gulp = require("gulp"),
  concat = require("gulp-concat"),
  flatten = require("gulp-flatten"),
  jade = require("gulp-jade"),
  babel = require("gulp-babel"),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require("gulp-clean-css"),
  browserSync = require("browser-sync"),
  nodemon = require("gulp-nodemon");

// Files
var src = {
    html: "src/index.jade",
    css: "src/styles/*.sass",
    js: "src/scripts/*.js"
  },
  dest = {public: "public/"};

// Build Tasks
gulp.task("html", () => {
  return gulp.src(src.html)
    .pipe(jade())
    .pipe(gulp.dest(dest.public));
});

gulp.task("css", () => {
  return sass(src.css)
    .pipe(autoprefixer({browsers: ["last 2 versions"]}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest.public));
});

gulp.task("js", () => {
  return gulp.src(src.js)
    .pipe(concat("app.js"))
    .pipe(babel({presets: ["es2015"]}))
    .pipe(gulp.dest(dest.public));
});

gulp.task("default", ["html", "js", "css"]);

// Dev Tasks
gulp.task("nodemon", cb => {
  var started = false;
  return nodemon({script: "server.js", watch: ["server.js", "db/*.js"]}).on("start", () => {
    if(!started) cb();
    started = true;
  });
});

gulp.task("browser-sync", ["nodemon"], () => {
	browserSync.init(null, {
		proxy: "http://localhost:4258",
    files: ["public/**/*.*"],
    browser: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    port: 3000,
	});
});

gulp.task("dev", ["default", "browser-sync"], () => {
  gulp.watch(src.html, ["html"]);
  gulp.watch(src.js, ["js"]);
  gulp.watch(src.css, ["css"]);
});
