const chai = require('chai');
chai.use(require('chai-http'));
const should = chai.should();

const server = require('../server.ts');

describe("The '/' route", () => {
	it('Should send an empty response with status 204', () => {
		chai.request(server)
			.get('/')
			.end((err, res) => res.should.have.status(204));
	});
});
