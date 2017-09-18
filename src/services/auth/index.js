'use strict';

import Auth from './auth';

const AuthFactory = (function () {
    let instance;

    function createInstance() {
        return new Auth(window.sessionStorage);
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    };
})();

export default AuthFactory.getInstance();