class Message {

    error(text) {
        this.message(text, 'alert-danger')
    }

    info(text) {
        this.message(text, 'alert-primary')
    }

    message(text, className) {
        const block = document.createElement('div');

        block.setAttribute('class', 'alert ' + className);
        block.setAttribute('role', 'alert');
        block.textContent = text;

        const messageBlock = document.getElementById('message');

        messageBlock.appendChild(block);

        setTimeout(() => {
            messageBlock.innerHTML = '';
        }, 5000);
    }
}

export default new Message();