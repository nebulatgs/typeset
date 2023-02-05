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
							node.marks.map((mark, i) => {
								const before = document.createElement('span');
								before.appendChild(document.createTextNode(styling[mark.type.name]));
								const after = document.createElement('span');

								after.appendChild(document.createTextNode(styling[mark.type.name]));
								const beforeDec = Decoration.widget(pos - i, before, {
									side: -1,
									marks: node.marks
								});
								const afterDec = Decoration.widget(pos + node.nodeSize + i, after, {
									side: -1,
									marks: node.marks
								});
								decorations.push(beforeDec, afterDec);
							});

							return true;
						});

						return DecorationSet.create(doc, decorations);
					}
				}
			})
		];
	}
});
