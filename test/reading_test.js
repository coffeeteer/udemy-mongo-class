const assert =  require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then( () => done());
	});
	
	it('finds all users with name of joe', () => {

	});
});