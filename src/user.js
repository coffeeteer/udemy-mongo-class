const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: {
   	type: String,
   	validate: {
   		validator: (name) => name.length > 2,
   		message: 'Name must be longer than two characters' 
   	},
   	required: [true, 'Name is required.']
   },
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
	   	type: Schema.Types.ObjectId,
	   	// blogPost refers to the blogPost model in the blogPost.js file
	   	ref: 'blogPost'
	}]
});

UserSchema.virtual('postCount').get(function() {
	return this.posts.length;
});

//Mongoose Middleware
User.Schema.pre('remove', function() {
	const BlogPost = mongoose.model('blogPost');
	// this === joe

});

const User = mongoose.model('user', UserSchema);

module.exports =  User;