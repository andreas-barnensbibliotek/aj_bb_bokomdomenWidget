// let _ = require('lodash');
import storageHandlerObj from '../components/storagehandler';
import apiServiceHandler from '../service/apiServiceHandler';
import appconfigObj from '../appsettings';

const BooklistObj = () => {
	let $group = '';
	let _apiObj = apiServiceHandler();
	let _appconfig = appconfigObj();
	let _storeObj = storageHandlerObj();

	function bind() {
		//find the elements group
		$group = $('#aj_katalog_groupId'); // document.getElementById('aj_katalog_group');
	}

	function gethbTmpl(dataObj, callback) {
		//debug lägg i appsettings.js
		let templ = _appconfig.handlebartemplate.hb_booklist_tmp;
		callback(templ(dataObj));
	}

	function serviceApi(url, callback) {
		_apiObj.Getjson(url, function(data) {
			gethbTmpl(data, function(ret) {
				callback(ret);
			});
		});
	}

	function servicePostApi(url, data, callback) {
		_apiObj.Postjson(url, data, function(data) {
			gethbTmpl(data, function(ret) {
				callback(ret);
			});
		});
	}

	function render(url, callback) {
		bind();

		//create a new element
		const div = serviceApi(url, function(data) {
			//refresh jPList content
			//jplist.resetContent(function() {
			//add element to the group

			$group.html(data);

			callback(true);
			//});
		});
		//'<div data-jplist-item><div class="name">Andreas Josefsson</div></div><div data-jplist-item><div class="name">Ida-Stina Josefsson</div></div><div data-jplist-item><div class="name">Nils-Magnus Josefsson</div></div>                ';
	}
	function renderPost(url, postdata, callback) {
		bind();

		//create a new element
		const div = servicePostApi(url, postdata, function(data) {
			//refresh jPList content
			//jplist.resetContent(function() {
			//add element to the group

			$group.html(data);

			callback(true);
			//});
		});
		//'<div data-jplist-item><div class="name">Andreas Josefsson</div></div><div data-jplist-item><div class="name">Ida-Stina Josefsson</div></div><div data-jplist-item><div class="name">Nils-Magnus Josefsson</div></div>                ';
	}
	///////////Publika funktioner/////////////////////
	function fritextSearch(searchstr, userid, callback) {
		//debug
		let Postdata = {
			Searchstr: searchstr,
			userid: userid
		};

		let url = _appconfig.api.boklistor.boklistbyFritext();

		_storeObj.resetstorage();

		renderPost(url, Postdata, function() {
			// jplist.resetContent(function() {
			callback();
			// });
		});
	}

	function catSearch(catid, userid, callback) {
		userid = _hanteraUserid(userid);
		//debug lägg i appsettings.js
		let url = _appconfig.api.boklistor.boklistbyCatID(catid, userid);

		_storeObj.resetstorage();
		//reset ALL controls

		render(url, function() {
			// jplist.resetContent(function() {
			callback();
			// });
		});
	}

	function amnSearch(amnid, userid, callback) {
		userid = _hanteraUserid(userid);
		//debug lägg i appsettings.js
		let url = _appconfig.api.boklistor.boklistbyAmneID(amnid, userid);

		_storeObj.resetstorage();

		render(url, function() {
			// jplist.resetContent(function() {
			callback();
			// });
		});
	}

	function autocomplete(searchstr, callback) {
		userid = _hanteraUserid(userid);
		//debug lägg i appsettings.js
		let url = _appconfig.api.autocomplete.getbyAuto(searchstr);
		// _storeObj.resetstorage();

		render(url, function() {
			// jplist.resetContent(function() {
			callback();
			// });
		});
	}

	function init(catid, userid, callback) {
		userid = _hanteraUserid(userid);
		//_appconfig.userinfo.userid = userid;
		//debug lägg i appsettings.js
		let url = _appconfig.api.boklistor.boklistbyCatID(catid, userid);
		render(url, function() {
			callback();
		});
	}

	// Privata funktioner helper
	function _hanteraUserid(userid) {
		if (userid <= 0) {
			userid = 0;
		}
		return userid;
	}

	return {
		fritextSearch: fritextSearch,
		init: init,
		catSearch: catSearch,
		amnSearch: amnSearch,
		autocomplete: autocomplete,
		alfvalue: 'This is an simple value from hello test!'
	};
};
export default BooklistObj;
