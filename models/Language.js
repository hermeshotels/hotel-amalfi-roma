var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * Language Model
 * ==================
 */
var Language = new keystone.List('Language', {
	autokey: {
		from: 'NomeLingua',
		path: 'slug',
		unique: true
	},
	map: {
		name: 'NomeLingua'
	},
    defaultSort: 'Ordine'
});
Language.add({
	NomeLingua: {
		type: String,
		required: true,
		note: 'Esempio: "Italiano", "Tedesco", "Inglese"'
	},
	CodiceLingua: {
		type: String,
		note: 'Esempio: "it" per italiano oppure "en" per inglese o "de" per tedesco'
	},
	Ordine: {
		type: Types.Number,
		format: 0,
		note: 'Verranno mostrate in ordine crescente'
	}
});
Language.defaultColumns = 'NomeLingua, CodiceLingua|20%, Ordine|20%'
Language.register();
