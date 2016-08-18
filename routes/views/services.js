var keystone = require('keystone');
var _ = require('underscore');
var i18n = require('i18n');

var Service = keystone.list('Service');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.sections = 'services'
	locals.data = {
		languages: []
	}

	var currentLanguage;

	// Load page content
	view.on('init', function(next) {
		keystone.list('Language').model.find().sort('Ordine').exec(function(err, results) {
			_.each(results, function(item) {
				locals.data.languages.push(item.CodiceLingua);
			});
			currentLanguage = _.find(results, function(o) {
				return o.CodiceLingua === i18n.getLocale(req);
			})
			keystone.list('SpecialPage').model.findOne()
				.where('page', 'Services')
				.where('active', true)
				.where('language', currentLanguage._id)
				.exec(function(err, page) {
					if (err) {
						console.log(err);
						return next(err);
					} else {
						locals.data.page = page.services;
						locals.data.meta = page.meta;
					}
					Service.model.find()
						.where('language', currentLanguage._id)
						.sort('order').exec(function(err, services) {
							locals.services = services;
							next(err);
						})
				});
		});
	});

	view.on('init', function(next) {
		// load last post
		Post.model.findOne()
			.where('language', currentLanguage._id)
			.sort('-publishedDate')
			.limit(1).exec(function(err, results) {
				locals.data.lastNews = results;
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
	view.render('services');
}
