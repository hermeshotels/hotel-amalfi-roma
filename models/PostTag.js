var keystone = require('keystone');
/**
 * PostTag Model
 * ==================
 */
var PostTag = new keystone.List('PostTag', {
	autokey: { from: 'name', path: 'key', unique: true }
});
PostTag.add({
	name: { type: String, required: true, initial: true, note: 'This field is never shown' },
	tagName: {
		it: { type: String, note: 'This field is the TAG display name for IT'},
		en: { type: String, note: 'This field is the TAG display name for EN'}
	}
});
PostTag.relationship({ ref: 'Post', path: 'tags' });
PostTag.register();
