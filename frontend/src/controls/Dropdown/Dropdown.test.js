import React from 'react';
import Enzyme from '../../controls/Button/node_modules/enzyme';
import { mount } from '../../controls/Button/node_modules/enzyme';
import Adapter from '../../controls/Button/node_modules/enzyme-adapter-react-16';

const chai = require('../../controls/Button/node_modules/chai');

import Dropdown from './Dropdown';

Enzyme.configure({ adapter: new Adapter() });

describe('The Dropdown component', () => {
	beforeEach(() => {
		test.component = Enzyme.mount(<Dropdown />);
	});

	test('renders without crashing', () => {
		chai.expect(test.component).to.have.length(1);
	});

	test("initially, the selected option is 'null'", () => {
		chai.expect(test.component.instance().getSelectedOption()).to.be.null;
	});

	test('when clicked, opens the list', () => {
		test.component.simulate('click');

		chai.expect(test.component.find('.dropdown__list')).to.have.length(1);
	});

	test('when blurred, closes the list', () => {
		test.component.simulate('blur');

		chai.expect(test.component.find('.dropdown__list')).to.have.length(0);
	});

	describe('when some options are passed', () => {
		beforeEach(() => {
			const sampleOptions = [
				{ id: 0, label: 'Test Label 0' },
				{ id: 1, label: 'Test Label 1' },
				{ id: 2, label: 'Test Label 2' }
			];
			test.component = Enzyme.mount(<Dropdown options={sampleOptions} />);
		});

		test('should, when opened, render all the options with corresponding labels', () => {
			test.component.simulate('click');

			const list = test.component.find('.dropdown__list');

			chai.expect(list.children()).to.have.length(3);

			chai.expect(list.childAt(1).text()).to.equal('Test Label 1');
		});

		test("when option is clicked, closes the list and sets 'state.selectedOption' to the clicked one", () => {
			test.component.simulate('click');
			const firstItem = test.component.find('.dropdown__list').childAt(0);
			firstItem.simulate('click');

			chai.expect(test.component.find('.dropdown__list')).to.have.length(
				0
			);

			chai.expect(
				test.component.instance().getSelectedOption()
			).to.deep.equal({ id: 0, label: 'Test Label 0' });
		});
	});
});
