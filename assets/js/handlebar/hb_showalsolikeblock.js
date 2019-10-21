module.exports = function(val, options) {
	if (val > 0) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
};
