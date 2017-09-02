const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done());
	});

	it('instance type using set n save', (done) => {
		// set is instance method that allows you update a property
		joe.set('name', 'Alex');
		joe.save()
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	});
});