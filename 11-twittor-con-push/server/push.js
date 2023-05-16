const fs = require('fs');
const urlSafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid');
const webPush = require('web-push');
const subscriptions = require('./subs-db.json');

webPush.setVapidDetails('mailto:alejoboga19@gmail.com', vapid.publicKey, vapid.privateKey);

module.exports.getKey = () => {
	return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (subscription) => {
	subscriptions.push(subscription);

	fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscriptions));
};

module.exports.sendPush = (post) => {
	subscriptions.forEach((subscription, index) => {
		webPush.sendNotification(subscription, post.title);
	});
};
