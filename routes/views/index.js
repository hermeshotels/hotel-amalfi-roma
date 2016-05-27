var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		tours: [],
		events: [],
		testimonials: []
	};

	// Load page content
	view.on('init', function(next) {
		keystone.list('SpecialPage').model.findOne()
			.where('page', 'Home')
			.where('active', true)
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


	var Post = keystone.list('Post');
	var PostCategory = keystone.list('PostCategory');
	var Testimonial = keystone.list('Testimonial');

	view.on('init', function(next) {
		// load tours
		PostCategory.model.findOne({
			name: 'Tour'
		}).exec(function(err, postCategory) {
			if (postCategory !== null) {
				Post.model.find().where('categories').in([postCategory.id]).where('showInHome', true).populate('categories').sort('-publishedAt').limit(3).exec(function(err, results) {
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
			name: 'Evento'
		}).exec(function(err, postCategory) {
			if (postCategory !== null) {
				Post.model.find().where('categories').in([postCategory.id]).where('showInHome', true).populate('categories').sort('-publishedAt').limit(3).exec(function(err, results) {
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
		Testimonial.model.find().sort('-publishedAt').limit(1).exec(function(err, results) {
			locals.data.testimonials = results;
			next(err);
		});
	});


	// Render the view
	view.render('index');
};
