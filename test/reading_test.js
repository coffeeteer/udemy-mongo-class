const assert = require('assert');
const User = require('../src/user');

describe('reading users out of the database', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' })
		joe.save()
			.then(() => done());
	});

	it('finds all users with the name of joe', (done) => {
		User.find({ name: 'Joe' })
			.then((users) => {
				// The toString() method has to be called otherwise it won't work.
				assert(users[0]._id.toString() === joe._id.toString());
				done();
			});
	});

	it('find a user with a particular id', (done) => {
		User.findOne({ _id: joe._id })
			.then((user) => {
				assert(user.name === 'Joe');
				done();
			});
	});
});