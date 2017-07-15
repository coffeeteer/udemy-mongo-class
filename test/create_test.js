const assert = require('assert');
const User = require('../src/user.js');

describe('Creating records', () => {
	it('saves a user', (done) => {
		const joe = new User({ name: 'Joe' });

		joe.save()
		// Has Joe been saved successfully?
			.then(() => {
				assert(!joe.isNew);
				done();
			});
	});
});