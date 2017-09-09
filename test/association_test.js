const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assocations', () => {
	let joe, blogPost, comment;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' })
		blogPost = new BlogPost({ title: 'JS is great.', content: 'Yep it really is!' });
		comment = new Comment({ content: 'Congrats in great post.'});

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done());
	});

	it('saves a relation between a user and a blogpost', (done) => {
		User.findOne({ name: 'Joe' })
			// Population is the process of automatically replacing the specified paths in the document
			// with documents from other collections. We may populate a single document, multiple 
			//documents, plain objects, multiple plain objects, or all objects returned from a query.
			.populate('blogPosts')
			.then((user) => {
				assert(user.blogPosts[0].title === 'JS is great.');
				done();
			});
	});
});