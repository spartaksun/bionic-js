'use strict';

import db from 'services/db';

import Page from '../page';
import content from './result.page.html';

class QuizResult extends Page {

    beforeRender() {
        const questionList = [];
        const quiz = db.find('quizzes', this.papameters.id);

        if(!quiz) {
            throw new Error(`Quiz ${this.papameters.id} not found`);
        }

        const {email, questions} = quiz;

        let total = 0;
        let correct = 0;

        for (let i in questions) {
            const question = questions[i];
            const q = db.find('questions', question.qid);

            if(question.success) {
                correct++;
            }
            questionList.push({
                ...question,
                title: q.title,

            });
            total++;
        }

        this.title = `Result for ${email}`;
        this.content = content;
        this.data = {
            email,
            correct,
            total,
            questionList,
            success: correct >= total / 2,
            percent: Math.floor(correct / total * 100),
        };
    }
}

export default new QuizResult('#/result');