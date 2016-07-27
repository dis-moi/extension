// Source : https://github.com/eeroan/WebConsole-reporter/ (MIT licence https://github.com/eeroan/WebConsole-reporter/blob/ff96efddbe6ac5d355e430fc146a7f6543938871/bower.json#L15 )

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([''], factory);
  } else {
    root.WebConsole = factory();
  }
})(this, function () {
  function WebConsole(runner) {
    // TODO needs to be removed to options somehow
    var reporterQueryParameter = 'test=console';

    var stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 };
    var failures = this.failures = [];
    var total = runner.total;
    var title = document.title;
    var calls = [];
    runner.stats = stats;

    runner.on('pass', function (test) {
      stats.passes = stats.passes || 0;
      var medium = test.slow() / 2;
      test.speed = test.duration > test.slow() ? 'slow' : test.duration > medium ? 'medium' : 'fast';
      stats.passes++;
    });

    runner.on('pending', function () {
      stats.pending++;
    });

    runner.on('start', function () {
      stats.start = (new Date);
    });

    runner.on('test', function (test) {
      console.log('Running test:', test.title);
    });

    runner.on('fail', function (test, err) {
      stats.failures = stats.failures || 0;
      stats.failures++;
      test.err = err;
      failures.push(test);
      calls.push(['info', null, test.title]);
      calls.push(['error', null, test.err.stack]);
      calls.push(['log', null, { Expected: err.expected, Actual: err.actual }]);
      flagFailures(test.parent);
    });

    function parentSuiteTitle(suite) {
      if (!suite.parent) return suite.title;
      return parentSuiteTitle(suite.parent) + ' ' + suite.title;
    }

    function flagFailures(node) {
      node.hasFailures = true;
      if (node.parent) flagFailures(node.parent);
    }

    runner.on('suite', function (suite) {
      stats.suites = stats.suites || 0;
      suite.root || stats.suites++;

      var parameter = '?grep=' + encodeURIComponent(suite.fullTitle()) + '&' + reporterQueryParameter;
      var location = document.location;
      var url = location.origin + location.pathname + parameter;
      calls.push(['group', suite, suite.title]);
      calls.push(['groupCollapsed', suite, 'url']);
      calls.push(['log', suite, url]);
      calls.push(['groupEnd', suite]);
    });

    runner.on('suite end', function (suite) {
      calls.push(['groupEnd', suite]);
      logNewCalls();
    });

    runner.on('test end', function (test) {
      stats.tests = stats.tests || 0;
      stats.tests++;
      var percent = stats.tests / total * 100 | 0;
      document.title = percent + '% ' + (stats.failures ? stats.failures + ' failures ' : '') + title;
    });

    runner.on('end', function () {
      stats.end = (new Date);
      stats.duration = (new Date) - stats.start;
      logNewCalls();
      if (stats.errors) console.warn(stats.errors, ' errors');
      if (stats.failures) console.warn(stats.failures, ' failures');
      var skipped = stats.tests - stats.failures - stats.passes;
      if (skipped) console.warn(skipped, ' skipped');
      console.log(stats.passes, ' tests passed');
      console.log(stats.duration / 1000, ' seconds');
      console.log((new Date).toUTCString());
      console.log('Run all tests ' + location.origin + location.pathname + '?' + reporterQueryParameter);
    });

    function logNewCalls() {
      while (calls.length > 0) {
        logCall(calls.shift());
      }
    }

    function logCall(call) {
      var command = call.shift();
      var suite = call.shift();
      var failures = !suite || suite.hasFailures;
      if (failures || command === 'info' || command === 'error') {
        console[command].apply(console, call);
      }
    }
  }

  return WebConsole;
});
