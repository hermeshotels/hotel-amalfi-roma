var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	location:  { type: String },
	showInHome: { type: Types.Boolean, default: false },
	event: {
		icon: { type: Types.Select, options: 'music, museum', default: 'music', index: true },
		date: { type: Types.Date, index: true }
	},
	author: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: false },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	heroImage: { type: Types.CloudinaryImage },
	image: { type: Types.CloudinaryImages },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, categories|10%, publishedDate|20%, showInHome|10%';
Post.register();
