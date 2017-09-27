'use strict';

import moment from 'moment';

import db from 'services/db/index';

import Page from '../page';
import pageContent from './list.page.html';

class QuestionListPage extends Page {

    constructor(url) {
        super(url);

        this.content = pageContent;
        const questions = db.findAll('questions', ['~createdAt']).map(question => ({
            ...question,
            created: moment.unix(question.createdAt).format('Y-m-d HH:mm')
        }));

        this.title = 'Question list';
        this.data = {
            questions
        }
    }
}

export default new QuestionListPage('#/admin/questions');