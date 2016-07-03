var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Rooms model
*/
var Room = new keystone.List('Room');

Room.add({
	name: {type: Types.Text,required: true,index: true},
	language: { type: Types.Relationship, ref: 'Language', many: false },
	order: {type: Types.Number,format: 0},
	heroPhoto: {type: Types.CloudinaryImage},
	otherPhotos: {type: Types.CloudinaryImages},
	Options: {type: Types.Relationship,ref: 'RoomOption',many: true},
	Description:{type: Types.Textarea,required: false}
});

Room.defaultColumns = 'name, order|20%, language';

Room.register();
