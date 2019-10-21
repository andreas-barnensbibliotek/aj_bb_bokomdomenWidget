(function(modules) {
    function webpackJsonpCallback(data) {
        var chunkIds = data[0];
        var moreModules = data[1];
        var executeModules = data[2];
        var moduleId, chunkId, i = 0, resolves = [];
        for (;i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if (installedChunks[chunkId]) resolves.push(installedChunks[chunkId][0]);
            installedChunks[chunkId] = 0;
        }
        for (moduleId in moreModules) if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) modules[moduleId] = moreModules[moduleId];
        if (parentJsonpFunction) parentJsonpFunction(data);
        while (resolves.length) resolves.shift()();
        deferredModules.push.apply(deferredModules, executeModules || []);
        return checkDeferredModules();
    }
    function checkDeferredModules() {
        var result;
        for (var i = 0; i < deferredModules.length; i++) {
            var deferredModule = deferredModules[i];
            var fulfilled = true;
            for (var j = 1; j < deferredModule.length; j++) {
                var depId = deferredModule[j];
                if (0 !== installedChunks[depId]) fulfilled = false;
            }
            if (fulfilled) {
                deferredModules.splice(i--, 1);
                result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
            }
        }
        return result;
    }
    var installedModules = {};
    var installedChunks = {
        main: 0
    };
    var deferredModules = [];
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
        });
    };
    __webpack_require__.r = function(exports) {
        if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };
    __webpack_require__.t = function(value, mode) {
        if (1 & mode) value = __webpack_require__(value);
        if (8 & mode) return value;
        if (4 & mode && "object" === typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    jsonpArray.push = webpackJsonpCallback;
    jsonpArray = jsonpArray.slice();
    for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
    var parentJsonpFunction = oldJsonpFunction;
    deferredModules.push([ "./assets/js/main.js", "vendors~main" ]);
    return checkDeferredModules();
})({
    "./assets/js/appsettings.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("const appconfig = () => {\n  // let _apiserver = 'http://localhost:59015';\n  // let _dnnURL = 'http://localdev.kivdev.se';\n  // let _apiserver = 'http://dev1.barnensbibliotek.se:8080';\n  // let _dnnURL = 'http://dev1.barnensbibliotek.se';\n  //let _apiserver = \"http://dev1.barnensbibliotek.se:8080\";\n  //let _dnnURL = \"http://nytt.barnensbibliotek.se\";\n  let _apiserver = 'https://www2.barnensbibliotek.se';\n  let _dnnURL = 'https://www.barnensbibliotek.se';\n  let _devkey = 'alf';\n\n  let _apidevkeyend = '/devkey/' + _devkey + '/?type=json&callback=?';\n\n  let _localOrServerURL = '';\n  let _htmltemplateURL = '../../../htmlTemplate/'; //// HandlebarTemplate (skickar tillbaka objectet bara att lägga till data för templaten)\n\n  let _hb_bokOmdomen_template = __webpack_require__(/*! ../../htmlTemplate/tpl_senasteBokomdomen.hbs */ \"./htmlTemplate/tpl_senasteBokomdomen.hbs\"); //// api\n\n\n  let _fn_getbokomdomen = function _fn_getbokomdomen() {\n    return _apiserver + '/Api_v3.1/Comments/typ/getlatest/val/0' + _apidevkeyend;\n  };\n\n  return {\n    apiserver: _apiserver,\n    dnnURL: _dnnURL,\n    localOrServerURL: _localOrServerURL,\n    htmltemplateurl: _dnnURL + _htmltemplateURL,\n    devkey: _devkey,\n    handlebartemplate: {\n      hb_bokOmdomen_tmp: _hb_bokOmdomen_template\n    },\n    api: {\n      bokomdomen: _fn_getbokomdomen\n    },\n    debug: 'false'\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (appconfig);\n\n//# sourceURL=webpack:///./assets/js/appsettings.js?");
    },
    "./assets/js/components/BokomdommeObj.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval('/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _service_apiServiceHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/apiServiceHandler */ "./assets/js/service/apiServiceHandler.js");\n/* harmony import */ var _appsettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../appsettings */ "./assets/js/appsettings.js");\n\n\n\nconst BokomdommeObj = () => {\n  let $baseBlock, $curtmpl;\n\n  let _apiObj = Object(_service_apiServiceHandler__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])();\n\n  let _appconfig = Object(_appsettings__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])();\n\n  function bind() {\n    $baseBlock = $(\'#bokomdomen\');\n  }\n\n  function ServiceApi(tmpl, url, callback) {\n    $curtmpl = tmpl;\n\n    _apiObj.GetjsonDetail(url, function (data) {\n      callback($curtmpl(data));\n    });\n  } ///////////Publika funktioner/////////////////////\n\n\n  function getBokOmdomen() {\n    let url = _appconfig.api.bokomdomen();\n\n    let templ = _appconfig.handlebartemplate.hb_bokOmdomen_tmp;\n    ServiceApi(templ, url, function (data) {\n      $baseBlock.html(data);\n    });\n  }\n\n  function init() {\n    bind();\n    getBokOmdomen();\n  }\n\n  return {\n    init: init,\n    alfvalue: \'This is an simple value from hello test!\'\n  };\n};\n\n/* harmony default export */ __webpack_exports__["a"] = (BokomdommeObj);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))\n\n//# sourceURL=webpack:///./assets/js/components/BokomdommeObj.js?');
    },
    "./assets/js/main.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _components_BokomdommeObj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/BokomdommeObj */ "./assets/js/components/BokomdommeObj.js");\n\nlet omdObj = Object(_components_BokomdommeObj__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])();\n$(function () {\n  omdObj.init();\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))\n\n//# sourceURL=webpack:///./assets/js/main.js?');
    },
    "./assets/js/service/apiServiceHandler.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("const apiServiceHandler = () => {\n  function GetJsonData(url, callback) {\n    if (!url) {\n      return false;\n    } else {\n      fetch(url).then(resp => resp.json()) // Transform the data into json\n      .then(function (data) {\n        //storeObj.addDataToStorage(data);\n        callback(data);\n      }).catch(function () {\n        console.log('error i Fetch: ' + url);\n      });\n    }\n  }\n\n  return {\n    GetjsonDetail: GetJsonData\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (apiServiceHandler);\n\n//# sourceURL=webpack:///./assets/js/service/apiServiceHandler.js?");
    },
    "./htmlTemplate/tpl_senasteBokomdomen.hbs": function(module, exports, __webpack_require__) {
        eval('var Handlebars = __webpack_require__(/*! ../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");\nfunction __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }\nmodule.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {\n    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;\n\n  return "       <li>\\r\\n            <a id=\\"\\" class=\\"image\\" href=\\"/tabid/1469/Default.aspx?bookid="\n    + alias5(((helper = (helper = helpers.bookid || (depth0 != null ? depth0.bookid : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"bookid","hash":{},"data":data}) : helper)))\n    + "\\">\\r\\n                <img id=\\"\\" title=\\""\n    + alias5(((helper = (helper = helpers.Booktitle || (depth0 != null ? depth0.Booktitle : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"Booktitle","hash":{},"data":data}) : helper)))\n    + "\\" class=\\"OmslagItm\\" src=\\""\n    + alias5(((helper = (helper = helpers.BookImg || (depth0 != null ? depth0.BookImg : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"BookImg","hash":{},"data":data}) : helper)))\n    + "\\">\\r\\n            </a>\\r\\n        </li>\\r\\n";\n},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {\n    var stack1, alias1=container.propertyIsEnumerable;\n\n  return "<div class=\\"col-12 align-items-end\\">\\r\\n    <h2>Bokomd&ouml;men</h2>\\r\\n    <ul id=\\"gallery\\">    \\r\\n"\n    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.CommentList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")\n    + "  </ul>\\r\\n</div>          ";\n},"useData":true});\n\n//# sourceURL=webpack:///./htmlTemplate/tpl_senasteBokomdomen.hbs?');
    }
});