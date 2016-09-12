
var mongoose = require('mongoose');

module.exports = mongoose.model('Minor',{
	id: String,
	_gaurdianId: String,
	name: String,
	dateCreated: Date,
	dob: Date,
	_assessmentIds: [String]
});
