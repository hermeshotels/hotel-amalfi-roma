var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Rooms model
*/
var Room = new keystone.List('Room');

Room.add({
	name: {type: Types.Text,required: true,index: true, note: 'This field is not shown'},
	order: {type: Types.Number,format: 0},
	heroPhoto: {type: Types.CloudinaryImage},
	otherPhotos: {type: Types.CloudinaryImages},
	roomOptions: {type: Types.Relationship,ref: 'RoomOption',many: true},
	roomTitle:{
		it: { type: String, note: 'Room title IT' },
		en: { type: String, note: 'Room title EN' }
	},
	roomDescription:{
		it: {type: Types.Textarea,required: false, note: 'Room description IT'},
		en: {type: Types.Textarea,required: false, note: 'Room description EN'}
	}
});

Room.defaultColumns = 'name, order|20%';

Room.register();
