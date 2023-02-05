import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export const MarkdownHeading = Extension.create({
	name: 'markdownheading',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					decorations: ({ doc }) => {
						const decorations: Decoration[] = [];

						doc.descendants((node, pos) => {
							if (node.type.name === 'heading') {
								const newNode = document.createElement('span');
								newNode.classList.add(
									'absolute',
									// Magic number
									// TODO: idk
									'-left-24',
									'w-24',
									'flex',
									'justify-end',
									'px-2'
								);
								console.log(node);
								newNode.appendChild(document.createTextNode('#'.repeat(node.attrs.level)));
								const decoration = Decoration.widget(pos + 1, newNode, {
									ignoreSelection: true,
									side: -1
								});
								decorations.push(decoration);
							}

							return node.type.name === 'heading';
						});

						return DecorationSet.create(doc, decorations);
					}
				}
			})
		];
	}
});
