'use strict';

import Handlebars from 'handlebars';

class Page {
	constructor(url = '', content = '') {
		this.url = url;
		this.content = content;
		this.data = {};
		this.papameters = {};
	}

	setParameters(papameters) {
        this.papameters = papameters;
	}

	render() {

		this.beforeRender();

        document.querySelector('#page').innerHTML
			= Handlebars.compile(this.content)(this.data);

        this.afterRender();
	};

	beforeRender() {};
	afterRender() {};
}

export default Page;