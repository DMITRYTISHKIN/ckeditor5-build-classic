import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import CheckBoxView from '../../ui/checkbox/checkbox';
import View from '@ckeditor/ckeditor5-ui/src/view';

export default class LanguageUI extends Plugin {
  static get pluginName() {
    return 'LanguageUI';
  }

  constructor(editor) {
    super(editor);
  }

  init() {
    const editor = this.editor;
    editor.getLanguageData = () => {
      const languages = [];
      for (const key in editor.languages) {
        if (editor.languages[key]) {
          languages.push(key);
        }
      }

      if (languages.length > 0 && languages.length !== editor.config.get('languages').length) {
        const text = editor.getData();
        const data = {};
        languages.forEach((key) => {
          data[key] = text;
        });
        return data;
      }

      return editor.getData();
    }

    editor.editing.view.addObserver(ClickObserver);
    this._createToolbarLinkButton();
  }

  destroy() {
    super.destroy();
  }

  _createToolbarLinkButton() {
    const editor = this.editor;
    const languages = editor.config.get('languages');

    editor.ui.componentFactory.add('language', locale => {
      const checkboxes = languages.map((language) => {
        const checkbox = new CheckBoxView(locale);
        checkbox.set({
          id: `${language}`,
          label: language
        });

        checkbox.on('checked', ( evt, name ) => {
          name.currentTarget.checked;
          editor.languages = Object.assign({}, editor.languages, {
            [language]: name.currentTarget.checked
          });
        });
        
        return checkbox;
      });


      const view = new View(locale);
      view.setTemplate({
        tag: 'div',
        attributes: {
            class: 'language-container',
        },
        children: checkboxes
      });

      return view;
    });
  }

}