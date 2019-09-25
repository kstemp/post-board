import Enzyme, { configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { restElement } from '@babel/types';
import TabControl from './TabControl';
import chai from 'chai';
import { element } from 'prop-types';

configure({ adapter: new Adapter() });

describe('The Tab Control component', () => {
	beforeEach(() => {
		test.component = test.component = Enzyme.shallow(
			<TabControl
				defaultTab={0}
				tabs={[
					{
						label: 'Label 1'
					},
					{
						label: 'Label 2'
					},
					{
						label: 'Label 3'
					}
				]}
			>
				<div className={'div-1'}></div>
				<div className={'div-2'}></div>
				<div className={'div-3'}></div>
			</TabControl>
		);
	});

	test('Renders without crashing', () => {
		chai.expect(test.component).to.have.length(1);
	});

	test('Renders a button with correct label for each tab', () => {
		chai.expect(test.component.find('.tab-control__button')).to.have.length(
			3
		);
	});

	test('Initially, renders only the tab specified as the default one', () => {
		chai.expect(test.component.find('.div-1')).to.have.length(1);
		chai.expect(test.component.find('.div-2')).to.have.length(0);
		chai.expect(test.component.find('.div-3')).to.have.length(0);
	});

	test('Switches tabs when clicked on a button corresponding to the tab', () => {
		test.component
			.find('.tab-control__button')
			.at(1)
			.simulate('click');

		test.component.update();

		chai.expect(test.component.find('.div-1')).to.have.length(0);
		chai.expect(test.component.find('.div-2')).to.have.length(1);
		chai.expect(test.component.find('.div-3')).to.have.length(0);

		test.component
			.find('.tab-control__button')
			.at(2)
			.simulate('click');

		test.component.update();

		chai.expect(test.component.find('.div-1')).to.have.length(0);
		chai.expect(test.component.find('.div-2')).to.have.length(0);
		chai.expect(test.component.find('.div-3')).to.have.length(1);
	});
});
