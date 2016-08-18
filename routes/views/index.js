var keystone = require('keystone');
var _ = require('underscore');
var i18n = require('i18n');

var Post = keystone.list('Post');
var PostCategory = keystone.list('PostCategory');
var Testimonial = keystone.list('Testimonial');


exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		tours: [],
		events: [],
		testimonials: [],
		languages: []
	};

	var currentLanguage;

	// Load languages
	view.on('init', function(next) {
		keystone.list('Language').model.find().sort('Ordine').exec(function(err, results) {
			_.each(results, function(item) {
				locals.data.languages.push(item.CodiceLingua);
			});
			currentLanguage = _.find(results, function(o) {
				return o.CodiceLingua === i18n.getLocale(req);
			})
			keystone.list('SpecialPage').model.findOne()
				.where('page', 'Home')
				.where('active', true)
				.where('language', currentLanguage._id)
				.exec(function(err, page) {
					if (err) {
						console.log(err);
						return next(err);
					} else {
						locals.data.page = page.home;
						locals.data.meta = page.meta;
						next(err);
					}
				});
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

	view.on('init', function(next) {
		// load tours
		PostCategory.model.findOne({
			specialType: 'Tour',
			language: currentLanguage._id
		}).exec(function(err, postCategory) {
			if (postCategory !== null) {
				Post.model.find()
					.where('categories').in([postCategory.id])
					.where('showInHome', true)
					.where('language', currentLanguage._id)
					.populate('categories').sort('-publishedAt').limit(3).exec(function(err, results) {
					locals.data.tours = results;
					next(err);
				});
			} else {
				next(err);
			}
		});
	});

	view.on('init', function(next) {
		// load events
		PostCategory.model.findOne({
			specialType: 'Eventi',
			language: currentLanguage._id
		}).exec(function(err, postCategory) {
			if (postCategory !== null) {
				Post.model.find()
					.where('categories').in([postCategory.id])
					.where('showInHome', true)
					.where('language', currentLanguage._id)
					.populate('categories').sort('-publishedAt').limit(3).exec(function(err, results) {
						locals.data.events = results;
						next(err);
					});
			} else {
				next(err);
			}
		});
	});


	view.on('init', function(next) {
		// load testimonials
		Testimonial.model.find()
			.where('language', currentLanguage._id)
			.sort('-publishedAt').limit(1).exec(function(err, results) {
				locals.data.testimonials = results;
				next(err);
			});
	});


	// Render the view
	view.render('index');
};
