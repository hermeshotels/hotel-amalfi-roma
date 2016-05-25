var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Testimonial model
*/
var Testimonial = new keystone.List('Testimonial');

Testimonial.add({
	name: {
		type: Types.Text,
		required: true,
		index: true
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 200
	},
	author: {
		type: Types.Text
	},
	icon: {
		type: Types.Select,
		options: 'tripadvisor, booking',
		default: 'tripadvisor'
	}
});

Testimonial.register();
