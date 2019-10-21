import appconfigObj from '../appsettings';

const displayHandler = () => {
	let $fullwidthcontainer, $katalogenMainListBlock, $aj_bb_btnCat;
	let _appconfig = appconfigObj();
	let urlParams = {
		shtyp: '0'
	};

	function bindDom() {
		$fullwidthcontainer = $('.bb_aj_krypincontainer');
		$katalogenMainListBlock = $('#aj_bb_katalogenMainListBlock');
		$aj_bb_btnCat = $('.btn-category');
	}

	function displaypage(urlParams) {
		// tabid 2365 detaljvy http://localdev.kivdev.se/katalog_4_2/katalogenv5_detail/tabid/2365/Default.aspx?id=2
		// tabid 2361 listvy
		bindDom();
		let retobj = false;
		switch (urlParams.tabid) {
			case _appconfig.tabid.katalogenDetaljvy: //detaljvyn
				console.log('visa Detaljsidan');
				retobj = true;
				break;

			default:
				listvyhandler(urlParams);
		}

		return retobj;
	}

	function listvyhandler(urlParams) {
		if (!urlParams.shtyp) {
			urlParams.shtyp = '0';
		}

		if (urlParams.shtyp != '0') {
			console.log('visa listning');
			$fullwidthcontainer.hide();
			$katalogenMainListBlock.show();
		} else {
			console.log('visa startsidan');
			$fullwidthcontainer.show();
			$katalogenMainListBlock.hide();
		}
		return false;
	}

	return {
		checkToDisplay: displaypage
	};
};
export default displayHandler;
