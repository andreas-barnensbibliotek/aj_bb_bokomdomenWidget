import BooklistObj from '../components/booklisthandler';
import autocompleteObj from '../components/autocompleteHandler';
import displayHandler from '../eventhandlers/controlDisplayHandler';
import extrafunctionHandler from '../components/extrafunctionHandler';

const boklistEventHandler = () => {
	let $catnav,
		$mainboklistcontainer,
		$spinner,
		$aj_katalog_groupId,
		$aj_bb_pagination,
		$aj_bb_searchbox,
		$pagerstyle,
		$aj_bb_filterbtn,
		$aj_bb_filterblock,
		$aj_bb_Nofilterblock,
		$bb_aj_spinnerHeader,
		$bb_aj_searchbtn,
		$bb_aj_spinnerHeaderWorks;

	let urlParams = {
		shtyp: '0'
	};
	let blobj = BooklistObj();
	let autoObj = autocompleteObj();
	let displayobj = displayHandler();
	let xtrafuncObj = extrafunctionHandler();

	function bindDom() {
		$mainboklistcontainer = $('#mainboklistcontainer');
		$spinner = $('.bb_aj_spinner');
		$catnav = $('.catNav');
		$aj_katalog_groupId = $('#aj_katalog_groupId');
		$aj_bb_pagination = $('#aj_bb_pagination');
		$aj_bb_searchbox = $('#aj_bb_searchbox');
		$aj_bb_filterbtn = $('#aj_bb_filterbtn');
		$aj_bb_filterblock = $('#aj_bb_filterblock');
		$aj_bb_Nofilterblock = $('#aj_bb_Nofilterblock');
		$bb_aj_spinnerHeader = $('.bb_aj_spinnerHeader');
		$bb_aj_spinnerHeaderWorks = $('.bb_aj_spinnerHeaderWorks');
		$bb_aj_searchbtn = document.getElementById('aj_bb_searchbtn');
		autoObj.initAuto();
		$pagerstyle = $('.pagination');
	}

	function BoklistEvent(userid) {
		let searchbox = document.getElementById('aj_bb_searchbox');
		if (typeof searchbox != 'undefined' && searchbox != null) {
			searchbox.addEventListener('keyup', function(event) {
				event.preventDefault();
				if (event.keyCode === 13) {
					$bb_aj_searchbtn.click();
					$bb_aj_searchbtn.focus();
				}
			});
		}

		$mainboklistcontainer.on('click', '.catNav', function(e) {
			let catid = $(this).attr('data-catid');
			console.log('catid= ' + catid);
			spinnerobj(true);
			urlParams.shtyp = catid;

			displayobj.checkToDisplay(urlParams);
			window.history.pushState('', 'titletest', '?shtyp=cat&srh=' + catid);
			$pagerstyle.html('');

			if (catid != 0) {
				jplistReset();

				blobj.catSearch(catid, userid, function(data) {
					//alert('funkar');

					jplistInitHandler();
					spinnerobj(false);
				});
			}
			return false;
		});

		$mainboklistcontainer.on('click', '.amnNav', function(e) {
			let amnid = $(this).attr('data-amnid');
			spinnerobj(true);
			urlParams.shtyp = amnid;

			displayobj.checkToDisplay(urlParams);
			window.history.pushState('', 'Search amne', '?shtyp=amn&srh=' + amnid);
			$pagerstyle.html('');
			jplistReset();

			blobj.amnSearch(amnid, userid, function(data) {
				//alert('funkar');
				jplistInitHandler();
				spinnerobj(false);
			});

			return false;
		});

		$mainboklistcontainer.on('click', '#aj_bb_searchbtn', function(e) {
			let searchstr = $aj_bb_searchbox.val();
			spinnerobj(true);

			urlParams.shtyp = 'freeserch';
			displayobj.checkToDisplay(urlParams);

			$pagerstyle.html('');
			jplistReset();

			blobj.fritextSearch(searchstr, userid, function(data) {
				//alert('funkar');
				jplistInitHandler();
				spinnerobj(false);
			});

			return false;
		});

		$mainboklistcontainer.on('click', '#aj_bb_filterbtn', function(e) {
			let showfilter = $aj_bb_filterbtn.attr('data-visning');
			if (showfilter === 'no') {
				$aj_bb_filterblock.show();
				$aj_bb_Nofilterblock.removeClass('col-md-12').addClass('col-md-9');
				$aj_bb_filterbtn.attr('data-visning', 'ja');
			} else {
				$aj_bb_filterblock.hide();
				$aj_bb_Nofilterblock.removeClass('col-md-9').addClass('col-md-12');
				$aj_bb_filterbtn.attr('data-visning', 'no');
			}

			return false;
		});
	}
	function jplistInitHandler() {
		$mainboklistcontainer.jplist({
			command: 'empty'
		});

		$mainboklistcontainer.jplist({
			itemsBox: ' #aj_katalog_groupId',
			itemPath: '.aj_jplist_item',
			panelPath: '.jplist-panel',
			storage: 'localstorage',
			storageName: 'my-page-storage',
			animateToTop: '#aj_bb_katalogenMainListBlock'
		});
	}

	function jplistReset() {
		// $aj_bb_searchbox.val('');
		$mainboklistcontainer.jplist({
			command: 'empty'
		});
	}

	function init(userid, urlParams, callback) {
		let param = '';
		bindDom();

		BoklistEvent(userid);
		xtrafuncObj.init(userid);
		spinnerobj(true);

		param = urlParams.srh;

		switch (urlParams.shtyp) {
			case 'req':
				if (param == '') {
					param = 'birger';
				}

				blobj.fritextSearch(param, userid, function(data) {
					initcallback(userid, function() {
						callback();
					});
				});
				break;

			default:
				if (typeof param == 'undefined') {
					param = '6';
				}
				blobj.init(param, userid, function(data) {
					initcallback(userid, function() {
						callback();
					});
				});
		}
	}

	// Använd för att fixa
	let observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type == 'attributes') {
				if (mutation.target.style.display == 'none') {
					$('.aj_jplist_item').attr('style', 'display:none!important;');
				} else {
					$('.aj_jplist_item').show();
				}
			}
			return true;
		});
	});

	function initcallback(userid, callback) {
		$pagerstyle.html('');
		jplistInitHandler();
		spinnerobj(false);
		if (parseInt(userid) <= 0) {
			$('.align-self-start').hide();
		} else {
			$('.align-self-start').show();
		}
		let element = document.querySelector('.jplist-pagination');
		observer.observe(element, {
			attributes: true //configure it to listen to attribute changes
		});
		callback();
	}

	/// HELPER functions---------------
	function spinnerobj(visa) {
		if (visa) {
			$spinner.show();
			$bb_aj_spinnerHeader.hide();
			$bb_aj_spinnerHeaderWorks.show();
			$aj_katalog_groupId.hide();
			$aj_bb_pagination.hide();
		} else {
			$spinner.hide();
			$bb_aj_spinnerHeader.show();
			$bb_aj_spinnerHeaderWorks.hide();
			$aj_katalog_groupId.show();
			$aj_bb_pagination.show();
		}
	}

	return {
		init: init
	};
};

export default boklistEventHandler;
