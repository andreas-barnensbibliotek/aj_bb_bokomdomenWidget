import apiServiceHandler from '../service/apiServiceHandler';
import appconfigObj from '../appsettings';

const extraFunctionHandler = () => {
	let $mainboklistcontainer;
	let _apiObj = apiServiceHandler();
	let _appconfig = appconfigObj();

	function DOMHandler() {
		$mainboklistcontainer = $('#mainboklistcontainer');
	}

	function eventHandler(userid) {
		$mainboklistcontainer.on('click', '.booklistHandler', function(e) {
			let $curBlObj = $(this);
			let $curblchkIcon = $curBlObj.find('div');
			let curbl = $(this).attr('data-boklistid');

			let bookid = $(this)
				.parent()
				.attr('data-currbookid');

			/// lägg till och tabort icon
			if ($curblchkIcon.hasClass('hidedrpchkimg')) {
				// avbocka vald boklista i Boklistningen
				$curblchkIcon.removeClass('hidedrpchkimg');
			} else {
				$curblchkIcon.addClass('hidedrpchkimg');
			}

			addtobooklist(curbl, bookid, function() {
				console.log('inlagd i boklista: ' + curbl + ' och bokid: ' + bookid);
			});

			/// kolla om yttre ikon skall ändras
			let $bookitemcontainer = $curBlObj.parent().parent();
			let Totalantalbooklists = $(this)
				.parent()
				.find('.booklistHandler');
			let Antalcheckedboklists = $bookitemcontainer.find('.hidedrpchkimg');

			let valdbtn = $bookitemcontainer.find('button');
			if (Totalantalbooklists.length == Antalcheckedboklists.length) {
				// avbocka boklistan
				valdbtn.addClass('btn-light').removeClass('btn-success');
				valdbtn
					.find('i')
					.removeClass('fa-check')
					.addClass('fa-ellipsis-v');
			} else {
				valdbtn.addClass('btn-success').removeClass('btn-light');
				valdbtn
					.find('i')
					.removeClass('fa-ellipsis-v')
					.addClass('fa-check');
			}

			return false;
		});

		$mainboklistcontainer.on('click', '.aj_bb_readsnow', function(e) {
			let bookid = $(this).attr('data-currbookid');
			laserjustnu(bookid, function() {
				console.log('laser nu: ' + bookid);
			});
		});
	}

	function laserjustnu(bookid, callback) {
		let usrid = $('#barnensbiblCurrentUserid').html();
		let curuserid = _hanteraUserid(usrid);
		let url = _appconfig.api.lasernu(curuserid, bookid);
		_apiObj.UpdgetJson(url, function(data) {
			callback();
			console.log('laser just nu uppdaterad!');
		});
	}

	function addtobooklist(blistid, bookid, callback) {
		//let usrid = $('#barnensbiblCurrentUserid').html();
		let usrid = _appconfig.userinfo.useridtest();
		let curuserid = _hanteraUserid(usrid);
		let url = _appconfig.api.extrafunctions.addtoBooklist(
			curuserid,
			blistid,
			bookid
		);
		_apiObj.UpdgetJson(url, function(data) {
			callback();
			console.log('Bok i boklista uppdaterad');
		});
	}

	// Privata funktioner helper
	function _hanteraUserid(userid) {
		if (userid <= 0) {
			userid = 0;
		}
		return userid;
	}

	function init(userid) {
		DOMHandler();
		eventHandler(userid);
	}

	return {
		init: init,
		addtobooklist: addtobooklist,
		laserjustnu: laserjustnu
	};
};

export default extraFunctionHandler;
