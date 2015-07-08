jspm-config-test
================
[![NPM version](https://badge.fury.io/js/jspm-config-test.svg)](http://badge.fury.io/js/jspm-config-test)
[![Dependency Status](https://david-dm.org/Munter/jspm-config-test.svg)](https://david-dm.org/Munter/jspm-config-test)

After installing a bunch of packages in jspm, for example after doing a big [migration from bower](https://github.com/Munter/bower-to-jspm), it takes a long time to manually check if each package is correctly configured in your systemjs config file.

This tool automates the testing of whether each of your installed modules loads without error.

Usage
-----

```
npm install -g jspm-config-test
cd path/to/your/project
jspm-config-test
```

This will read your `package.json` and find the relevant information to test your jspm configuration.

The output will look something like this:

```
LOADED bowser
LOADED buzz
LOADED es5-shim
LOADED jquery-migrate
LOADED jquery.lazyload
LOADED crossroads
LOADED marked
LOADED moment
LOADED signals
LOADED backbone.syphon
LOADED backbone
LOADED autolinker
LOADED jquery
LOADED jquery-ui
LOADED fullcalendar
LOADED lunr
LOADED moment-timezone
FAILED jquery.rating [TypeError: Error loading "github:podio/jquery.rating@2.1.1" at http://localhost:9001/app/assets/javascripts/jspm_packages/github/podio/jquery.rating@2.1.1.js
Cannot set property 'rating' of undefined]
LOADED react
```

License
-------
(The MIT License)

Copyright (c) 2015 Peter Müller <munter@fumle.dk>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
