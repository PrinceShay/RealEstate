export default {
    name: 'agent',
    title: 'Makler',
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
      {
        name: 'email',
        title: 'E-Mail',
        type: 'string',
        validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email() // Pflichtfeld und validiert als E-Mail
      },
      {
        name: 'phone',
        title: 'Telefonnummer',
        type: 'string',
        validation: (Rule: { required: () => any; }) => Rule.required() // Pflichtfeld
      },
      {
        name: 'profileImage',
        title: 'Profilbild',
        type: 'image',
      },
      {
        name: 'description',
        title: 'Beschreibung',
        type: 'array',
        of: [{ type: 'block' }]
      }
    ]
  }
  