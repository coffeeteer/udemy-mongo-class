const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done());
	});

	it('Model Instance Remove', (done) => {
		joe.remove()
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('Class Method Remove', (done) => {
		User.remove({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('Class Method findAndRemove', (done) => {
		User.findOneAndRemove({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('Class Method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(joe._id)
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});
});