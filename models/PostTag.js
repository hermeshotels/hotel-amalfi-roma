var keystone = require('keystone');
/**
 * PostTag Model
 * ==================
 */
var PostTag = new keystone.List('PostTag', {
	autokey: { from: 'name', path: 'key', unique: true }
});
PostTag.add({
	name: { type: String, required: true, initial: true },
	tagName: {
		it: { type: String},
		en: { type: String}
	}
});
PostTag.relationship({ ref: 'Post', path: 'tags' });
PostTag.register();
