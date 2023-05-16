const urlSafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid');

module.exports.getKey = () => {
	return urlSafeBase64.decode(vapid.publicKey);
};
