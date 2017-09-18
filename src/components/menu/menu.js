'use strict';

import _ from 'lodash';
import Handlebars from 'handlebars';

import router from 'services/router';
import auth from 'services/auth';
import template from './menu.html';
import config from './config';

class Menu {

    init = () => {
        this.calculateItems();
        this.render();
        this.initHandlers()
    };

    calculateItems() {
        const menuItems = [];

        _.each(config, ({title, route}) => {
            if (auth.isAccessGranted(route)) {
                menuItems.push({
                    url: route,
                    label: title
                });
            }
        });

        this.menuItems = menuItems;
    }

    reRender() {
        this.calculateItems();
        this.render();
    }

    render() {
        const html = Handlebars.compile(template)({
            menuItems: this.menuItems
        });
        document.getElementById('menu').innerHTML = html;
    }

    initHandlers() {
        document.getElementById('menu')
            .addEventListener('click', (e) => {
                const {target} = e;

                if (target.nodeName === 'A') {
                    router.renderPage(target.hash)
                }
            });
    }
}

export default Menu;



