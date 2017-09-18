'use strict';

import Page from '../page';
import aboutPageContent from './about.page.html';

class AboutPage extends Page {
    constructor(url){
        super(url);
        this.content = aboutPageContent;
    }
}

const page = new AboutPage('#/about');

export default page;
