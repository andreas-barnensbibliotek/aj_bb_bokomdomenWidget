const usertoobject = {
	//baseurl: "http://localhost:54808/Api_v1.0/usertoopac",
	baseurl: 'https://opac.barnensbibliotek.se/Api_v1.0/usertoopac',
	jsonpurl: '/devkey/alf?type=jsonp&callback=?',
	currentip: '',
	currentCity: '',
	currentISBN: '',
	init: function(ip, isbn) {
		this.currentip = ip;
		this.currenISBN = isbn;

		this.cacheDOM();
		this.bindEvents();
		this.render('start');
	},
	cacheDOM: function(value) {
		// block
		this.$mainblock = $('#UsertoOpac');
		this.$opacVisalinksBlock = $('#opacVisalinksBlock');
		this.$opacDrpdownBlock = $('#opacDrpdownBlock');

		//controls
		this.$UTO_Search_link = $('.userToOpacSearch_link');
		this.$UTO_Bytbibl_link = $('.userToOpacBytbibl_link');
		this.$UTO_val_drp = $('#userToOpacval_drp');
	},
	bindEvents: function(value) {
		let that = this;
		this.$UTO_Bytbibl_link.on('click', function(e) {
			that.$opacDrpdownBlock.toggle('slow');
			return false;
		});

		this.$UTO_val_drp.on('change', function() {
			let vald = $(this).val();
			if (vald == 'Visa alla') {
				that.render('visaalla');
			} else {
				that.currentCity = vald;
				that.$UTO_Search_link.html(that.currentCity);
				that.render('nyval');
				that.$opacDrpdownBlock.hide('slow');
			}
			return false;
		});

		this.$UTO_Search_link.on('click', function(e) {
			that.laddaOpaclink();
			return false;
		});
	},
	render: function(value) {
		let cmdurl = '';
		if (value === 'start') {
			cmdurl = '/city/0/ip/' + this.currentip + this.jsonpurl;
		}
		if (value === 'nyval') {
			cmdurl =
				'/city/' + this.currentCity + '/ip/' + this.currentip + this.jsonpurl;
		}
		if (value === 'visaalla') {
			cmdurl = this.jsonpurl;
		}
		this.collectDATA(cmdurl);
	},
	selectcurrentcity: function(data) {
		let valdcity = 'Välj kommun!';
		if (data.UsertoopacList._mainAdr != 'Finns ej') {
			if (!data.UsertoopacList._prefAdr) {
				valdcity = data.UsertoopacList._mainAdr;
			} else {
				valdcity = data.UsertoopacList._prefAdr;
			}
		}
		return valdcity;
	},
	laddadropdown: function(data) {
		let that = this;
		let options = this.$UTO_val_drp.prop('options');
		if (options) {
			$('option', this.$UTO_val_drp).remove();

			$.each(data.UsertoopacList._kommunList, function(val, text) {
				options[options.length] = new Option(text, text);
			});
			options[options.length] = new Option('Visa alla', 'Visa alla');

			this.$UTO_val_drp.val(this.currentCity);
		}
	},
	laddaOpaclink: function(data) {
		let that = this;
		let cmdurl =
			'/prefadr/' +
			this.currentCity +
			'/isbn/' +
			this.currenISBN +
			'/ip/' +
			this.currentip +
			this.jsonpurl;

		this.usertoopacAPI(cmdurl, function(data) {
			that.opacredirect(data.Opaclink);
		});
	},
	opacredirect: function redirect(url) {
		var ua = navigator.userAgent.toLowerCase(),
			isIE = ua.indexOf('msie') !== -1,
			version = parseInt(ua.substr(4, 2), 10);

		// Internet Explorer 8 and lower
		if (isIE && version < 9) {
			var link = document.createElement('a');
			link.href = url;
			document.body.appendChild(link);
			link.click();
		}
		// All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
		else {
			window.location.href = url;
		}
	},
	collectDATA: function(url) {
		let that = this;

		this.usertoopacAPI(url, function(data) {
			let city = that.selectcurrentcity(data);
			if (city != null) {
				that.currentCity = city;
			}

			that.laddadropdown(data);
			that.$UTO_Search_link.html(that.currentCity);
		});
	},
	usertoopacAPI: function(url, callback) {
		if (!url) {
			return false;
		} else {
			//console.log("Searchservicen hämtar Arrangemangdata");
			url = this.baseurl + url;
			$.ajax({
				async: true,
				type: 'get',
				dataType: 'jsonp',
				url: url,
				success: function(data) {
					console.log('Search Detalj arrangemang hämtat: ');
					callback(data);
				},
				error: function(xhr, ajaxOptions, thrownError) {
					alert('Nått blev fel vid hämtning av arrangemang!');
				}
			});
		}
	}
};

// //Start userToOpacFunction
// let ip = $(".bb_aj_userip").html();//3.237.214.150;
// let isbn = $('.bookisbn').html();
// usertoobject.init(ip, isbn);

export default usertoobject;
