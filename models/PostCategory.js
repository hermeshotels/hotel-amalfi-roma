var keystone = require('keystone');
var Types = keystone.Field.Types;
var specialTypes=["Eventi","Offerte","Tour"];

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PostCategory.add({
	name: { type: String, required: true, initial: true },
	specialType:{type:Types.Select,options:specialTypes},
	language: { type: Types.Relationship, ref: 'Language', many: false }
});
PostCategory.defaultColumns = 'name, language';
PostCategory.relationship({ ref: 'Post', path: 'tags' });
PostCategory.register();
