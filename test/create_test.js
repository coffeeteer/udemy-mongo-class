const assert = require('assert');
const User = require('../src/user.js');

describe('Creating records', () => {
	it('saves a user', () => {
		const joe = new User({ name: 'Joe Blow' });

		joe.save();
	});
});