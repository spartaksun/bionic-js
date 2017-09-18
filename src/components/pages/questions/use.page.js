'use strict';

import db from 'services/db';
import Page from '../page';
import template from './use.page.html';

class QuestionUsePage extends Page {

    beforeRender() {
        const { id } = this.papameters;

        const question = db.find('questions', id);

        this.content = template;
        this.data = {
            question
        };
    }
}

export default new QuestionUsePage('#/question');