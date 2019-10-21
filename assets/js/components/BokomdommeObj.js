import apiServiceHandler from '../service/apiServiceHandler';
import appconfigObj from '../appsettings';

const BokomdommeObj = () => {
	let $baseBlock, $curtmpl;
	let _apiObj = apiServiceHandler();
	let _appconfig = appconfigObj();

	function bind() {
		$baseBlock = $('#bokomdomen');
	}

	function ServiceApi(tmpl, url, callback) {
		$curtmpl = tmpl;
		_apiObj.GetjsonDetail(url, function(data) {
			callback($curtmpl(data));
		});
	}

	///////////Publika funktioner/////////////////////

	function getBokOmdomen() {
		let url = _appconfig.api.bokomdomen();
		let templ = _appconfig.handlebartemplate.hb_bokOmdomen_tmp;

		ServiceApi(templ, url, function(data) {
			$baseBlock.html(data);
		});
	}

	function init() {
		bind();
		getBokOmdomen();
	}

	return {
		init: init,
		alfvalue: 'This is an simple value from hello test!'
	};
};
export default BokomdommeObj;
