var jspm = require(process.cwd() + '/package.json').jspm;
var jsdom = require('jsdom');
var async = require('async');
var chalk = require('chalk');

var express = require('express');
var app = express();

function testModule(moduleName, done) {

  var dom = jsdom.env({
    url: 'http://localhost:9001/' + moduleName + '.html',
    features: {
      FetchExternalResources: ['script', 'img', 'css', 'frame', 'iframe', 'link'],
      ProcessExternalResources: ['script']
    },
    scripts: [
      jspm.directories.packages + '/system.js'
    ],
    done: function (errs, window) {
      if (errs) {
        console.error(window.location.href, errs);
      }

      setTimeout(function () {
        var System = window.System;

        System.import(jspm.configFile.replace('.js', ''))
          .then(function () {
            return System.import(moduleName)
          })
          .then(function (module) {
            console.log(chalk.green('LOADED'), moduleName);
          })
          .catch(function (err) {
            console.error(chalk.red('FAILED'), moduleName, err);
          })
          .then(done);
      }, 500);

    }
  });

}

app
  .get('*.html', function (req, res) {
    res.end('');
  })
  .use(express.static(process.cwd()));

app.listen(9001, function () {

  console.log('\nDependencies');
  async.each(Object.keys(jspm.dependencies), testModule, function () {

    console.log('\nDevelopment Dependencies');
    async.each(Object.keys(jspm.devDependencies), testModule, process.exit);

  });

});
