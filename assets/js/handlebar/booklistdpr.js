module.exports = function(userbooklistobj, bookid) {
	if (_.isEmpty(userbooklistobj)) {
		return '';
	} else {
		return booklistHandler.dropdownhtml(userbooklistobj, bookid);
	}
};

let booklistHandler = (function() {
	function isBookInList(tmpbooklist, bookid) {
		let ret = false;

		for (const itm of Object.keys(tmpbooklist)) {
			if (tmpbooklist[itm].Bookid == bookid) {
				ret = true;
			}
		}
		return ret;
	}

	function dropdownhtml(userbooklistobj, bookid) {
		let visa = false;

		let retstrTop = '<div class="align-self-start">';
		retstrTop += '<div class="dropdown dropleft">';

		//ikoner här

		let retstrlinks =
			'<div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-currbookid="' +
			bookid +
			'" >';
		retstrlinks +=
			'<a class="dropdown-item" href="/Krypin/bk_aj_boktips_Krypin/tabid/1431/Default.aspx?bookid=' +
			bookid +
			'"><div class="btn  btn-circle-drp"><i class="fas fa-pen"></i></div> Skriv boktips</a>';
		// retstrlinks +=
		// 	'<a class="dropdown-item aj_bb_readsnow" data-currbookid="' +
		// 	bookid +
		// 	'"href="#">L&auml;ser denna just nu</a>';
		retstrlinks +=
			'<div class="addtobooklistHeader"><b>Mina boklistor</b></div>';

		let retstrBooklist = '';
		if (userbooklistobj) {
			for (const key of Object.keys(userbooklistobj)) {
				// console.log('Lista ' + key, userbooklistobj[key]);

				let tmpbooklist = userbooklistobj[key].BooklistItems;

				retstrBooklist +=
					'<a class="dropdown-item booklistHandler" data-boklistid="' +
					userbooklistobj[key].BlID +
					'" href="#">';

				if (booklistHandler.isBookInList(tmpbooklist, bookid)) {
					// console.log('Bok i listan: ' + key);
					retstrBooklist +=
						'<div class="btn btn-success btn-circle-drp"><i class="fas fa-check"></i></div>';
					visa = true;
				} else {
					retstrBooklist +=
						'<div class="btn btn-success btn-circle-drp hidedrpchkimg" ><i class="fas fa-check"></i></div>';
				}

				retstrBooklist += userbooklistobj[key].Booklistname + '</a>';
			}
		}

		let retstrbtnIkon = '';
		//visa länk med markering om bok finns i listan
		if (visa == true) {
			retstrbtnIkon =
				'<button class="btn btn-success btn-circle" type="button" id="dropdownMenuButton" data-toggle="dropdown" title="Finns i min boklista" aria-haspopup="true" aria-expanded="false">';
			retstrbtnIkon += '<i class="fas fa-check"></i></button>';
		} else {
			retstrbtnIkon =
				'<button class="btn btn-light btn-circle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
			retstrbtnIkon += '<i class="fas fa-ellipsis-v"></i></button>';
		}

		let retstrEnd = '</div></div></div>';

		let retstr =
			retstrTop + retstrbtnIkon + retstrlinks + retstrBooklist + retstrEnd;
		return retstr;
	}

	return {
		isBookInList: isBookInList,
		dropdownhtml: dropdownhtml
	};
})();
