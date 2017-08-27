const assert = require('assert');
const User = require('../src/user.js');

let joe;

beforeEach((done) => {
	joe = new User('Joe');

	joe.save()
	.then(() => done());
})

describe('Reading the users out of the database', () => {
	it('it finds all users with the name of joe', () => {

	});
});