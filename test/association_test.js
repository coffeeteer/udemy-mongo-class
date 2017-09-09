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
			// popluate() is the process of automatically replacing the specified paths in the document
			// with documents from other collections. We may populate a single document, multiple 
			//documents, plain objects, multiple plain objects, or all objects returned from a query.
			// When the populate method is used, an array documents will be returned inplace of the 
			// original _id
			.populate('blogPosts')
			.then((user) => {
				assert(user.blogPosts[0].title === 'JS is great.');
				done();
			});
	});

	it('saves a full relation graph', (done) => {
		User.findOne({ name: 'Joe'})
			.populate({
				path: 'blogPosts',
				populate: {
					path: 'comments',
					model: 'comment',
					populate: {
						path: 'user',
						model: 'user'
					}
				}
			})
			.then((user) => {
				// console.log(user.blogPosts[0]);
				// console.log(user.blogPosts[0].comments[0]);
				assert(user.name === 'Joe');
				assert(user.blogPosts[0].title === 'JS is great.');
				assert(user.blogPosts[0].comments[0].content === 'Congrats in great post.' );
				assert(user.blogPosts[0].comments[0].user.name === 'Joe');

				// --- Personal CHALLENGE --- destructure these above properties.

				done();
			});
	});
});