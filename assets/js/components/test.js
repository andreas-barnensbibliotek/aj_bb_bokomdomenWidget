let _ = require('lodash');
const hello = () => {
	return {
		skrik: msg => {
			//alert('Hello2! ');
			return 'Lodash TEST addition:(6+4=) ' + _.add(6, 4) + ' --- ' + msg;
		},
		alfvalue: 'This is an simple value from hello test!'
	};
};
export default hello;
