/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import InfoBlock from './plugins/info-block/info-block';
import InfoBlockStyle from './plugins/info-block/info-block-style';
import Hint from './plugins/hint/hint';
import Language from './plugins/language/language';

import './style.css';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Heading,
	Link,
	List,
	Paragraph,
	InfoBlock,
	InfoBlockStyle,
	Hint,
	Language
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: ['bold', 'bulletedList', 'numberedList', 'hint', 'link', 'info-block', 'language']
	},
	languages: [
    'RU', 'BY', 'KZ', 'KG', 'AM'
  ],
	language: 'ru'
};
