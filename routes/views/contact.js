var keystone = require('keystone');
var _ = require('underscore');
var i18n = require('i18n');

var Enquiry = keystone.list('Enquiry');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.data = {
		languages: []
	};

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
				.where('page', 'Contact')
				.where('active', true)
				.where('language', currentLanguage._id)
				.exec(function(err, page) {
					if (err) {
						console.log(err);
						return next(err);
					} else {
						locals.data.page = page.contact;
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
			.sort('-publishedAt').limit(1).exec(function(err, results) {
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


	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function(next) {

		var newEnquiry = new Enquiry.model(),
			updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, message',
			errorMessage: 'There was a problem submitting your enquiry:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
