'use strict';

import {find} from 'lodash';

import homePage from 'components/pages/home/home.page';
import aboutPage from 'components/pages/about/about.page';
import loginPage from 'components/pages/login/login.page';
import adminPage from 'components/pages/admin/admin.page';
import questionListPage from 'components/pages/questions/list.page';
import addQuestionPage from 'components/pages/questions/add.page';
import useQuestionPage from 'components/pages/questions/use.page';

import auth from 'services/auth';

const pages = [
    homePage,
    aboutPage,
    loginPage,
    adminPage,
    questionListPage,
    addQuestionPage,
    useQuestionPage,
];

class Router {

    init() {
        this.renderPage(window.location.hash)
    }

    handleChangeRoute() {
    }

    parseUrl(url) {
        const parsed = url.split('?');
        let result = {
            url: parsed[0],
        };

        if (parsed[1]) {
            result.params = parsed[1]
                .split("&")
                .map(element => element.split("="))
                .reduce((previous, current) => {
                    previous[current[0]] = current[1];

                    return previous;
                }, {});
        }

        return result;
    }

    renderPage(fullUrl) {
        if (!auth.isAccessGranted(fullUrl)) {
            return this.goHome();
        }

        const { url, params } = this.parseUrl(fullUrl);

        if (url === '#/logout') {
            auth.logout();
            return this.goHome();
        }

        let page = find(pages, {url});

        if (!page) {
            page = homePage;
        }

        page.setParameters(params);
        page.render();

        this.handleChangeRoute(url);
    };

    goToUrl(url) {
        window.location.href = url;
        this.renderPage(url);

        this.handleChangeRoute(url);
    }

    goHome() {
        this.goToUrl('#/');
    }
}

export default Router;
