export default {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200, // will be ignored if slugify is set
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
            name: 'titleImage',
            title: 'Title Image',
            type: 'image',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ 
                type: 'block',
                styles: [],
                lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }] 
              }]
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'blogTags' }] }], // Reference to `blogTags`
        },
        {
            name: 'author',
            title: 'Autor',
            type: 'reference',
            to: [{type: 'agent'}]
        },
    ],
}