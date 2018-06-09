# jest-angular-memory-leak-example

# Simple zone.js + jsdom memory leak example

This repo was created for https://github.com/angular/angular/issues/24048 investigation

zone.js@0.8.26

jest@23.1.0

jsdom@11.11.0

## Run `npm install` firstly

## Run `npm test`

```
> jest --runInBand --logHeapUsage

 PASS  __tests__/test10.spec.js (48 MB heap size)
 PASS  __tests__/test19.spec.js (48 MB heap size)
 PASS  __tests__/test11.spec.js (50 MB heap size)
 PASS  __tests__/test14.spec.js (50 MB heap size)
 PASS  __tests__/test20.spec.js (51 MB heap size)
 PASS  __tests__/test25.spec.js (64 MB heap size)
 PASS  __tests__/test12.spec.js (64 MB heap size)
 PASS  __tests__/test16.spec.js (64 MB heap size)
 PASS  __tests__/test8.spec.js (65 MB heap size)
 PASS  __tests__/test13.spec.js (78 MB heap size)
 PASS  __tests__/test18.spec.js (78 MB heap size)
 PASS  __tests__/test15.spec.js (79 MB heap size)
 PASS  __tests__/test17.spec.js (79 MB heap size)
 PASS  __tests__/test1.spec.js (80 MB heap size)
 PASS  __tests__/test2.spec.js (93 MB heap size)
 PASS  __tests__/test4.spec.js (93 MB heap size)
 PASS  __tests__/test3.spec.js (93 MB heap size)
 PASS  __tests__/test7.spec.js (94 MB heap size)
 PASS  __tests__/test24.spec.js (107 MB heap size)
 PASS  __tests__/test6.spec.js (107 MB heap size)
 PASS  __tests__/test21.spec.js (107 MB heap size)
 PASS  __tests__/test23.spec.js (108 MB heap size)
 PASS  __tests__/test9.spec.js (120 MB heap size)
 PASS  __tests__/test5.spec.js (120 MB heap size)
 PASS  __tests__/test22.spec.js (120 MB heap size)

Test Suites: 25 passed, 25 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        2.198s
Ran all test suites.

```

As you can see there is steady heap usage increase

## Run `npm test -- --detectLeaks`

```
● Test suite failed to run

    EXPERIMENTAL FEATURE!
    Your test suite is leaking memory. Please ensure all references are cleaned.

    There is a number of things that can leak memory:
      - Async operations that have not finished (e.g. fs.readFile).
      - Timers not properly mocked (e.g. setInterval, setTimeout).
      - Keeping references to the global scope.

      at node_modules/jest/node_modules/jest-cli/build/test_scheduler.js:264:22
```

As you can see jest reports memory leaks

## Comment/remove `require('zone.js/dist/zone.js');` in `setupJest.js` and run `npm test`

```
> jest --runInBand --logHeapUsage

 PASS  __tests__/test10.spec.js (39 MB heap size)
 PASS  __tests__/test12.spec.js (47 MB heap size)
 PASS  __tests__/test14.spec.js (43 MB heap size)
 PASS  __tests__/test13.spec.js (51 MB heap size)
 PASS  __tests__/test11.spec.js (47 MB heap size)
 PASS  __tests__/test17.spec.js (54 MB heap size)
 PASS  __tests__/test16.spec.js (39 MB heap size)
 PASS  __tests__/test20.spec.js (47 MB heap size)
 PASS  __tests__/test19.spec.js (42 MB heap size)
 PASS  __tests__/test25.spec.js (49 MB heap size)
 PASS  __tests__/test5.spec.js (45 MB heap size)
 PASS  __tests__/test7.spec.js (53 MB heap size)
 PASS  __tests__/test21.spec.js (49 MB heap size)
 PASS  __tests__/test9.spec.js (56 MB heap size)
 PASS  __tests__/test22.spec.js (52 MB heap size)
 PASS  __tests__/test18.spec.js (59 MB heap size)
 PASS  __tests__/test4.spec.js (55 MB heap size)
 PASS  __tests__/test8.spec.js (63 MB heap size)
 PASS  __tests__/test2.spec.js (58 MB heap size)
 PASS  __tests__/test24.spec.js (66 MB heap size)
 PASS  __tests__/test6.spec.js (62 MB heap size)
 PASS  __tests__/test23.spec.js (69 MB heap size)
 PASS  __tests__/test1.spec.js (65 MB heap size)
 PASS  __tests__/test15.spec.js (39 MB heap size)
 PASS  __tests__/test3.spec.js (47 MB heap size)

Test Suites: 25 passed, 25 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        1.636s, estimated 2s
Ran all test suites.
```

As you can see there is NO steady heap usage increase