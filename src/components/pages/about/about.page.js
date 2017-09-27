'use strict';

import Page from '../page';
import aboutPageContent from './about.page.html';

class AboutPage extends Page {

    constructor(url) {
        super(url);
        this.content = aboutPageContent;
        this.title = 'About Us'
    }
}

const page = new AboutPage('#/about');

export default page;
