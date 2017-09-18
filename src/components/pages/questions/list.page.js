'use strict';

import db from 'services/db/index';

import Page from '../page';
import pageContent from './list.page.html';

class QuestionListPage extends Page {
    constructor(url){
        super(url);

        this.content = pageContent;
        const questions = db.findAll('questions').sort((q1, q2) => {
                return parseInt(q1.createdAt) < parseInt(q2.createdAt)
            });
        this.data = {
            questions
        }
    }
}

export default new QuestionListPage('#/admin/questions');