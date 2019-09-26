import Enzyme, { configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
configure({ adapter: new Adapter() });

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

import ImageUploader from './ImageUploader';

describe('The ImageUploader control', () => {
	beforeEach(() => {
		test.component = Enzyme.mount(<ImageUploader />);
	});

	test('Renders without crashing', () => {
		chai.expect(test.component).to.have.length(1);
	});

	test("Renders the input of type 'file'", () => {
		const input = test.component.find('input');

		chai.expect(input).to.have.length(1);
		chai.expect(input.prop('type')).to.equal('file');
	});

	test("Renders the 'Upload' button", () => {
		const button = test.component.find('.pb-button');

		chai.expect(button.text()).to.equal('Upload');
	});
});
