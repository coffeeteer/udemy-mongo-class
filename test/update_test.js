const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find())
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}

	// Best used when you want to update several different properties, but want to do it in steps
	it('instance type set n save', (done) => {
		joe.set('name', 'Alex'); //set only works in memory and not set to the database
		assertName(joe.save(), done); // used after set and actually saves to database
			
	});

	it('A model instance can update', (done) => {
		assertName(joe.update({ name: 'Alex' }), done);
	});

	it('A model class can update', (done) => {
		assertName(
			User.update({ name: 'Joe' }, { name: 'Alex' }),
			done
		);	
	});

	it('A model class can update one record', (done) => {
		assertName(
			User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex' }),
			done
		);	
	});

	it('A model class can find a recore with an Id and update', (done) => {
		assertName(
			User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
			done
		);
	});
});