const appconfig = () => {
	// let _apiserver = 'http://localhost:59015';
	// let _dnnURL = 'http://localdev.kivdev.se';
	// let _apiserver = 'http://dev1.barnensbibliotek.se:8080';
	// let _dnnURL = 'http://dev1.barnensbibliotek.se';
	//let _apiserver = "http://dev1.barnensbibliotek.se:8080";
	//let _dnnURL = "http://nytt.barnensbibliotek.se";
	let _apiserver = 'https://www2.barnensbibliotek.se';
	let _dnnURL = 'https://www.barnensbibliotek.se';

	let _devkey = 'alf';
	let _apidevkeyend = '/devkey/' + _devkey + '/?type=json&callback=?';
	let _localOrServerURL = '';
	let _htmltemplateURL = '../../../htmlTemplate/';

	//// HandlebarTemplate (skickar tillbaka objectet bara att lägga till data för templaten)
	let _hb_bokOmdomen_template = require('../../htmlTemplate/tpl_senasteBokomdomen.hbs');

	//// api

	let _fn_getbokomdomen = function() {
		return (
			_apiserver + '/Api_v3.1/Comments/typ/getlatest/val/0' + _apidevkeyend
		);
	};

	return {
		apiserver: _apiserver,
		dnnURL: _dnnURL,
		localOrServerURL: _localOrServerURL,
		htmltemplateurl: _dnnURL + _htmltemplateURL,
		devkey: _devkey,
		handlebartemplate: {
			hb_bokOmdomen_tmp: _hb_bokOmdomen_template
		},
		api: {
			bokomdomen: _fn_getbokomdomen
		},
		debug: 'false'
	};
};

export default appconfig;
