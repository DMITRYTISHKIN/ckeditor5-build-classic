import Command from '@ckeditor/ckeditor5-core/src/command';
import { findOptimalInsertionPosition } from '@ckeditor/ckeditor5-widget/src/utils';

export default class InfoBlockCommand extends Command {
  constructor(editor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const schema = model.schema;

    const validParent = this._getInsertTableParent(selection.getFirstPosition())
    this.isEnabled = schema.checkChild(validParent, 'info-block');
  }

  execute() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const insertPosition = this.editor.model.createPositionBefore(selection.getFirstPosition().parent);

    model.change((writer) => {
      const block = writer.createElement('info-block');
      const caption = writer.createElement('info-block-edit');
      const paragraph = writer.createElement('paragraph');
      writer.insert( paragraph, caption, 0)
      writer.insert( caption, block, 0);
      model.insertContent(block, insertPosition);
    });
  }

  _getInsertTableParent(position) {
    const parent = position.parent;
    if (parent.parent && parent.parent.name === 'info-block-edit') {
      return parent.parent.parent;
    }
    
    return parent === parent.root ? parent : parent.parent;
  }
}
