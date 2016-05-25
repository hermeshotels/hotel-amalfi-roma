var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
RoomOption model
*/
var RoomOption = new keystone.List('RoomOption');

RoomOption.add({
	name: {
		type: Types.Text,
		required: true,
		index: true
	},
	icon: {
		type: Types.Text
	}
});

RoomOption.register();
