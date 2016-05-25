/*
var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
Rooms model
* /
var Place = new keystone.List('Place');

Place.add({
  name: {type: Types.Text, required: true, index: true},
  description: {type: Types.Textarea, required: false},
  location: {type: Types.Location, defaults: { country: 'Italia' }},
  photo: {type: Types.CloudinaryImage}
});

Place.register();
*/
