const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/user_test', { useMongoClient: true });

	const db = mongoose.connection
	    .on('error', console.error.bind(console, 'You have a database connection error:'))
	    .once('open', function(){
	       console.log('You have connected to mongoose');
	       done(); 
	    });
});

beforeEach((done) => {
	const users = mongoose.connection.collections;
	const comment = mongoose.connection.collections;
	const blogPosts = mongoose.connection.collections;
	// Clear out our users beforeEach test
	// There is only be one instance of a user
	users.drop(() => {
		comments.drop(() => {
			blogPosts.drop(() => {
				done();
			});
		});
	});
});    