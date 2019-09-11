import React from 'react';
import Enzyme from '../../controls/Button/node_modules/enzyme';
import { mount } from '../../controls/Button/node_modules/enzyme';
import Adapter from '../../controls/Button/node_modules/enzyme-adapter-react-16';

const chai = require('../../controls/Button/node_modules/chai');

import Post from './Post';

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

	it('Displays how much time elapsed between now and creation of the post', () => {});

	describe('The Show Comments button', () => {
		it('Is rendered', () => {
			chai.expect(
				test.component.find('.post__buttons-comments')
			).to.have.length(1);
		});
	});
});
