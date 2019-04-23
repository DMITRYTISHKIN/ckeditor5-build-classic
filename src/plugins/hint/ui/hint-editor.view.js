import View from '@ckeditor/ckeditor5-ui/src/view';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
import ClassicEditor from '../../../ckeditor';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';

export default class HintEditorView extends View {
  constructor(locale) {
    super(locale);

    this.setTemplate({
      tag: 'div',
      attributes: {
        class: 'hint-editor-container'
      },
      children: [{
        tag: 'div',
        attributes: {
          id: 'hint-editor'
        },
      }]
    });
  }

  render() {
    super.render();

    submitHandler({
      view: this
    });

    ClassicEditor
      .create(this.element.firstElementChild, {
        plugins: [
          Essentials,
          Bold,
          List,
          Paragraph
        ],
        toolbar: [
          'bold',
          'bulletedList',
          'numberedList',
        ]
      })
      .then(editor => {
        this.editor = editor;
      })
      .catch(error => {
        console.error(error.stack);
      });
  }

}
