const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_test', { useMongoClient: true })

var db = mongoose.connection	
	.on('error', console.error.bind(console, 'You have a database connection error:'))
	.once('open', function() {
		console.log('You have connected to mongoose')
	});