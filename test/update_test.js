const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done());
	});

	// Best used when you want to update several different properties, but want to do it in steps
	it('instance type set n save', (done) => {
		joe.set('name', 'Alex'); //set only works in memory and not set to the database
		joe.save() // used after set and actually saves to database
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	});
});