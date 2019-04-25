import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LanguageUI from './language.ui';
import './language.css';


export default class Language extends Plugin {
  static get requires() {
		return [ LanguageUI ];
  }

  static get pluginName() {
		return 'Language';
  }

  constructor(editor) {
    super(editor);
  }
}
