import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

const styling: Record<string, string> = {
	bold: '**',
	italic: '_',
	strike: '~~',
	code: '`'
};

export const MarkdownStyling = Extension.create({
	name: 'markdownstyling',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					decorations: ({ doc }) => {
						const decorations: Decoration[] = [];

						doc.descendants((node, pos) => {
							if (node.type.name === 'paragraph' || node.type.name === 'heading') {
								const tail = document.createElement('span');
								const decs = new Set<string>();
								node.descendants((child, childPos) => {
									tail.classList.add(
										'absolute',
										// Magic number
										// TODO: idk
										// '-right-24',
										'-right-24',
										'w-24',
										'h-48',
										'flex',
										'justify-start'
									);

									child.marks.map((mark, i) => {
										decs.add(styling[mark.type.name]);
									});
								});

								[...decs].sort().forEach((dec) => tail.appendChild(document.createTextNode(dec)));
								const tailDec = Decoration.widget(pos, tail, {
									side: -1,
									marks: node.marks
								});
								decorations.push(tailDec);
							}
							return node.type.name === 'paragraph' || node.type.name === 'heading';
						});

						return DecorationSet.create(doc, decorations);
					}
				}
			})
		];
	}
});
