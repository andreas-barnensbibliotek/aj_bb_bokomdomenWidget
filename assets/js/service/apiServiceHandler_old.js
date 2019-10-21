var $ = require("jquery");

module.exports = {   
    getjsondata: function (url, callback) {
        if (!url) {
            return false;
        } else{
            //console.log("Searchservicen hämtar Arrangemangdata");
            $.ajax({
                async: true,
                type: "get",
                dataType: 'jsonp',
                url: url,
                success: function (data) {
                    console.log("Search Detalj arrangemang hämtat: ");
                    callback(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("Nått blev fel vid hämtning av arrangemang!");
                }
            })
        };
    },
    postjsondata: function (url, postdata, callback) {
        if (!url) {
            return false;
        } else {
            //console.log("Searchservicen hämtar Arrangemangdata");
            $.ajax({
                async: true,
                
                type: "post",
                url: url,
                data: postdata,
                success: function (data) {
                    console.log("Hämtar Data: ");
                    callback(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("Nått blev fel vid hämtning av POST json!");
                }
            })
        };
    }
}