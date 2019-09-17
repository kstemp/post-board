import { getClassNames } from '../class-names';
import chai from 'chai';

describe('The getClassNames helper method', () => {
	test('Should work for a single class', () => {
		chai.expect(
			getClassNames({
				class1: true
			})
		).to.equal('class1');
		chai.expect(
			getClassNames({
				class1: false
			})
		).to.equal('');
	});

	test('Should work for multiple classes', () => {
		chai.expect(
			getClassNames({
				class1: true,
				'longer-class': true,
				'another-class': false,
				'last-class': true
			})
		).to.equal('class1 longer-class last-class');
	});
});
