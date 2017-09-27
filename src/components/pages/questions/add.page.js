'use strict';

import db from 'services/db';
import router from 'services/router';
import message from 'services/message';

import Page from '../page';
import template from './add.page.html';

const MIN_LENGTH = 5;

class AddQuestionPage extends Page {
    constructor(url) {
        super(url);

        this.title = 'Add new question';
        this.content = template;
        this.data = {
            questions: [0, 1, 2, 3, 4, 5]
        }
    }

    afterRender() {
        const handleSubmit = this.handleSubmit;
        document.getElementById('addQuestionForm')
            .addEventListener('submit', handleSubmit);
    }

    handleSubmit(e) {
        e.preventDefault();

        const {question, answers, correct} = e.target;
        const resultAnswers = [];

        if (question.value.length < MIN_LENGTH) {
            message.error('Question title is too short.');

            return;
        }

        let count = 0;
        let countCorrect = 0;
        for (let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            const title = answer.value.toString();

            if (title.length > 0) {
                const {checked} = correct[i]

                count ++;
                resultAnswers.push({
                    title,
                    correct: checked
                });

                if(checked) {
                    countCorrect++;
                }
            }
        }

        if (count < 2 ) {
            message.error('Please type at least two answers.');

            return;
        }

        if(countCorrect === 0) {
            message.error('Please mark as correct at least one answer.');

            return;
        }

        db.add('questions', {
            title: question.value,
            answers: resultAnswers
        });
        db.persist();

        router.goToUrl('#/admin/questions')
    }

}

export default new AddQuestionPage('#/admin/questions/add');