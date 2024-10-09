export default {
    name: 'realEstate',
    title: 'Immobilien',
  
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Titel',
        type: 'string',
        validation: (Rule: { required: () => any; }) => Rule.required()
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200,
          slugify: (input: string) =>
            input
              .toLowerCase()
              .replace(/\s+/g, '-') // Leerzeichen in Bindestriche umwandeln
              .replace(/ä/g, 'ae')  // Umlaute ersetzen
              .replace(/ö/g, 'oe')
              .replace(/ü/g, 'ue')
              .replace(/ß/g, 'ss')
              .replace(/[^a-z0-9-]/g, '') // Entfernt alle ungültigen Zeichen
              .slice(0, 200)
        }
      },
      {
        name: 'gallery',
        title: 'Bildergalerie',
        type: 'array',
        of: [
          {
            type: 'image',
            fields: [
              {
                name: 'caption',
                title: 'Bildunterschrift',
                type: 'string',
              }
            ],
            options: {
              hotspot: true // Ermöglicht das Setzen eines Bildschwerpunkts
            }
          }
        ],
        validation: (Rule: { required: () => any; }) => Rule.required() // Macht die Bildergalerie zum Pflichtfeld
      },
      {
        name: 'price',
        title: 'Preis',
        type: 'number',
        validation: (Rule: { min: (arg0: number) => any; }) => Rule.min(0)
      },
      {
        name: 'estateType',
        title: 'Art der Immobilie',
        type: 'reference',
        to: [{ type: 'estateType' }]
      },
      {
        name: 'features',
        title: 'Immobilien Features',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'estateFeatures' }],
          },
        ],
      },
      
      {
        name: 'area',
        title: 'Wohnfläche (m²)',
        type: 'number',
        validation: (Rule: { min: (arg0: number) => any; }) => Rule.min(0)
      },
      {
        name: 'rooms',
        title: 'Zimmer',
        type: 'number',
        validation: (Rule: { min: (arg0: number) => any; }) => Rule.min(0)
      },
      {
        name: 'plotSize',
        title: 'Grundstücksgröße (m²)',
        type: 'number',
        validation: (Rule: { min: (arg0: number) => any; }) => Rule.min(0)
      },
      {
        name: 'address',
        title: 'Adresse',
        type: 'string',
        validation: (Rule: { required: () => any; }) => Rule.required()
      },
      {
        name: 'place',
        title: 'Ort',
        type: 'reference',
        to: [{ type: 'location' }]
      },
      {
        name: 'description',
        title: 'Objektbeschreibung',
        type: 'array',
        of: [{ type: 'block' }]
      },
      {
        name: 'location',
        title: 'Lage',
        type: 'array',
        of: [{ type: 'block' }]
      },

      {
        name: 'floorPlan',
        title: 'Grundriss',
        type: 'array',
        of: [{ type: 'image' }]
      },
      {
        name: 'agent',
        title: 'Makler',
        type: 'reference',
        to: [{ type: 'agent' }]
      }
    ]
  }
  