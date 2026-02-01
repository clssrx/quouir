import {defineType, defineField} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      type: 'image',
    }),
  ],
})
