import React from 'react';
import Enzyme from '../../controls/Button/node_modules/enzyme';
import Adapter from '../../controls/Button/node_modules/enzyme-adapter-react-16';

const chai = require('../../controls/Button/node_modules/chai');

import Comment from './Comment';

Enzyme.configure({ adapter: new Adapter() });

describe('The Comment component', () => {
	beforeEach(() => {
		const testComment = {
			id: 15325,
			postID: 164,
			text: 'My sample comment text'
		};

		test.component = Enzyme.mount(<Comment comment={testComment} />);
	});

	test('renders without crashing', () => {
		chai.expect(test.component).to.have.length(1);
	});

	test('displays the text of the comment passed as prop', () => {
		chai.expect(test.component.text()).to.equal('My sample comment text');
	});
});
