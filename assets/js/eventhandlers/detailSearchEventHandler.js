import autocompleteObj from '../components/autocompleteHandler';
import appconfigObj from '../appsettings';

const detailSearchEventHandler = () => {
	let $mainboklistcontainer, $aj_bb_searchbox, $bb_aj_searchbtn, searchbox;

	let autoObj = autocompleteObj();
	let _appconfig = appconfigObj();

	function bindDom() {
		$mainboklistcontainer = $('#mainboklistcontainer');
		$aj_bb_searchbox = $('#aj_bb_searchbox');
		$bb_aj_searchbtn = document.getElementById('aj_bb_searchbtn');
		autoObj.initAuto();
		searchbox = document.getElementById('aj_bb_searchbox');
	}

	function BokSearchEvent(userid) {
		if (typeof searchbox != 'undefined' && searchbox != null) {
			searchbox.addEventListener('keyup', function(event) {
				event.preventDefault();
				if (event.keyCode === 13) {
					$bb_aj_searchbtn.click();
					$bb_aj_searchbtn.focus();
				}
			});
		}

		$mainboklistcontainer.on('click', '#aj_bb_searchbtn', function(e) {
			let searchstr = $aj_bb_searchbox.val();

			if (typeof searchbox != 'undefined' && searchbox != null) {
				window.location =
					'/tabid/' +
					_appconfig.tabid.katalogenSearchvy +
					'/Default.aspx?shtyp=req&srh=' +
					encodeURIComponent(searchstr);
			}

			return false;
		});
	}

	function init(userid) {
		bindDom();
		BokSearchEvent(userid);
	}

	return {
		init: init
	};
};

export default detailSearchEventHandler;
