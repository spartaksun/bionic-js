'use strict';

import db from 'services/db';
import router from 'services/router';
import message from 'services/message';

import Page from '../page';
import template from './one.page.html';

class OneQuestionPage extends Page {

    beforeRender() {
        const {id} = this.papameters;

        const quiz = this.getCurrentQuiz();
        const question = db.find('questions', quiz.questions[id]['qid']);
        const total = Object.keys(quiz.questions).length;

        this.title = `Question ${id}. Quiz ${quiz.id}`;
        this.checked = {};
        this.question = question;
        this.content = template;
        this.quizQuestion = quiz.questions[id];

        this.data = {
            id,
            total,
            question,
            progress: Math.floor(id / total * 100),
            studentEmail: quiz.email,
            saved: false,
            checked: {},
        };
    }

    updateQuizQuestion(qid, success) {
        const quiz = this.getCurrentQuiz();

        quiz.questions[qid] = {
            ...quiz.questions[qid],
            submit: true,
            success
        };
        quiz.lastId = qid;

        db.update('quizzes', quiz);
        db.persist('quizzes');

        return true;
    }

    getCurrentQuiz() {
        const quizId = window.sessionStorage.getItem('quiz');
        const quiz = db.find('quizzes', quizId);
        if (!quiz) {
            throw new Error(`Quiz ${quizId} not found`);
        }

        return quiz;
    }

    getNextUrl() {
        const {id} = this.papameters;
        const quiz = this.getCurrentQuiz();

        const nextId = +id + 1;
        if (quiz.questions[nextId]) {
            return router.generateUrl('#/question', {id: nextId});
        } else {
            message.info('You have been successfully finished a quiz!');
            return router.generateUrl('#/result', {id: quiz.id});
        }
    }

    afterRender() {

        let self = this;

        self.correct = true;
        document.getElementById('questionForm')
            .addEventListener('submit', (e) => {
                e.preventDefault();

                const {correct} = e.target;
                const {answers} = self.question;
                const {id} = self.papameters;

                const correctAnswers = correct[0] ? correct : [correct];

                if (!self.quizQuestion.submit) {
                    for (let i = 0; i < answers.length; i++) {
                        const checked = correctAnswers[i].checked;

                        self.data.question.answers[i].checked = checked;
                        self.correct = self.correct
                            && answers[i].correct === checked;
                    }

                    if (this.updateQuizQuestion(id, self.correct)) {
                        self.data.saved = true;
                    }

                    self.doRender();
                } else {
                    message.error('Question has been already submitted!');
                }

                router.goToUrl(self.getNextUrl());
            });
    }

}

export default new OneQuestionPage('#/question');