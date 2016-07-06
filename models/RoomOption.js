var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
RoomOption model
*/
var RoomOption = new keystone.List('RoomOption');

RoomOption.add({
	name: {type: Types.Text,required: true,index: true, note: 'This field is used as Tooltip'},
	icon: {type: Types.Text},
	language: { type: Types.Relationship, ref: 'Language', many: false }
});

RoomOption.defaultColumns = 'name, icon, language';

RoomOption.register();
