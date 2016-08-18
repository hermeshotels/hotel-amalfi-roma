var keystone = require('keystone');
var _ = require('underscore');
var i18n = require('i18n');
var async = require('async');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
		tag: req.params.tag
	};
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.data = {
		posts: [],
		categories: [],
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
				.where('page', 'Blog')
				.where('active', true)
				.where('language', currentLanguage._id)
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


	// Load all categories
	view.on('init', function(next) {

		keystone.list('PostCategory').model.find()
			.where('language', currentLanguage._id)
			.sort('name').exec(function(err, results) {

				if (err || !results.length) {
					return next(err);
				}

				locals.data.categories = results;

				// Load the counts for each category
				async.each(locals.data.categories, function(category, next) {

					Post.model.count().where('categories').in([category.id]).exec(function(err, count) {
						category.postCount = count;
						next(err);
					});

				}, function(err) {
					next(err);
				});

			});

	});

	// Load the current category filter
	view.on('init', function(next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({
				key: locals.filters.category
			}).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}

	});

	// Load all tags
	view.on('init', function(next) {
		keystone.list('PostTag').model.find()
			.where('language', currentLanguage._id)
			.sort('name').exec(function(err, results) {
				if (err || !results.length) {
					return next(err);
				}
				locals.data.tags = results;
				// Load the counts for each category
				async.each(locals.data.tags, function(tag, next) {
					keystone.list('Post').model.count().where('tags').in([tag.id]).exec(function(err, count) {
						tag.postCount = count;
						next(err);
					});
				}, function(err) {
					next(err);
				});
			});
	});

	// Load the current tag filter
	view.on('init', function(next) {
		if (req.params.tag) {
			console.log(locals.filters.tag);
			keystone.list('PostTag').model.findOne({
				key: locals.filters.tag
			}).exec(function(err, result) {
				locals.data.tag = result;
				next(err);
			});
		} else {
			next();
		}

	});



	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10,
				filters: {
					'state': 'published'
				}
			})
			.sort('-publishedDate')
			.populate('author categories');

		q.where('language', currentLanguage._id);

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		if (locals.data.tag) {
			q.where('tags').in([locals.data.tag]);
		}

		q.exec(function(err, results) {
			locals.data.posts = results;
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


	// Render the view
	view.render('blog');

};
