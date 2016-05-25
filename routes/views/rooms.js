var keystone = require('keystone');
var Room = keystone.list('Room');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.sections = 'rooms'
	locals.data = {}

	// Load page content
	view.on('init', function(next) {
		keystone.list('SpecialPage').model.findOne()
			.where('page', 'Rooms')
			.where('active', true)
			.exec(function(err, page) {
				if (err) {
					console.log(err);
					return next(err);
				} else {
					locals.data.page = page;
					next(err);
				}
			});
	});

	// Load page content
	view.on('init', function(next) {
		keystone.list('SpecialPage').model.findOne()
			.where('page', 'SocialAndFooter')
			.where('active', true)
			.exec(function(err, page) {
				if (err) {
					console.log(err);
					return next(err);
				} else {
					locals.data.socialAndFooter = page;
					next(err);
				}
			});
	});

	view.on('init', function(next) {
		Room.model.find().populate('roomOptions').sort('order').exec(function(err, rooms) {
			locals.rooms = rooms;
			return next();
		})
	})
	view.render('rooms');
}
