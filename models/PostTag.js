var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostTag Model
 * ==================
 */
var PostTag = new keystone.List('PostTag', {
	autokey: { from: 'name', path: 'key', unique: true }
});
PostTag.add({
	name: { type: String, required: true, initial: true },
	language: { type: Types.Relationship, ref: 'Language', many: false }
});
PostTag.defaultColumns = 'name, language';
PostTag.relationship({ ref: 'Post', path: 'tags' });
PostTag.register();
