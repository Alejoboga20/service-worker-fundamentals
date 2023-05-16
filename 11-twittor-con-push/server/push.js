const urlSafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid');

const subscriptions = [];

module.exports.getKey = () => {
	return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (subscription) => {
	subscriptions.push(subscription);
	console.log({ subscriptions });
};
