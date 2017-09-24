'use strict';

import moment from 'moment';

class Database {

    /**
     * @param storage where to persist data
     * @param schema
     */
    constructor(storage, schema) {
        this.schema = schema;
        this.storage = storage;
        this.tempStorage = {};

        for (let name in this.schema) {
            if(!this.schema.hasOwnProperty(name)) {
                continue;
            }

            this.tempStorage = {
                ...this.tempStorage,
                [name]: this.loadCollection(name)
            }
        }
    }

    /**
     * Retrieve collection of objects from storage
     * @param name
     * @returns {Array}
     */
    loadCollection(name) {
        this.validateCollection(name);
        const collectionString =  this.storage.getItem(name);

        return collectionString
            ? JSON.parse(collectionString)
            : [];
    }

    /**
     * Save collection on objects to permanent storage
     * @param name
     * @param collection
     */
    persistCollection(name, collection) {
        this.validateCollection(name);
        this.storage.setItem(name, JSON.stringify(collection));
    }

    /**
     * Add new object to specific collection
     * @param collectionName
     * @param object
     * @returns {*}
     */
    add(collectionName, object) {

        if(typeof object !== 'object') {
            throw new Error('DB element has to be an object.');
        }

        this.validateCollection(collectionName);
        this.validateUnique(collectionName, object);

        // Set primary key
        object[this.getPrimaryKey(collectionName)] = this.generateKey();
        object.createdAt = moment().format('X');

        // Add object to collection
        this.tempStorage[collectionName].push(object);

        return object;
    }

    update(collectionName, object) {
        if (typeof object !== 'object') {
            throw new Error('DB element has to be an object.');
        }

        this.validateCollection(collectionName);

        const primaryKeyName = this.getPrimaryKey(collectionName);
        const found = this.findOneBy(collectionName, {
            [primaryKeyName]: object[primaryKeyName]
        });

        const index = this.tempStorage[collectionName].indexOf(found);
        if (index === -1) {
            throw new Error('Object not found')
        }

        object.updatedAt = moment().format('X');

        this.tempStorage[collectionName][index] = object;
    }

    validateUnique(collectionName, object) {
        const { fields } = this.schema[collectionName];
        if(!fields || typeof fields !== 'object') {
            return;
        }

        for (let fieldName in object) {
            if(fields[fieldName] && fields[fieldName].unique === true) {
                const value = object[fieldName];
                const foundQbects = this.findAllBy(collectionName, {
                    [fieldName]: value
                });

                if(foundQbects.length > 0) {
                    throw new Error(`Collection "${collectionName}": field "${fieldName}" with value "${value}" has to be unique.`);
                }
            }
        }
    }

    /**
     * Delete object from specific collection
     * @param collectionName
     * @param object
     */
    remove(collectionName, object) {
        const collection = this.tempStorage[collectionName];
        const index = collection.indexOf(object);

        if(index === -1) {
            throw new Error('Object not found.');
        }

        delete collection[index];
        collection.splice(index, 1);
    }

    /**
     * Retrieve collection of all objects from memory
     * @param collectionName
     * @returns {*}
     */
    findAll(collectionName) {
        return this.findAllBy(collectionName);
    }

    /**
     * Find first element by primary key
     * @param collectionName
     * @param primary
     * @returns {null}
     */
    find(collectionName, primary) {
        const result = this.findAllBy(collectionName, {
            [this.getPrimaryKey(collectionName)]: primary
        });

        return result.length > 0 ? result[0] : null;
    }

    findOneBy(collectionName, criteria) {
        const found = this.findAllBy(collectionName, criteria, true);

        if(found.length === 1) {
            return found[0];
        }
    }

    /**
     * Find all elements from collection by criteria
     * @param collectionName
     * @param criteria object
     * @param stopOnFirst
     * @returns []
     */
    findAllBy(collectionName, criteria, stopOnFirst = false) {
        this.validateCollection(collectionName);

        if(typeof criteria === 'undefined') {
            return this.tempStorage[collectionName];
        }

        if(typeof criteria === 'object') {
            const result = [];
            const collection = this.tempStorage[collectionName];

            for (let i = 0; i < collection.length; i ++) {
                const object = collection[i];

                let match = true;
                for (let key in criteria) {
                    match = match && object[key] === criteria[key]
                }

                if(match) {
                    result.push( object);
                    if(stopOnFirst) {
                        return result;
                    }
                }
            }

            return result;
        }

        return [];
    }

    /**
     * Generate unique primary key
     * @returns {string}
     */
    generateKey() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     * Primary key name configured for specific collection
     *
     * @param collectionName
     * @returns string
     */
    getPrimaryKey(collectionName) {
        return this.schema[collectionName]['primary'];
    }

    persist(collectionName) {
        if(collectionName) {
            this.validateCollection(collectionName);
            this.persistCollection(collectionName, this.tempStorage[collectionName]);
        } else {
            for (let name in this.tempStorage) {
                if(this.tempStorage.hasOwnProperty(name)) {
                    this.persistCollection(name, this.tempStorage[name]);
                }
            }
        }
    }

    /**
     * Check if collection configured
     * @param name
     */
    validateCollection(name) {
        if(!this.schema[name]) {
            throw new Error(`Collection name "${name}" is invalid.`);
        }
    }
}

export default Database;

