var jspm = require(process.cwd() + '/package.json').jspm;
var jsdom = require('jsdom');
var chalk = require('chalk');
var When = require('when');
var System = require('systemjs');

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
                .then(function () { return moduleName; });
            })
            .then(resolve)
            .catch(reject)
        }, 500);
      }
    });

  });
}

function logResults(results) {
  results.forEach(function (result) {
    if (result.state === 'fulfilled') {
      console.log(chalk.green('LOADED'), result.value);
    } else {
      console.log(chalk.red('FAILED'), result.reason);
    }
  });
}

app
  .get('*.html', function (req, res) {
    res.end('');
  })
  .use(express.static(process.cwd()));

app.listen(9001, function () {

  When.settle(Object.keys(jspm.dependencies).map(testModule))
    .tap(function (results) {
      console.log('\nDependencies');
    })
    .tap(logResults)

    //////////

    .then(function () {
      return When.settle(Object.keys(jspm.devDependencies).map(testModule));
    })
    .tap(function (results) {
      console.log('\nDevelopment Dependencies');
    })
    .tap(logResults)

    //////////

    .then(function () {
      return System.import(jspm.configFile).then(function () {
        var mappings = System.map;

        var localPaths = Object.keys(mappings).filter(function (moduleName) {
          return moduleName.indexOf(':') === -1 && mappings[moduleName].indexOf(':') === -1;
        });

        return When.settle(localPaths.map(testModule));
      });
    })
    .tap(function (results) {
      console.log('\nLocal mappings');
    })
    .tap(logResults)

    //////////

    .finally(process.exit);

});
