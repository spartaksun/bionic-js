'use strict';

import router from 'services/router';
import UserLoader from 'services/user/loader';

import Menu from 'components/menu/menu';
import UserPanel from 'components/userPanel/userPanel';

class App {

    init = () => {

        const userLoader = new UserLoader;
        userLoader.init();

        const userPanel = new UserPanel;
        userPanel.init();

        const menu = new Menu;
        menu.init();

        router.handleChangeRoute = function () {
            userPanel.init();
            menu.init();
        };
        router.init();
    };
}

export default App;