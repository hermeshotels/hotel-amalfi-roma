var keystone = require('keystone');
var _ = require('underscore');
var i18n = require('i18n');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: [],
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
			});
			next(err);
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
			.where('page', 'Blog')
			.where('language', currentLanguage._id)
			.where('active', true)
			.exec(function(err, page) {
				if (err) {
					console.log(err);
					return next(err);
				} else {
					locals.data.page = page.blog;
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


	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories tags');

		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function(next) {

		var q = keystone.list('Post').model.find()
			.where('language', currentLanguage._id)
			.where('state', 'published')
			.sort('-publishedDate').populate('author').limit('4');

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Load previous post
	view.on('init', function(next) {
		var q = keystone.list('Post').model.find()
			.where('language', currentLanguage._id)
			.where('state', 'published')
			.where('publishedDate', { $lt: locals.data.post.publishedDate } ).sort('-publishedDate').limit(1);
		q.exec(function(err, results) {
			locals.data.previous = results;
			next(err);
		});
	});

	// Load next post
	view.on('init', function(next) {
		var q = keystone.list('Post').model.find()
			.where('language', currentLanguage._id)
			.where('state', 'published')
			.where('publishedDate', { $gt: locals.data.post.publishedDate } ).sort('publishedDate').limit(1);
		q.exec(function(err, results) {
			locals.data.next = results;
			next(err);
		});
	});


	// Render the view
	view.render('post');

};
