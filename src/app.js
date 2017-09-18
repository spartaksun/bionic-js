'use strict';

import router from 'services/router';
import userLoader from 'services/user/loader';
import questionLoader from 'services/question/loader';

import Menu from 'components/menu/menu';
import UserPanel from 'components/userPanel/userPanel';

class App {

    init = () => {

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
    };
}

export default App;