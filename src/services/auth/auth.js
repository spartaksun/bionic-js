'use strict';

import passwordHash from 'password-hash';

import db from '../db';
import router from '../router';

import accessList from 'data/acl.json';

const USER_STORAGE_KEY = 'user_key';

class Auth {

    constructor(storage) {
        this.tempStorage = storage;
    }

    getUserList() {
        return db.findAll('users');
    };

    encodePassword(password) {
        return passwordHash.generate(password);
    }

    findUser(username, password) {
        const user = db.findOneBy('users', {
            username,
        });

        if (user) {
            if (passwordHash.verify(password, user.password)) {
                return user;
            }
        }

        return null;
    }

    login(username, password) {
        const user = db.findOneBy('users', {
            username,
        });

        if (user) {
            if (passwordHash.verify(password, user.password)) {
                this.tempStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

                return user;
            }
        }

        return false;
    }

    logout() {
        this.tempStorage.removeItem(USER_STORAGE_KEY);
    }

    getUser() {
        const userData = this.tempStorage.getItem(USER_STORAGE_KEY);
        if (!userData) {
            return;
        }

        return JSON.parse(userData);
    }

    getRole() {
        const user = this.getUser();

        if (!user) {
            return 'unauthorized';
        }

        return user.role;
    };

    isAccessGranted(fullUrl) {
        const {url} = router.parseUrl(fullUrl);

        for (let i = 0; i < accessList.length; i++) {
            const {access, route} = accessList[i];

            if (route === url) {
                if (access === 'all') {
                    return true;
                }

                if (access.indexOf(this.getRole()) !== -1) {
                    return true
                }
            }
        }

        return false;
    };
}

export default Auth;