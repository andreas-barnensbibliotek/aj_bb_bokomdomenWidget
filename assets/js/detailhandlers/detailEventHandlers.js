import bokdetailhandler from '../detailhandlers/bookdetailHandler';
import extrafunctionHandler from '../components/extrafunctionHandler';
import detailSearchEventHandler from '../eventhandlers/detailSearchEventHandler';
import appconfigObj from '../appsettings';

const detailHandler = () => {
	let detailhandlerObj = bokdetailhandler();
	let _appconfig = appconfigObj();
	let xtrafuncObj = extrafunctionHandler();
	let detailSearchObj = detailSearchEventHandler();
	let $mainboklistcontainer, $fjarilsrate, $ratingTotal, $cmdDetailClose;

	function bindDOM() {
		$mainboklistcontainer = $('#mainboklistcontainer');
		$fjarilsrate = $('.aj_bb_fjarilsrating');
		$ratingTotal = $('#ratingTotal');
		$cmdDetailClose = $('#cmdDetailClose');
	}

	function domEvents(bokid) {
		$mainboklistcontainer.on('change', '.aj_bb_fjarilsrating', function(
			e,
			data
		) {
			//console.log('fjarilsrate: ' + data.from, data.to);

			let bookid = $('#currentBookid').attr('data-bookid');

			detailhandlerObj.fjarilsrating(bookid, data.to, function(data) {
				let option = _appconfig.rating.fjarilsratingOption;
				option.initial_value = data.ratingVal;
				$('#ratingTotal').html(data.ratingTotal);
				$('.aj_bb_fjarilsrating').rate(option);
			});
		});

		$mainboklistcontainer.on('click', '#cmdDetailClose', function(e) {
			//window.history.back();
			if (window.history.length) {
				window.history.back();
				return false;
			}
		});

		$mainboklistcontainer.on('click', '#aj_bb_cmdCommentForm', function(e) {
			let $commentformAlert = $('#aj_bb_commentFormAlert');
			let $nameAlert = $('#aj_bb_nameAlert');
			let $ageAlert = $('#aj_bb_ageAlert');
			let $reviewAlert = $('#aj_bb_reviewAlert');
			let correctForm = true;

			let forminfo = {};
			forminfo.bookid = bokid;
			forminfo.CommentNamn = $('#aj_bb_name').val();
			forminfo.CommentAlder = $('#aj_bb_age').val();
			forminfo.CommentInlagg = $('#aj_bb_review').val();

			$nameAlert.html('');
			$ageAlert.html('');
			$reviewAlert.html('');
			$commentformAlert.html('');

			if (!forminfo.CommentNamn) {
				correctForm = false;
				$nameAlert.html('Du m&aring;ste fylla i namn!');
			}
			if (!forminfo.CommentAlder) {
				correctForm = false;
				$ageAlert.html('Du m&aring;ste fylla i &aring;lder!');
			}
			if (isNaN(forminfo.CommentAlder)) {
				correctForm = false;
				$ageAlert.html('Du m&aring;ste fylla i &aring;lder med siffror!');
			}
			if (!forminfo.CommentInlagg) {
				correctForm = false;
				$reviewAlert.html('Du m&aring;ste skriva vad du tycker!');
			}
			if (correctForm) {
				detailhandlerObj.commentform(forminfo, function() {});
			}
			return false;
		});
	}

	function initfjarilsRating(bookid) {
		detailhandlerObj.fjarilsrating(bookid, 0, function(data) {
			let option = _appconfig.rating.fjarilsratingOption;
			option.initial_value = data.ratingVal;
			$('#ratingTotal').html(data.ratingTotal);
			$('.aj_bb_fjarilsrating').rate(option);
		});
	}

	function init(bookid, userid) {
		bindDOM();
		domEvents(bookid);
		detailSearchObj.init(userid);
		xtrafuncObj.init(userid);
		detailhandlerObj.init(bookid, userid, function(retbookid) {
			//console.log('hämta details via id:' + retbookid);
			initfjarilsRating(retbookid);
		});
	}

	return {
		init: init
	};
};

export default detailHandler;
