/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');
var keystone = require('keystone');
var i18n = require('i18n');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [{
		label: 'Homepage',
		key: 'home',
		header: true,
		footer: false,
		href: '/'
	}, {
		label: 'Camere',
		key: 'rooms',
		header: true,
		footer: true,
		href: '/rooms',
		id: 'rooms-trigger'
	}, {
		label: 'Servizi',
		key: 'services',
		header: true,
		footer: true,
		href: '/services',
		id: 'services-trigger'
	}, {
		label: 'Scopri Roma',
		key: 'blog',
		header: true,
		footer: true,
		href: '/blog'
	}, {
		label: 'Offerte',
		key: 'blog/offerte',
		header: true,
		footer: false,
		href: '/blog/offerte'
	}, {
		label: 'Gallery',
		key: 'gallery',
		header: true,
		footer: true,
		href: '/gallery'
	}, {
		label: '#HOTELAMALFIROME',
		key: 'hotelamalfirome',
		header: true,
		footer: false,
		href: '/hotelamalfirome'
	}, {
		label: 'Location & Contatti',
		key: 'contact',
		header: true,
		footer: true,
		href: '/contact'
	}];

	locals.socialLinks = [{
		icon: 'facebook',
		href: 'https://www.facebook.com/Hotel-Amalfi-Rome-108818442484774/'
	}, {
		icon: 'instagram',
		href: 'https://www.instagram.com/amalfirome/'
	}, {
		icon: 'twitter',
		href: 'https://it.pinterest.com/hotelamalfi/'
	}, {
		icon: 'googleplus',
		href: 'https://plus.google.com/107196552070443185282'
	}];

	locals.user = req.user;

	locals.baseUrl = keystone.get('baseUrl');

	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) {
		return msgs.length;
	}) ? flashMessages : false;

	next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};

exports.langSelection = function(req, res, next){
	var match = req.url.match(/^\/([A-Z]{2})([\/\?].*)?$/i);
	if (match){
			i18n.setLocale(req, match[1]);
			req.url = match[2] || '/';
	}
	next();
}
