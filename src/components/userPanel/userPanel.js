'use strict';

import auth from 'services/auth';

class UserPanel {

    init = () => {
        const user = auth.getUser();

        if(user && user.fullName) {
            this.username = user.fullName;
        } else {
            this.username = 'Guest';
        }

        this.render();
    };

    render() {
        document.querySelector('.username')
            .innerHTML = this.username;
    }
}

export default UserPanel;