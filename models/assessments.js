
var mongoose = require('mongoose');

module.exports = mongoose.model('Assessments',{
	id: String,
	_minorId: String,
	activity: String,
	dateCreated: Date,
	correct: [String],
	incorrect: [String],
});
