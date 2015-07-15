var jspm = require(process.cwd() + '/package.json').jspm;
var jsdom = require('jsdom');
var chalk = require('chalk');
var When = require('when');
var System = require('systemjs');
var Path = require('path');

var express = require('express');
var app = express();

function testModule(moduleName) {
  return When.promise(function (resolve, reject) {

    var dom = jsdom.env({
      url: 'http://localhost:9001/' + moduleName + '.html',
      features: {
        FetchExternalResources: ['script', 'img', 'css', 'frame', 'iframe', 'link'],
        ProcessExternalResources: ['script']
      },
      done: function (errs, window) {
        if (errs) {
          console.error(window.location.href, errs);
        }

        // setTimeout(function () {
        //   var System = window.System;

        //   System.import(jspm.configFile)
        //     .then(function () {
        //       return System.import(moduleName)
        //         .then(function () { return moduleName; });
        //     })
        //     .then(resolve)
        //     .catch(reject)
        // }, 500);
      }
    });

  });
}

function logResults(results) {
  results.forEach(function (result) {
    if (result.state === 'fulfilled') {
      console.log(chalk.green('LOADED'), result.value);
    } else {
      console.log(chalk.red('FAILED'), result.reason, result.reason.stack);
    }
  });
}

app
  .get('/:moduleName.html', function (req, res) {
    res.end([
      '<script src="' + (jspm.directories.packages || 'jspm_packages') + '/system.js"></script>',
      '<script src="' + (jspm.configFile || 'config.js') + '"></script>',
      '<script>System.import("' + req.params.moduleName + '").then(console.log.bind(console, "' + req.params.moduleName + '"));</script>'
    ].join('\n'));
  })
  .use(express.static(Path.join(process.cwd(), jspm.directories.baseURL)));

app.listen(9001, function () {

  When.resolve()
    // .then(function () {
    //   return When.settle(Object.keys(jspm.dependencies).map(testModule))
    // })
    // .tap(function (results) {
    //   console.log('\nDependencies');
    // })
    // .tap(logResults)

    //////////

    // .then(function () {
    //   return When.settle(Object.keys(jspm.devDependencies).map(testModule));
    // })
    // .tap(function (results) {
    //   console.log('\nDevelopment Dependencies');
    // })
    // .tap(logResults)

    //////////

    // .then(function () {
    //   return System.import(jspm.configFile).then(function () {
    //     var mappings = System.map;

    //     var localPaths = Object.keys(mappings).filter(function (moduleName) {
    //       return moduleName.indexOf(':') === -1 && mappings[moduleName].indexOf(':') === -1;
    //     });

    //     return When.settle(localPaths.map(testModule));
    //   });
    // })
    // .tap(function (results) {
    //   console.log('\nLocal mappings');
    // })
    // .tap(logResults)

    //////////

    // .finally(process.exit);

});
