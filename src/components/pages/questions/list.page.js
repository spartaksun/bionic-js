'use strict';

import db from 'services/db/index';

import Page from '../page';
import pageContent from './list.page.html';

class QuestionListPage extends Page {
    constructor(url){
        super(url);

        this.content = pageContent;
        const questions = db.findAll('questions');

        this.data = {
            questions
        }
    }
}

export default new QuestionListPage('#/admin/questions');