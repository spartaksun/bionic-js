'use strict';

import auth from 'services/auth';

class UserPanel {

    init() {
        const user = auth.getUser();

        if(user && user.username) {
            this.username = user.username;
        } else {
            this.username = '';
        }

        this.render();
    };

    render() {
        document.querySelector('.username')
            .innerHTML = this.username;
    }
}

export default UserPanel;