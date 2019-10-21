module.exports = function(val, options) {
	console.log('test' + val);
	if (val > 0) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
};
