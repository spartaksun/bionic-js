'use strict';

import db from 'services/db';
import defaultQuestionList from 'data/questions.json';

class QuestionLoader {

    init() {
        const users = db.findAll('questions');

        if(users.length === 0) {
            this.loadDefaultQestions();
        }
    }

    loadDefaultQestions() {
        defaultQuestionList.forEach(question => {
            db.add('questions', question);
        });

        db.persist();
    }
}

export default new QuestionLoader();