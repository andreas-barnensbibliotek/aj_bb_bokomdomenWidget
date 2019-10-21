// let _ = require('lodash');
import apiServiceHandler from '../service/apiServiceHandler';
import usertoopac from '../components/usertoOpac';
import appconfigObj from '../appsettings';

const BookDetailsObj = () => {
	let $baseBlock,
		$forfalsowriteblock,
		$currentBookid,
		$alsolikethisbook,
		$aj_bb_comments,
		$aj_bb_iphost,
		$curtmpl;
	let _apiObj = apiServiceHandler();
	let _appconfig = appconfigObj();
	let _UsrToOpacObj = usertoopac;

	function bind() {
		$baseBlock = $('#aj_bb_detaljBlock');
		$forfalsowriteblock = $('#aj_bb_forfAlsoWriteBlock');
		$alsolikethisbook = $('#aj_bb_AlsoLikeThis');
		$aj_bb_comments = $('#aj_bb_comments');
		$aj_bb_iphost = $('.iphost');
		$curtmpl = '';
	}

	function ServiceApi(tmpl, url, callback) {
		$curtmpl = tmpl;
		_apiObj.GetjsonDetail(url, function(data) {
			callback($curtmpl(data));
		});
	}

	///////////Publika funktioner/////////////////////

	function getBaseBookDetail(bookid, userid, callback) {
		userid = _hanteraUserid(userid);
		let url = _appconfig.api.bokdetaljer.DetailBaseData(bookid, userid);
		let templ = _appconfig.handlebartemplate.hb_DetailBaseData_tmp;

		ServiceApi(templ, url, function(data) {
			$baseBlock.html(data);
			callback(data);
		});
	}

	function getforfAlsoWrite(callback) {
		let creatorid = $('.bb_aj_creator .aj_bb_creatorid').attr('data-creatorid');
		let url = _appconfig.api.bokdetaljer.forfAlsoWrite(creatorid);
		let templ = _appconfig.handlebartemplate.hb_DetailForfAlsoWrite_tmp;

		ServiceApi(templ, url, function(data) {
			$forfalsowriteblock.html(data);
			callback(data);
		});
	}

	function getAlsoLikeThisBook(bookid, callback) {
		let url = _appconfig.api.bokdetaljer.getAlsoLikeThisBook(bookid);
		let templ = _appconfig.handlebartemplate.hb_DetailAlsoLikeThisBook_tmp;

		ServiceApi(templ, url, function(data) {
			$alsolikethisbook.html(data);
			callback(data);
		});
	}

	function ratingHandler(bookid, val, callback) {
		let url = _appconfig.api.updateRating(bookid, val);
		_apiObj.GetjsonDetail(url, function(data) {
			callback(data);
		});
	}

	function commentForm(formObj, callback) {
		let url = _appconfig.api.bokdetaljer.addBookComments();
		_apiObj.UpdPostjson(url, formObj, function(data) {
			getThisBookComments(formObj.bookid, function() {
				callback();
			});
		});
	}

	function getThisBookComments(bookid, callback) {
		let url = _appconfig.api.bokdetaljer.thisBookComments(bookid);
		let templ = _appconfig.handlebartemplate.hb_thisBookComments_tmp;

		ServiceApi(templ, url, function(data) {
			$aj_bb_comments.html(data);
			callback(data);
		});
	}

	function init(bookid, userid, callback) {
		bind();
		userid = _hanteraUserid(userid);
		_appconfig.userinfo.userid = userid;

		getBaseBookDetail(bookid, userid, function(data) {
			getAlsoLikeThisBook(bookid, function(tmpret) {
				//console.log(tmpret);
				getforfAlsoWrite(function(ret) {
					//console.log(ret);
					getThisBookComments(bookid, function(cmobj) {
						//	console.log(cmobj);
						//Start userToOpacFunction
						let ip = $aj_bb_iphost.html(); // $(".bb_aj_userip").html();
						let isbn = $('#aj_kk_isbn').attr('data-isbn'); //  '9789163319297'; //$('.bookisbn').html();
						_UsrToOpacObj.init(ip, isbn);
					});
				});
			});

			callback(bookid);
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
		init: init,
		basedetail: getBaseBookDetail,
		fjarilsrating: ratingHandler,
		commentform: commentForm,
		alfvalue: 'This is an simple value from hello test!'
	};
};
export default BookDetailsObj;
