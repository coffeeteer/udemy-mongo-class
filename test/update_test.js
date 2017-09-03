const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done){
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}

	it('instance type using set n save', (done) => {
		// set is instance method that allows you update a property (piecemeal update)
		joe.set('name', 'Alex');
		assertName(joe.save(), done);
			
	});

	// Update() saves everything all at once
	it('A model instance can update', (done) => {
		assertName(joe.update({ name: 'Alex' }), done);
	});
});