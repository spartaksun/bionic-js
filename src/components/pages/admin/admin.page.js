'use strict';

import Page from '../page';
import adminPageContent from './admin.page.html';

class AdminPage extends Page {
    constructor(url) {
        super(url);
        this.content = adminPageContent;
    }
}

const page = new AdminPage('#/admin');

export default page;