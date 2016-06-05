var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
RoomOption model
*/
var RoomOption = new keystone.List('RoomOption');

RoomOption.add({
	name: {type: Types.Text,required: true,index: true, note: 'This field is not shown'},
	icon: {type: Types.Text},
	optionTooltip:{
		it: { type: String, note: 'Option tooltip IT' },
		en: { type: String, note: 'Option tooltip EN' }
	}
});

RoomOption.defaultColumns = 'name, optionTooltip.it, optionTooltip.en';

RoomOption.register();
