import {defineField, defineType, defineArrayMember} from 'sanity'
import {ImageIcon, DocumentTextIcon} from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'subtitle',
      type: 'string',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  }),
                ],
              },
              {
                name: 'footnote',
                title: 'Footnote',
                type: 'object',
                icon: DocumentTextIcon,
                fields: [
                  defineField({
                    name: 'text',
                    title: 'Footnote text',
                    type: 'text',
                    rows: 3,
                  }),
                  defineField({
                    name: 'id',
                    title: 'id',
                    type: 'string',
                    description: 'Unique identifier for this footnote (e.g. "footnote-1")',
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          icon: ImageIcon,
          options: {hotspot: true},
        }),
      ],
    }),
  ],
})
