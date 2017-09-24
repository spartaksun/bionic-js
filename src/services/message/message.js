class Message {
    init() {
        this.errorSelector = 'error';
        this.messageSelector = 'message';
    }

    error(text) {

    }

    message(text) {
        const block = document.createElement('div');

        block.setAttribute('class', 'alert alert-danger');
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