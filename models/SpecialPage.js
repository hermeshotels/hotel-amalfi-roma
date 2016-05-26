var keystone=require("keystone");
var Types=keystone.Field.Types;
var Pages=["SocialAndFooter","Home","Rooms","Services","Blog","Gallery","#HotelAmalfiRome","Contact"];
var SpecialPage=new keystone.List("SpecialPage",{map:{name:"specialPageTitle"},plural:"SpecialPages"});
SpecialPage.add({
	active:{type:Types.Boolean},
	specialPageTitle:{type:String,required:true,intial:true,note:"This title is not shown"},
	page:{type:Types.Select,options:Pages,note:"Choose which page this custom data is for.  Make sure there is only one SpecialPage per SpecialPage type Active."},
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
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		subTitle: {
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		textBlockTitle:{
			it: {type:String,dependsOn:{page:"Home"}},
			en: {type:String,dependsOn:{page:"Home"}}
		},
		textBlockSubTitle:{
			it: {type:String,dependsOn:{page:"Home"}},
			en: {type:String,dependsOn:{page:"Home"}}
		},
		textBlockContent:{
			it:{type:Types.Html,wysiwyg:true,dependsOn:{page:"Home"}},
			en:{type:Types.Html,wysiwyg:true,dependsOn:{page:"Home"}}
		},
		linkBlock1Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		linkBlock1Text:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		linkBlock1Url:{type:String,dependsOn:{page:"Home"}},
		linkBlock2Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		linkBlock2Text:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		linkBlock2Url:{type:String,dependsOn:{page:"Home"}},
		linkBlock3Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		linkBlock3Text:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		linkBlock3Url:{type:String,dependsOn:{page:"Home"}},
		eventsBlockTitle:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		eventsBlockSubTitle:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		newsletterBlockTitle:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		newsletterBlockSubTitle:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		testimonialsBlockTitle:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		testimonialsBlockSubTitle:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		promoColumn1Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		promoColumn1Title:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		promoColumn1Text:{
			it:{type:Types.Text,dependsOn:{page:"Home"}},
			en:{type:Types.Text,dependsOn:{page:"Home"}}
		},
		promoColumn2Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		promoColumn2Title:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		promoColumn2Text:{
			it:{type:Types.Text,dependsOn:{page:"Home"}},
			en:{type:Types.Text,dependsOn:{page:"Home"}}
		},
		promoColumn3Image:{type:Types.CloudinaryImage,dependsOn:{page:"Home"}},
		promoColumn3Title:{
			it:{type:String,dependsOn:{page:"Home"}},
			en:{type:String,dependsOn:{page:"Home"}}
		},
		promoColumn3Text:{
			it:{type:Types.Text,dependsOn:{page:"Home"}},
			en:{type:Types.Text,dependsOn:{page:"Home"}}
		}
	},

	rooms:{
		title: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		subTitle: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Rooms"}},
		roomBlock1Title: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock1SubTitle: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock2Title: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock2SubTitle: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock3Title: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock3SubTitle: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock4Title: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock4SubTitle: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock5Title: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		},
		roomBlock5SubTitle: {
			it:{type:String,dependsOn:{page:"Rooms"}},
			en:{type:String,dependsOn:{page:"Rooms"}}
		}
	},

	services:{
		title: {
			it:{type:String,dependsOn:{page:"Services"}},
			en:{type:String,dependsOn:{page:"Services"}}
		},
		subTitle: {
			it:{type:String,dependsOn:{page:"Services"}},
			en:{type:String,dependsOn:{page:"Services"}}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Services"}},
	},

	blog:{
		title: {
			it:{type:String,dependsOn:{page:"Blog"}},
			en:{type:String,dependsOn:{page:"Blog"}}
		},
		subTitle: {
			it:{type:String,dependsOn:{page:"Blog"}},
			en:{type:String,dependsOn:{page:"Blog"}}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Blog"}},
	},

	gallery:{
		title: {
			it:{type:String,dependsOn:{page:"Gallery"}},
			en:{type:String,dependsOn:{page:"Gallery"}}
		},
		subTitle: {
			it:{type:String,dependsOn:{page:"Gallery"}},
			en:{type:String,dependsOn:{page:"Gallery"}}
		},
		headerImage:{type:Types.CloudinaryImage,dependsOn:{page:"Gallery"}},
	},

	contact:{
		introduction:{
			it:{type:Types.Html,wysiwyg:true,dependsOn:{page:"Contact"}},
			en:{type:Types.Html,wysiwyg:true,dependsOn:{page:"Contact"}}
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
	}
});

SpecialPage.defaultColumns="specialPageTitle, page, active";
SpecialPage.register();
