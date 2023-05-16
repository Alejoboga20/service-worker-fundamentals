const fs = require('fs');
const urlSafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid');
const webPush = require('web-push');
let subscriptions = require('./subs-db.json');

webPush.setVapidDetails('mailto:alejoboga19@gmail.com', vapid.publicKey, vapid.privateKey);

module.exports.getKey = () => {
	return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (subscription) => {
	subscriptions.push(subscription);

	fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscriptions));
};

module.exports.sendPush = (post) => {
	const sentNotifications = [];

	subscriptions.forEach((subscription, index) => {
		const pushPromises = webPush
			.sendNotification(subscription, JSON.stringify(post))
			.then(() => console.log('push sent'))
			.catch((err) => {
				if (err.statusCode === 410) {
					subscriptions[index].delete = true;
				}
			});

		sentNotifications.push(pushPromises);
	});

	Promise.all(sentNotifications).then(() => {
		subscriptions = subscriptions.filter((subs) => !subs.delete);
		fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscriptions));
	});
};
