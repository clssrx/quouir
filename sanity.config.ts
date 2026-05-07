'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
	name: 'default',
	title: "qu'ouïr",
	basePath: '/studio',
	projectId,
	dataset,
	schema: {
		...schema,
		templates: (templates) => [
			...templates,
			{
				id: 'post-by-category',
				title: 'Post',
				schemaType: 'post',
				parameters: [{ name: 'categoryId', type: 'string' }],
				value: (params: { categoryId: string }) => ({
					category: {
						_type: 'reference',
						_ref: params.categoryId,
					},
				}),
			},
		],
	},
	plugins: [
		structureTool({ structure }),
		...(!isProduction ? [visionTool({ defaultApiVersion: apiVersion })] : []),
	],
});
