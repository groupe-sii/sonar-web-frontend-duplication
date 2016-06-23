# sonar-web-frontend-duplication

This is a Wrapper for JSCPD (code duplication check) producing sonar compliant files for the Generic [Sonarqube plugin](https://github.com/groupe-sii/sonar-web-client-plugin). Usage is based on gulp.

#Getting started
```bash
npm i --save-dev sonar-web-frontend-duplication
```

#Default Usage
```Javascript
'use strict';
var gulp = require('gulp'),
		SonarWebDuplication = require("sonar-web-frontend-duplication"),
		projectName = 'sonar-web-frontend-helloworld';

gulp.task('duplication', function() {
		return SonarWebDuplication.launchReporters({
				project: projectName, //your project's name
				css : true,//activate css code duplication check with default values
				scss : true,//activate scss code duplication check with default values
				html : true,//activate html code duplication check with default values
				js : true//activate js code duplication check with default values
		});
});
```
```bash
gulp duplication
```
All params for launchReporters are optional, if you dont pass them, they'll skip duplication checks. We rarely need to scan both css and scss for example.
#Configuration
Since not all project will match the default values, you can customize it, each reporter has params : 

* src : the gulp.src params to use for the task, probably the only one you'll have to override
* report : the report json file path to use
* task : the gulp task name to use for the report

##Default values
```Javascript
gulp.task('lint', function() {
		return SonarWebDuplication.launchReporters({
				project: projectName, 
				css : {
					src : "src/**/*.css",
					report : "reports/sonar/css-duplication.xml",
					task : "ci-cssduplication"
				},
				scss : {
					src : "src/**/*.scss",
					report : "reports/sonar/scss-duplication.xml",
					task : "ci-scssduplication"
				},
				html : {
					src : "src/**/*.html",
					report : "reports/sonar/html-duplication.xml",
					task : "ci-htmlduplication"
				},
				js : {
					src : "src/**/*.js",
					report : "reports/sonar/js-duplication.xml",
					task : "ci-jsduplication"
				}
		});
});
```

#Sample project with jasmine/istanbul for testing

SOON

#Sample project with intern for testing

An example project is available here : https://github.com/groupe-sii/sonar-web-frontend-helloworld

# Informations for Sonarqube
The export files for Sonarqube are XML files providing all informations a Sonarqube issue might need :

each duplication unit contains :

* lines : number of lines present in the code fragment
* tokens : number of duplicated tokens
* file : array of files concerned by the duplication
	* path : file path
	* line : the firt line matching the duplication unit
* codefragment : the duplicated code fragement

#Roadmap
New languages will be added over time, with new webtechnologies incoming : 

* TypeScript
* Handlebars templates
