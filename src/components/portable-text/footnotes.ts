import type { PortableTextBlock } from '@portabletext/react';

export type FootnoteMark = {
	_key: string;
	_type: 'footnote';
	text: string;
};

export type ExtractedFootnote = {
	number: number;
	markKey: string;
	text: string;
};

type MarkDef = {
	_key?: unknown;
	_type?: unknown;
	text?: unknown;
	[key: string]: unknown;
};

type PortableTextSpanWithMarks = {
	marks?: unknown;
};

type PortableTextBlockWithFootnotes = PortableTextBlock & {
	children?: PortableTextSpanWithMarks[];
	markDefs?: MarkDef[];
};

const isFootnoteMark = (mark: MarkDef): mark is FootnoteMark => {
	return (
		mark._type === 'footnote' &&
		typeof mark._key === 'string' &&
		typeof mark.text === 'string' &&
		mark.text.trim().length > 0
	);
};

const getStringMarks = (marks: unknown) => {
	if (!Array.isArray(marks)) return [];

	return marks.filter((mark): mark is string => typeof mark === 'string');
};

export const extractFootnotes = (
	blocks: PortableTextBlock[],
): ExtractedFootnote[] => {
	const footnotes: ExtractedFootnote[] = [];
	const seenKeys = new Set<string>();

	for (const block of blocks) {
		const typedBlock = block as PortableTextBlockWithFootnotes;

		if (typedBlock._type !== 'block') continue;

		const markDefs = typedBlock.markDefs ?? [];
		const children = typedBlock.children ?? [];

		for (const child of children) {
			for (const markKey of getStringMarks(child.marks)) {
				if (seenKeys.has(markKey)) continue;

				const footnote = markDefs.find(
					(mark): mark is FootnoteMark =>
						mark._key === markKey && isFootnoteMark(mark),
				);

				if (!footnote) continue;

				seenKeys.add(markKey);

				footnotes.push({
					number: footnotes.length + 1,
					markKey: footnote._key,
					text: footnote.text,
				});
			}
		}
	}

	return footnotes;
};
