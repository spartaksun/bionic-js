'use strict';

import validator from 'validator';

import router from 'services/router';
import db from 'services/db';
import message from 'services/message';

import Page from '../page';
import template from './start.page.html';

class StartQuizPage extends Page {

    beforeRender() {
        this.content = template;
    }

    initSubmitButton() {
        document.getElementById('startButton').addEventListener('click', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            if(!validator.isEmail(email)) {
                return message.error('Invalid email');
            }

            const questions = {};
            const qts = db.findAll('questions');
            for (let i = 0; i < qts.length; i++) {
                questions[i + 1] = {
                    qid: qts[i].id,
                    submit: false,
                    success: false,
                };
            }

            try {
                const quiz = db.add('quizzes', {
                    lastId: 0,
                    questions,
                    email,
                });

                db.persist();
                window.sessionStorage.setItem('quiz', quiz.id);

                // go to first question in quiz
                router.goToUrl(router.generateUrl('#/question', {id: 1}));
            } catch (e) {
                message.error(e.message);
            }
        });
    }

    afterRender() {
        this.initSubmitButton();
    }
}

export default new StartQuizPage('#/start');