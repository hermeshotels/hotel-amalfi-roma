var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Service Model model
*/
var Service = new keystone.List('Service');

Service.add({
	name: {type: Types.Text,required: true,index: true},
	language: { type: Types.Relationship, ref: 'Language', many: false },
	order: {type: Types.Number,format: 0},
	serviceDescription:{type: Types.Textarea,required: false},
	heroPhoto: {type: Types.CloudinaryImage}
});

Service.defaultColumns = 'name, order|20%, language';

Service.register();
