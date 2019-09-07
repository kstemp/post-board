import { isEmpty, containsOnlySpaces, isEmptyOrOnlySpaces } from '../string';

const chai = require('chai');

describe("The 'isEmpty' function", () => {
	test('Should work for a variety of inputs', () => {
		// empty, defined string
		chai.expect(isEmpty('')).to.be.true;
		// null
		chai.expect(isEmpty(null)).to.be.true;
		// undefined
		let undefString;
		chai.expect(isEmpty(undefString)).to.be.true;
		// non-empty string, spaces only
		chai.expect(isEmpty(' ')).to.be.false;
		// non-empty string
		chai.expect(isEmpty(' non empty string here')).to.be.false;
	});
});

describe("The 'containsOnlySpaces' function", () => {
	test('Should work for a variety of inputs', () => {
		chai.expect(containsOnlySpaces('')).to.be.false;
		chai.expect(containsOnlySpaces('     ')).to.be.true;
		chai.expect(containsOnlySpaces(' ')).to.be.true;
		chai.expect(containsOnlySpaces('    non empty     string her   ')).to.be
			.false;
	});
});

describe("The 'isEmptyOrOnlySpaces' function", () => {
	test('Should work for a variety of inputs', () => {
		// empty, defined string
		chai.expect(isEmptyOrOnlySpaces('')).to.be.true;
		// null
		chai.expect(isEmptyOrOnlySpaces(null)).to.be.true;
		// undefined
		let undefString;
		chai.expect(isEmptyOrOnlySpaces(undefString)).to.be.true;
		// non-empty string, spaces only
		chai.expect(isEmptyOrOnlySpaces(' ')).to.be.true;
		// non-empty string, not only spaces
		chai.expect(isEmptyOrOnlySpaces(' non empty string here')).to.be.false;
	});
});
