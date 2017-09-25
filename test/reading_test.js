const assert = require('assert');
const User = require('../src/user');

describe('reading users out of the database', () => {
	var joe, maria, alex, zach;

	beforeEach((done) => {
		alex = new User({ name: 'Alex'});
		joe = new User({ name: 'Joe' });
		maria = new User({name: 'Maria'});
		zach = new User({name: 'Zach'});

		Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
			.then(() => done())		
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

	//Query Modifiers
	it('can skip and limit the result set', () => {
		User.find({}).skip(1).limit(2)
	});
});