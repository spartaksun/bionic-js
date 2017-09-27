'use strict';

import Page from '../page';
import homePageContent from './home.page.html';


class HomePage extends Page {

    constructor(url) {
        super(url);

        this.title = 'Home';
        this.content = homePageContent;
    }
}

let homePage = new HomePage('#/');

export default homePage;