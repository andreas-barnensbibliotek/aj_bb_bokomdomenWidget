module.exports = function(Serie, Serienr) {
	let retobj = '';

	console.log('test' + Serie + ' :: ' + Serienr);
	if (Serie) {
		retobj += '<div class="mx-0"><p class="my-0"><strong>Serie:</strong> ';

		retobj +=
			'<a href="/tabid/1468/Default.aspx?shtyp=req&srh=' +
			encodeURIComponent(Serie) +
			'" class="batuu-link">';
		retobj += Serie;

		if (Serienr > 0) {
			retobj += ' del ' + Serienr;
		}

		retobj += '</a></p></div>';
	}
	return retobj;
};
