'use strict';

import message from 'services/message';
import router from 'services/router';
import auth from 'services/auth'

class LoginForm {

    constructor() {
        this.submitButton = document.getElementById('submitButton');
        this.loginMessage = document.getElementById('loginMessage');
    }

    setMessage(message, color = '#000') {
        this.loginMessage.textContent = message;
        this.loginMessage.style.color = color;
    }

    initSubmitButton() {
        this.submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const user = auth.login(login, password);

            if (user) {
                router.goHome();
            } else {
                message.error('Invalid username or password!', 'red');
            }
        });
    }

    init() {
        this.setMessage('Please fill login and passowrd');
        this.initSubmitButton();
    }
}

export default LoginForm;
