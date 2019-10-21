module.exports = function(forfattarelist) {
	let retobj = '';
	for (itm in forfattarelist) {
		retobj +=
			'<a href="/tabid/1468/Default.aspx?shtyp=req&srh=' +
			encodeURIComponent(forfattarelist[itm].namn) +
			'" class="batuu-link">';
		retobj += forfattarelist[itm].namn + '</a>';
	}
	return retobj;
};
