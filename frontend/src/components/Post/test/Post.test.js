import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const chai = require('chai');

import Post from '../Post';

Enzyme.configure({ adapter: new Adapter() });

const testPost = {
	id: 0,
	text: 'Sample Post Text'
};

describe('The Post component', () => {
	beforeEach(() => {
		test.component = mount(<Post post={testPost} />);
	});

	it('Renders without crashing', () => {
		chai.expect(test.component).to.have.length(1);
	});

	it('Displays post text', () => {
		chai.expect(test.component.find('.post__body').text()).to.equal(
			'Sample Post Text'
		);
	});

	it('Displays how much time elapsed between now and creation of the post', () => {
		chai.expect(test.component.find('.post__header-time').text()).to.equal(
			'TODO'
		);
	});
});
