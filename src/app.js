'use strict';

import router from 'services/router';
import userLoader from 'services/user/loader';
import questionLoader from 'services/question/loader';
import message from 'services/message';

import Menu from 'components/menu/menu';
import UserPanel from 'components/userPanel/userPanel';

class App {

    init = () => {

        try {
            questionLoader.init();
            userLoader.init();

            const userPanel = new UserPanel;
            userPanel.init();

            const menu = new Menu;
            menu.init();

            router.handleChangeRoute = function () {
                userPanel.init();
                menu.reRender();
            };
            router.init();
        } catch (e) {
            message.error(e.message);
        }

    };
}

export default App;