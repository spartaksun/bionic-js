'use strict';

import db from 'services/db';
import moment from 'moment';

import router from 'services/router';

import Page from '../page';
import pageContent from './list.page.html';

class QuizListPage extends Page {

    constructor(url) {
        super(url);

        this.content = pageContent;
        this.data = {
            quizzes: db.findAll('quizzes').sort((q1, q2) => {
                return parseInt(q1.createdAt) < parseInt(q2.createdAt)
            }).map(quiz => {
                let correct = 0;
                let total = 0;
                for(let key in quiz.questions) {
                    const question = quiz.questions[key];
                    if (question.success) {
                        correct++;
                    }
                    total++;
                }

                return {
                    ...quiz,
                    start: moment.unix(quiz.createdAt).format('Y-m-d HH:mm'),
                    total,
                    correct,
                    percent: Math.floor(correct / total * 100),
                }
            })
        }
    }
    afterRender() {
        document.getElementById('quizResults')
            .addEventListener('click', e => {
                e.preventDefault();

                if(e.target.nodeName === 'A') {
                    return router.go('#/result', {id: e.target.id});
                }
            });
    }

}

export default new QuizListPage('#/admin/quizzes');