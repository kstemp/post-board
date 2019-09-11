import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './Button';

Enzyme.configure({ adapter: new Adapter() });

const chai = require('chai');

describe("The 'Button' component", () => {
	test('renders without crashing', () => {
		test.component = Enzyme.mount(<Button />);
		chai.expect(test.component).to.have.length(1);
	});
});
