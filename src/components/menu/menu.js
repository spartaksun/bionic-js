'use strict';

import _ from 'lodash';

import router from 'services/router';
import auth from 'services/auth';

class Menu {
    constructor() {

        this.items = [
            {
                title: 'Home',
                route: '#/',
            },
            {
                title: 'quiz',
                route: '#/question',
            },
            {
                title: 'About',
                route: '#/about',
            },
            {
                title: 'Admin',
                route: '#/admin',
            },
            {
                title: 'Questions',
                route: '#/admin/questions',
            },
            {
                title: 'Add question',
                route: '#/admin/questions/add',
            },
            {
                title: 'Login',
                route: '#/login',
            },
            {
                title: 'Logout',
                route: '#/logout',
            }
        ];
    }

    init = () => {
        const _this = this;
        document.getElementById('menu').innerHTML = '';

        _.each(this.items, ({ title, route }) => {
            _this.addMenuLink(title, route);
        });
    };

    addMenuLink = (title, route) => {
        if(auth.isAccessGranted(route)) {
            const li = document.createElement('li');
            const link = this.createLinkElement(title, route);

            li.appendChild(link);
            document.getElementById('menu').appendChild(li);
        }
    };

    createLinkElement = (title, url) => {
        const link = document.createElement('a');

        link.textContent = title;
        link.setAttribute('href', url);

        const self = this;
        link.addEventListener('click', function(e) {
            router.renderPage(url);
        });

        return link;
    };
}

export default Menu;



