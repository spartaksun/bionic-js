'use strict';

import Database from './database';
import schema from 'data/db_schema.json';

const DbFactory = (function () {
    let instance;

    function createInstance() {
        return new Database(window.localStorage, schema);
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

export default DbFactory.getInstance();