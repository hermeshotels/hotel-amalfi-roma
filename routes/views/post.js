var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};


	// Load page content
	view.on('init', function(next) {
		keystone.list('SpecialPage').model.findOne()
			.where('page', 'Blog')
			.where('active', true)
			.exec(function(err, page) {
				if (err) {
					console.log(err);
					return next(err);
				} else {
					locals.data.page = page.blog;
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


	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');

		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function(next) {

		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Load previous post
	view.on('init', function(next) {
		var q = keystone.list('Post').model.find().where('state', 'published').where('publishedDate', { $lt: locals.data.post.publishedDate } ).sort('-publishedDate').limit(1);
		q.exec(function(err, results) {
			locals.data.previous = results;
			next(err);
		});
	});

	// Load next post
	view.on('init', function(next) {
		var q = keystone.list('Post').model.find().where('state', 'published').where('publishedDate', { $gt: locals.data.post.publishedDate } ).sort('publishedDate').limit(1);
		q.exec(function(err, results) {
			locals.data.next = results;
			next(err);
		});
	});


	// Render the view
	view.render('post');

};
