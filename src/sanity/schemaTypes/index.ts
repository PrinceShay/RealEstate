import { type SchemaTypeDefinition } from 'sanity'
import realestate from './realestate'
import agent from './agent'
import location from './location'
import estateType from './estateType'
import estateFeatures from './estateFeatures'
import blog from './blog'
import blogTags from './blogTags'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [realestate,agent,location,estateType,estateFeatures,blog,blogTags],
}
