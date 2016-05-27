var keystone = require('keystone');
var Services = keystone.list('Service');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.sections = 'services'
	locals.data = {}

	// Load page content
	view.on('init', function(next) {
		keystone.list('SpecialPage').model.findOne()
			.where('page', 'Services')
			.where('active', true)
			.exec(function(err, page) {
				if (err) {
					console.log(err);
					return next(err);
				} else {
					locals.data.page = page.services;
					locals.data.meta = page.meta;
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
					locals.data.socialAndFooter = page.socialAndFooter;
					next(err);
				}
			});
	});

	view.on('init', function(next) {
		Services.model.find().exec(function(err, services) {
			locals.services = services;
			return next();
		})
	})
	view.render('services');
}
