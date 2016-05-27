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
	title: { type: String, required: true, note: 'This field is not shown' },
	postTitle:{
		it: { type: String, note: 'Post title' },
		en: { type: String, note: 'Post title' }
	},
	meta:{
		title:{
			it:{type:String},
			en:{type:String}
		},
		description:{
			it:{type:String},
			en:{type:String}
		}
	},

	showInHome: { type: Types.Boolean, default: false, note: 'This field is used only from Tours and Events'},
	author: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: false },
	tags: { type: Types.Relationship, ref: 'PostTag', many: true },
	heroImage: { type: Types.CloudinaryImage },
	image: { type: Types.CloudinaryImages },
	content: {
		brief: {
			it: { type: Types.Html, wysiwyg: true, height: 150 },
			en: { type: Types.Html, wysiwyg: true, height: 150 }
		},
		extended: {
			it: { type: Types.Html, wysiwyg: true, height: 400 },
			en: { type: Types.Html, wysiwyg: true, height: 400 }
		}
	},
	eventLocation: {
		it: { type: String, note: 'This field is used only from Events' },
		en: { type: String, note: 'This field is used only from Events' }
	},
	eventIcon: { type: Types.Select, options: 'music, museum', default: 'music', note: 'This field is used only from Events' },
	eventDate: { type: Types.Date, note: 'This field is used only from Events' },
	offerStartDate: { type: Types.Date, note: 'This field is used only from Offers' },
	offerEndDate: { type: Types.Date, note: 'This field is used only from Offers' }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});
Post.schema.virtual('fullPostUrl').get(function() {
	return keystone.get('baseUrl') + 'blog/post/' + this.slug;
});
Post.schema.virtual('shareUrl').get(function() {
	return encodeURIComponent(keystone.get('baseUrl') + 'blog/post/' + this.slug);
});


Post.defaultColumns = 'title, state|20%, categories|10%, publishedDate|20%, showInHome|10%';
Post.register();
