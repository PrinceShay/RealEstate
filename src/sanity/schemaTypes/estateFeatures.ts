import { title } from "process";

export default {
    name: 'estateFeatures',
    title: 'Immobilien Features',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        // {
        //     title: 'Slug',
        //     name: 'slug',
        //     type: 'slug',
        //     options: {
        //       source: 'title',
        //       maxLength: 200,
        //       slugify: (input: string) =>
        //         input
        //           .toLowerCase()
        //           .replace(/\s+/g, '-') // Leerzeichen in Bindestriche umwandeln
        //           .replace(/ä/g, 'ae')  // Umlaute ersetzen
        //           .replace(/ö/g, 'oe')
        //           .replace(/ü/g, 'ue')
        //           .replace(/ß/g, 'ss')
        //           .replace(/[^a-z0-9-]/g, '') // Entfernt alle ungültigen Zeichen
        //           .slice(0, 200)
        //     }
        //   },
        {name: 'icon',
            title: 'Icon',
            type: 'image'
        }
    ],
}