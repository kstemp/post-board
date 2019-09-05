import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Post from '../Post';

Enzyme.configure({ adapter: new Adapter() });

describe('The Post component', () => {
	it('Renders without crashing', () => {
		const component = mount(<Post />);
	});
});
