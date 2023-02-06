import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export const Wrap = Extension.create({
	name: 'wrap',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					decorations: ({ doc }) => {
						const decorations: Decoration[] = [];
						const decoration = Decoration.widget(-1, document.createElement('div'));

						decorations.push(decoration);

						return DecorationSet.create(doc, decorations);
					}
				}
			})
		];
	}
});
