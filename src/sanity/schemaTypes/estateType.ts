export default {
    name: 'estateType',
    title: 'Art der Immobilie',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: { required: () => any; }) => Rule.required() // Pflichtfeld
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 200,
          slugify: (input: string) => input
            .toLowerCase()
            .replace(/\s+/g, '-') // Leerzeichen in Bindestriche umwandeln
            .replace(/ä/g, 'ae')  // Umlaute ersetzen
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9-]/g, '') // Entfernt alle ungültigen Zeichen
            .slice(0, 200)
        },
        validation: (Rule: { required: () => any; }) => Rule.required() // Pflichtfeld
      },
    ]
  }
  