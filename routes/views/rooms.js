var keystone = require('keystone');
var _ = require('underscore');
var i18n = require('i18n');

var Room = keystone.list('Room');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.sections = 'rooms'
	locals.data = {
		languages: []
	}

	// Load page content
	view.on('init', function(next) {
		keystone.list('Language').model.find().sort('Ordine').exec(function(err, results) {
			_.each(results, function(item) {
				locals.data.languages.push(item.CodiceLingua);
			});
			var currentLanguage = _.find(results, function(o) {
				return o.CodiceLingua === i18n.getLocale(req);
			})
			keystone.list('SpecialPage').model.findOne()
				.where('page', 'Rooms')
				.where('active', true)
				.where('language', currentLanguage._id)
				.exec(function(err, page) {
					if (err) {
						console.log(err);
						return next(err);
					} else {
						locals.data.page = page.rooms;
						locals.data.meta = page.meta;
					}
				});
			Room.model.find()
				.where('language', currentLanguage._id)
				.populate('roomOptions')
				.sort('order').exec(function(err, rooms) {
					locals.rooms = rooms;
				})
			next(err);
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
					locals.data.socialAndFooter = page.socialAndFooter;
					next(err);
				}
			});
	});

	view.render('rooms');
}
