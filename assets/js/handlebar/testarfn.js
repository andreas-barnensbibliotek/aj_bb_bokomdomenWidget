module.exports = function(userbooklistobj, bookid) {
	//console.log('funkar bookid: ' + bookid);
	// let ret = '';
	// if (userbooklistobj) {
	// 	for (const key of Object.keys(userbooklistobj)) {
	// 		console.log('Lista ' + key, userbooklistobj[key]);

	// 		let tmpbooklist = userbooklistobj[key].BooklistItems;

	// 		ret +=
	// 			'<a class="dropdown-item booklistHandler" data-boklistid="' +
	// 			userbooklistobj[key].BlID +
	// 			'" href="#">';

	// 		if (booklistHandler.isBookInList(tmpbooklist, bookid)) {
	// 			console.log('Bok i listan: ' + key);
	// 			ret += '->';
	// 		}

	// 		ret += userbooklistobj[key].Booklistname + '</a>';
	// 	}
	// }
	// return ret;
	return booklistHandler.dropdownhtml(userbooklistobj, bookid);
};

let booklistHandler = (function() {
	function isBookInList(tmpbooklist, bookid) {
		let ret = false;

		for (const itm of Object.keys(tmpbooklist)) {
			if (tmpbooklist[itm].Bookid == bookid) {
				ret = true;
				console.log(
					'HITTAD!!!!----------------------------------------------------------------------' +
						tmpbooklist[itm].title
				);
			}
		}
		return ret;
	}

	function dropdownhtml(userbooklistobj, bookid) {
		let visa = false;

		let retstr = '<div class="align-self-start">';
		retstr += '<div class="dropdown dropleft">';
		retstr +=
			'<button class="btn btn-light btn-circle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		retstr += '<i class="fas fa-ellipsis-v"></i></button>';
		retstr +=
			'<div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-currbookid="' +
			bookid +
			'" >';
		retstr +=
			'<a class="dropdown-item" href="/Krypin/bk_aj_boktips_Krypin/tabid/1354/Default.aspx?bookid=' +
			bookid +
			'">Skriv boktips</a>';
		retstr += '<a class="dropdown-item " href="#">L&auml;ser denna just nu</a>';
		retstr +=
			'<div class="addtobooklistHeader"><b>L&auml;gg till i boklista</b></div>';
		if (userbooklistobj) {
			for (const key of Object.keys(userbooklistobj)) {
				console.log('Lista ' + key, userbooklistobj[key]);

				let tmpbooklist = userbooklistobj[key].BooklistItems;

				retstr +=
					'<a class="dropdown-item booklistHandler" data-boklistid="' +
					userbooklistobj[key].BlID +
					'" href="#">';

				if (booklistHandler.isBookInList(tmpbooklist, bookid)) {
					console.log('Bok i listan: ' + key);
					retstr += '->';
					visa = true;
				}

				retstr += userbooklistobj[key].Booklistname + '</a>';
			}
		}
		retstr += '</div></div></div>';

		if (visa == true) {
			retstr += '	<div>CHECKED!</div>';
		}
		return retstr;
	}

	return {
		isBookInList: isBookInList,
		dropdownhtml: dropdownhtml
	};
})();
