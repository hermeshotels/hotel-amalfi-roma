var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Rooms model
*/
var Room = new keystone.List('Room');

Room.add({
	name: {
		type: Types.Text,
		required: true,
		index: true
	},
	description: {
		type: Types.Textarea,
		required: false
	},
	order: {
		type: Types.Number,
		format: 0
	},
	heroPhoto: {
		type: Types.CloudinaryImage
	},
	otherPhotos: {
		type: Types.CloudinaryImages
	},
	roomOptions: {
		type: Types.Relationship,
		ref: 'RoomOption',
		many: true
	}
});

Room.defaultColumns = 'name, order|20%';

Room.register();
