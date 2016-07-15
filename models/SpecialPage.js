var keystone=require("keystone");
var Types=keystone.Field.Types;
var Pages=["SocialAndFooter","Home","Rooms","Services","Blog","Gallery","#HotelAmalfiRome","Contact","Privacy"];
var SpecialPage=new keystone.List("SpecialPage",{map:{name:"specialPageTitle"},plural:"SpecialPages"});
SpecialPage.add({
	active:{type:Types.Boolean},
	specialPageTitle:{type:String,required:true,intial:true,note:"This title is not shown"},
	page:{type:Types.Select,options:Pages,note:"Choose which page this custom data is for.  Make sure there is only one SpecialPage per SpecialPage type Active."},
	language: { type: Types.Relationship, ref: 'Language', many: false },
	meta:{
		title:{
			type:String
		},
		description:{
			type:String
		}
	},


	socialAndFooter:{
		contentBelowLogo:{type:Types.Html,wysiwyg:true,dependsOn:{page:"SocialAndFooter"}},
		facebook:{type:String,dependsOn:{page:"SocialAndFooter"}},
		pinterest:{type:String,dependsOn:{page:"SocialAndFooter"}},
		instagram:{type:String,dependsOn:{page:"SocialAndFooter"}},
		twitter:{type:String,dependsOn:{page:"SocialAndFooter"}},
		googlePlus:{type:String,dependsOn:{page:"SocialAndFooter"}}
	},

	home:{
		title: {
			type:String,dependsOn:{page:"Home"}
		},
		subTitle: {
			type:String,dependsOn:{page:"Home"}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		textBlockTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		textBlockSubTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		textBlockContent:{
			type:Types.Html,wysiwyg:true,dependsOn:{page:"Home"}
		},
		linkBlock1Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		linkBlock1Text:{
			type:String,dependsOn:{page:"Home"}
		},
		linkBlock1Url:{
			type:String,dependsOn:{page:"Home"}
		},
		linkBlock2Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		linkBlock2Text:{
			type:String,dependsOn:{page:"Home"}
		},
		linkBlock2Url:{type:String,dependsOn:{page:"Home"}},
		linkBlock3Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		linkBlock3Text:{
			type:String,dependsOn:{page:"Home"}
		},
		linkBlock3Url:{type:String,dependsOn:{page:"Home"}},
		eventsBlockTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		eventsBlockSubTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		newsletterBlockTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		newsletterBlockSubTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		testimonialsBlockTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		testimonialsBlockSubTitle:{
			type:String,dependsOn:{page:"Home"}
		},
		promoColumn1Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		promoColumn1Title:{
			type:String,dependsOn:{page:"Home"}
		},
		promoColumn1Text:{
			type:Types.Text,dependsOn:{page:"Home"}
		},
		promoColumn2Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		promoColumn2Title:{
			type:String,dependsOn:{page:"Home"}
		},
		promoColumn2Text:{
			type:Types.Text,dependsOn:{page:"Home"}
		},
		promoColumn3Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		promoColumn3Title:{
			type:String,dependsOn:{page:"Home"}
		},
		promoColumn3Text:{
			type:String,dependsOn:{page:"Home"}
		}
	},

	rooms:{
		title: {
			type:String,dependsOn:{page:"Rooms"}
		},
		subTitle: {
			type:String,dependsOn:{page:"Rooms"}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Rooms"}},
		roomBlock1Title: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock1SubTitle: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock2Title: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock2SubTitle: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock3Title: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock3SubTitle: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock4Title: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock4SubTitle: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock5Title: {
			type:String,dependsOn:{page:"Rooms"}
		},
		roomBlock5SubTitle: {
			type:String,dependsOn:{page:"Rooms"}
		}
	},

	services:{
		title: {
			type:String,dependsOn:{page:"Services"}
		},
		subTitle: {
			type:String,dependsOn:{page:"Services"}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Services"}},
	},

	blog:{
		title: {
			type:String,dependsOn:{page:"Blog"}
		},
		subTitle: {
			type:String,dependsOn:{page:"Blog"}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Blog"}},
	},

	gallery:{
		title: {
			type:String,dependsOn:{page:"Gallery"}
		},
		subTitle: {
			type:String,dependsOn:{page:"Gallery"}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Gallery"}},
	},

	contact:{
		introduction:{
			type:Types.Html,wysiwyg:true,dependsOn:{page:"Contact"}
		},
		mapLat:{type:String,dependsOn:{page:"Contact"}},
		mapLng:{type:String,dependsOn:{page:"Contact"}},
		mapZoom:{type:String,dependsOn:{page:"Contact"}},
		markerLat:{type:String,dependsOn:{page:"Contact"}},
		markerLng:{type:String,dependsOn:{page:"Contact"}},
		contactAddress:{type:String,dependsOn:{page:"Contact"}},
		contactPhone:{type:String,dependsOn:{page:"Contact"}},
		contactFax:{type:String,dependsOn:{page:"Contact"}},
		contactEmail:{type:String,dependsOn:{page:"Contact"}}
	},

	privacy:{
		title: {type:String,dependsOn:{page:"Privacy"}},
		testo:{type:Types.Html,wysiwyg:true,dependsOn:{page:"Privacy"}}
	}
});

SpecialPage.defaultColumns="specialPageTitle, page, language, active";
SpecialPage.register();
