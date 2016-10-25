var keystone = require('keystone');
var _ = require('underscore');
var i18n = require('i18n');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'tripAdvisor';

	locals.data = {
		languages: []
	};

	var currentLanguage;

	// Load languages
	view.on('init', function(next) {
		keystone.list('Language').model.find().sort('Ordine').exec(function(err, results) {
			console.log(results);
			_.each(results, function(item) {
				locals.data.languages.push(item.CodiceLingua);
			});
			currentLanguage = _.find(results, function(o) {
				return o.CodiceLingua === i18n.getLocale(req);
			})
			keystone.list('SpecialPage').model.findOne()
				.where('page', 'TripAdvisor')
				.where('active', true)
				.where('language', currentLanguage._id)
				.exec(function(err, page) {
					if (err) {
						console.log(err);
						return next(err);
					} else {
						console.log(page);
						locals.data.page = page.tripAdvisor;
						locals.data.meta = page.meta;
						next(err);
					}
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

	// Load Social and Footer content
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

	// Render the view
	view.render('tripadvisor');
};
