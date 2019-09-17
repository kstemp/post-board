const chai = require('chai');
chai.use(require('chai-http'));
const should = chai.should();

const server = require('../server.ts');

describe("The '/session' route", () => {
	describe("The '/register' route", () => {
		it("Should return '422' for an empty body", () => {
			chai.request(server)
				.post('/session/register')
				.set('content-type', 'application/json')
				.send({})
				.end((err, res) => res.should.have.status(422));
		});
		it("Should return '422' for a body with invalid fields", () => {
			chai.request(server)
				.post('/session/register')
				.set('Content-Type', 'application/json')
				.send({
					login: 'testlogin1',
					email: 'testemail@domain.pl',
					password: '123456712812'
				})
				.end((err, res) => console.log(res.status));
		});
	});
});
