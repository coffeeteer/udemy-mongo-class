const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe', likes: 0 });
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

	it('a model class can update', (done) => {
		assertName(
			User.update({ name: 'Joe' }, { name: 'Alex' }),
			done
		);
	});

	it('a model class can update one record', (done) => {
		assertName(
			User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
			done
		);
	});

	it('a model class can find a recored with an Id and update', (done) => {
		assertName(
			User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
			done
		);
	});

	//Update Operators
	it('A user can have their post count incremented by one', (done) => {
		User.update({name: 'Joe'}, {$inc: {likes: 10}})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user.likes === 10);
				done();
			})
	});
});