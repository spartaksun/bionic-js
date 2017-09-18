'use strict';

import db from 'services/db';
import router from 'services/router';

import Page from '../page';
import template from './add.page.html';

const MIN_LENGTH = 5;

class AddQuestionPage extends Page {
    constructor(url) {
        super(url);

        this.content = template;
        this.data = {
            questions: [1,2,3,4,]
        }
    }

    afterRender() {
        document.getElementById('addQuestionForm')
            .addEventListener('submit', (e) => {
                e.preventDefault();

                const {question, answers, correct} = e.target;
                const resultAnswers = [];

                if (question.value.length < MIN_LENGTH) {
                    return;
                }

                for (let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    const title = answer.value.toString();

                    if (title.length > 0) {
                        resultAnswers.push({
                            title,
                            correct: correct[i].checked
                        })
                    }
                }

                if(resultAnswers.length > 0) {
                    db.add('questions', {
                        title: question.value,
                        answers: resultAnswers
                    });

                    db.persist();

                    router.goToUrl('#/admin/questions')
                }
            });
    }
}

export default new AddQuestionPage('#/admin/questions/add');