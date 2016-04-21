'use strict';

var gulp = require('gulp'),
		jscpd = require('gulp-jscpd'),
		mkdirp = require('mkdirp'),
		fs = require('fs'),
		run = require('run-sequence');

function createReportPath(reportPath){
	var path = reportPath.substring(0,reportPath.lastIndexOf("/"));
	if (!fs.existsSync(path)){
		mkdirp.sync(path);
	}
}

function registerTask(name, src, language, file, token){
	var params = {
					"min-lines": 2,
					silent     : true,
					languages  : [language],
					output     : file
			}
	if (token){
		params["min-tokens"] = 5;
	}
	gulp.task(name, function() {
		return gulp.src(src)
			.pipe(jscpd(params));
	});
}

function SonarWebDuplication() {
		this.launchReporters = function(options){
			var tasks = [], projectName = options.project || options.projectName || "";
			if (options.css){
				var cssSources = options.css.src || options.css.sources || "src/**/*.css",
					cssPath = options.css.report || "reports/sonar/css-duplication.xml",
					cssTask = options.css.task || "ci-cssduplication";
					createReportPath(cssPath);

					registerTask(cssTask, cssSources, "css", cssPath, true);

					tasks.push(cssTask);
			}

			if (options.scss){
				var scssSources = options.scss.src || options.scss.sources || "src/**/*.scss",
					scssPath = options.scss.report || "reports/sonar/scss-duplication.xml",
					scssTask = options.scss.task || "ci-scssduplication";
					createReportPath(scssPath);

					registerTask(scssTask, scssSources, "css", scssPath, true);
					tasks.push(scssTask);
			}

			if (options.html){
				var htmlSources = options.html.src || options.html.sources || "src/**/*.html",
					htmlPath = options.html.report || "reports/sonar/html-duplication.xml",
					htmlTask = options.html.task || "ci-htmlduplication";
					createReportPath(htmlPath);

					registerTask(htmlTask, htmlSources, "htmlmixed", htmlPath);
					tasks.push(htmlTask);
			}

			if (options.js){
				var jsSources = options.js.src || options.js.sources || "src/**/*.js",
					jsPath = options.js.report || "reports/sonar/js-duplication.xml",
					jsTask = options.js.task || "ci-jsduplication";
					createReportPath(jsPath);

					registerTask(jsTask, jsSources, "javascript", jsPath);
					tasks.push(jsTask);
			}

			return run(tasks);
		}
}

module.exports = new SonarWebDuplication();