module.exports = function(val, options) {	
	return options.fn(_.isEmpty(val));
};
