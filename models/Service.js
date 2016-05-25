var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Service Model model
*/
var Service = new keystone.List('Service', {
	autokey: {
		path: 'slug',
		from: 'name',
		unique: true
	},
});

Service.add({
	name: {
		type: Types.Text,
		required: true,
		index: true
	},
	slug: {
		type: Types.Text,
		readonly: true
	},
	sub: {
		type: Types.Text,
		required: false
	},
	order: {
		type: Types.Number,
		format: 0
	},
	description: {
		type: Types.Textarea,
		required: false
	},
	photos: {
		type: Types.CloudinaryImages
	}
});

Service.register();
