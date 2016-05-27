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
	title: {type: Types.Text,required: true,initial: true,index: true, note: 'This field is not shown'},
	name:{
		it: {type: Types.Text},
		en: {type: Types.Text}
	},
	description: {
		it: {type: Types.Html,wysiwyg: true,height: 200},
		en: {type: Types.Html,wysiwyg: true,height: 200}
	},
	author: {type: Types.Text},
	icon: {type: Types.Select,options: 'tripadvisor, booking',default: 'tripadvisor'}
});

Testimonial.register();
