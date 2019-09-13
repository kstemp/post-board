const chai = require('chai');

import { prettyPrintDateDifference } from '../date';

describe('The prettyPrintDateDifference method', () => {
	test("Should return 'now' if the time difference is less than a minute", () => {
		const date1 = new Date('2019-08-07 15:42:23');
		const date2 = new Date('2019-08-07 15:42:56');

		chai.expect(prettyPrintDateDifference(date1, date2)).to.equal('now');
	});

	test("Should return '${count} minutes' between the dates if the time difference is shorter than an hour", () => {
		const date1 = new Date('2019-08-07 15:42:23');
		const date2 = new Date('2019-08-07 16:39:56');

		chai.expect(prettyPrintDateDifference(date1, date2)).to.equal(
			'57 minutes'
		);
	});

	test("Should return '${count} hours' between the dates if the time difference is shorter than a day", () => {
		const date1 = new Date('2019-08-07 15:42:23');
		const date2 = new Date('2019-08-07 23:39:56');

		chai.expect(prettyPrintDateDifference(date1, date2)).to.equal(
			'7 hours'
		);
	});

	test("Should return '${count} days' between the dates if the time difference is shorter than a week", () => {
		const date1 = new Date('2019-08-07 15:42:23');
		const date2 = new Date('2019-08-12 23:39:56');

		chai.expect(prettyPrintDateDifference(date1, date2)).to.equal('5 days');
	});
});
