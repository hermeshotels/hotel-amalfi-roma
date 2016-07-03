var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Testimonial model
*/
var Testimonial = new keystone.List('Testimonial', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Testimonial.add({
	title: {type: Types.Text,required: true,initial: true,index: true},
	language: { type: Types.Relationship, ref: 'Language', many: false },
	description: {type: Types.Html,wysiwyg: true,height: 200},
	author: {type: Types.Text},
	icon: {type: Types.Select,options: 'tripadvisor, booking',default: 'tripadvisor'}
});

Testimonial.defaultColumns = 'title, language';

Testimonial.register();
