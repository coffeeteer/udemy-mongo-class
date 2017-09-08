const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assocations', () => {
	let joe, blogPost, comment;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' })
		blogPost = new BlogPost({ tile: 'JS is great.', content: 'Yep it really is!' });
		comment = new Comment({ content: 'Congrats in great post.'});

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done());
	});

	it.only('saves a relation between a user and a blogpost', (done) => {
		User.findOne({ name: 'Joe' })
			.then((user) => {
				console.log(user);
				done();
			});
	});
});