import { type SchemaTypeDefinition } from 'sanity'
import realestate from './realestate'
import agent from './agent'
import location from './location'
import estateType from './estateType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [realestate,agent,location,estateType],
}
