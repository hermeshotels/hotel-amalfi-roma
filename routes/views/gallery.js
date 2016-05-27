var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'gallery';
	locals.data = {}

	// Load page content
	view.on('init', function(next) {
		keystone.list('SpecialPage').model.findOne()
			.where('page', 'Gallery')
			.where('active', true)
			.exec(function(err, page) {
				if (err) {
					console.log(err);
					return next(err);
				} else {
					locals.data.page = page.gallery;
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


	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));

	// Render the view
	view.render('gallery');

};
