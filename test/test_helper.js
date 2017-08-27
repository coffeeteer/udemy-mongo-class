const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //ES6 Promise

mongoose.connect('mongodb://localhost/user_test', { useMongoClient: true });

before((done) => {
	mongoose.connection	
		.on('error', console.error.bind(console, 'You have a database connection error:'))
		.once('open', function() {
			console.log('You have connected to mongoose');
			done();
		});
});
	

// Drops the last instance before the code runs
beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		// making mocha take a 'pause' before it runs the next test done() does this

		// Ready to run our next test
		//done() ends this function quickly
		done();
		// The order goes beforeEach > Start a long running process > Call 'done' > Tests continue running
	});
});	