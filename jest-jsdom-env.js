const vm = require('vm');
const v8 = require('v8');

const JSDomEnvironment = require('jest-environment-jsdom');

class JSDomEnvironmentWithForceGC extends JSDomEnvironment {
    teardown() {
        return super.teardown().then(() => {
            const isGlobaGCHidden = !global.gc;

            v8.setFlagsFromString('--expose-gc');
            vm.runInNewContext('gc')();
            if (isGlobaGCHidden) {
                v8.setFlagsFromString('--no-expose-gc');
            }
        });
    }
}

module.exports = JSDomEnvironmentWithForceGC;