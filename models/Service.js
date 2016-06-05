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
	name: {type: Types.Text,required: true,index: true, note: 'This field is not shown'},
	slug: {type: Types.Text,readonly: true},
	sub: {type: Types.Text,required: false},
	order: {type: Types.Number,format: 0},
	serviceTitle:{
		it: { type: String, note: 'Service title IT' },
		en: { type: String, note: 'Service title EN' }
	},
	serviceDescription:{
		it: {type: Types.Textarea,required: false, note: 'Service description IT'},
		en: {type: Types.Textarea,required: false, note: 'Service description EN'}
	},
	photos: {type: Types.CloudinaryImages}
});

Service.register();
