'use strict';

import db from 'services/db';

import Page from '../page';
import template from './one.page.html';

class OneQuestionPage extends Page {

    beforeRender() {
        const {id} = this.papameters;

        const quiz = this.getCurrentQuiz();
        const quizQuestion = quiz.questions[id];

        if (quizQuestion.submit) {
            throw new Error('Question is already answered');
        }

        const question = db.find('questions', quizQuestion['qid']);
        const total = Object.keys(quiz.questions).length;

        this.checked = {};
        this.question = question;
        this.content = template;
        this.data = {
            id,
            total,
            question,
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
    }

    getCurrentQuiz() {
        const quizId = window.sessionStorage.getItem('quiz');
        const quiz = db.find('quizzes', quizId);
        if (!quiz) {
            throw new Error(`Quiz ${quizId} not found`);
        }

        return quiz;
    }

    afterRender() {

        let self = this;

        self.correct = true;

        document.getElementById('questionForm')
            .addEventListener('submit', (e) => {
                e.preventDefault();

                const {correct} = e.target;
                const {answers} = self.question;
                const {id} = this.papameters;


                for (let i = 0; i < answers.length; i++) {
                    const checked = correct[i].checked;

                    self.data.question.answers[i].checked = checked;
                    self.correct = self.correct
                        && answers[i].correct === checked;
                }

                if (this.updateQuizQuestion(id, self.correct)) {
                    self.data.saved = true;
                }

                // TODO Redirect to next page

                self.doRender();
            });
    }

}

export default new OneQuestionPage('#/question');