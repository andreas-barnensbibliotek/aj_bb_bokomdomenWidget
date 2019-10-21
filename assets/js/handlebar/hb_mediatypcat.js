module.exports = function(mediatyplist) {
	let ret = '';
	console.log('Mediatyp' + mediatyplist);
	ret = '<div class="mx-0"><p class="my-0"><strong>Mediatyp:</strong> ';
	if (!_.isEmpty(mediatyplist)) {
		for (itm in mediatyplist) {
			ret += mediatyplist[itm].catnamn + ' ';
		}
	} else {
		ret += 'Bok';
	}
	ret += '</p></div>';

	return ret;
};
