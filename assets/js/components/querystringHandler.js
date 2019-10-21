import displayHandler from '../eventhandlers/controlDisplayHandler';

//////// History handler
//// ta hand om querystring parametrar och lagra dom i ett jsonobject urlparam.
const queryHandler = () => {
	let displayobj = displayHandler();

	function checkparamsinurl(urlParams) {
		let match,
			pl = /\+/g, // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function(s) {
				return decodeURIComponent(s.replace(pl, ' '));
			},
			query = window.location.search.substring(1);

		while ((match = search.exec(query)))
			urlParams[decode(match[1])] = decode(match[2]);

		if (!urlParams.tab) {
			let sPageURL = window.location.href.split('/');
			let index = sPageURL.indexOf('tabid');
			if (index > 0) {
				urlParams.tabid = sPageURL[index + 1];
			}
			index = sPageURL.indexOf('srh');
			if (index > 0) {
				urlParams.srh = sPageURL[index + 1];
			}
			index = sPageURL.indexOf('shtyp');
			if (index > 0) {
				urlParams.shtyp = sPageURL[index + 1];
			}
			index = sPageURL.indexOf('bookid');
			if (index > 0) {
				urlParams.bookid = sPageURL[index + 1];
			}
			index = sPageURL.indexOf('id');
			if (index > 0) {
				urlParams.bookid = sPageURL[index + 1];
			}
		}
		return urlParams;
	}

	function chkpage(urlParams) {
		// tabid 2365 detaljvy http://localdev.kivdev.se/katalog_4_2/katalogenv5_detail/tabid/2365/Default.aspx?id=2
		// tabid 2361 listvy

		return displayobj.checkToDisplay(urlParams);
	}

	return {
		checkparamsinurl: checkparamsinurl,
		checkpage: chkpage
	};
};
export default queryHandler;
