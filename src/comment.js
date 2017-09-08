const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: String,
	//'ref' refers to the model
	user: {type: Schema.Types.ObjectId, ref: 'user'}
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;