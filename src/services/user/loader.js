'use strict';

import passwordHash from 'password-hash';

import db from 'services/db';
import defaultUserList from 'data/users.json';

class UserLoader {

    init() {
        const users = db.findAll('users');

        if(users.length === 0) {
            this.loadDefaultUsers();
        }
    }

    loadDefaultUsers() {
        defaultUserList.forEach(userData => {
            const { username, password, fullName, role } = userData;

            db.add('users', {
                username,
                password: passwordHash.generate(password),
                fullName,
                role
            });
        });

        db.persist();
    }
}

export default new UserLoader();