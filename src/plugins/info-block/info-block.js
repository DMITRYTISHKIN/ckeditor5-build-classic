import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InfoBlockEditing from './info-block.editing';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InfoBlockUI from './info-block.ui';

export default class InfoBlock extends Plugin {
  static get requires() {
		return [ InfoBlockEditing, Widget, InfoBlockUI ];
  }

  static get pluginName() {
		return 'InfoBlock';
  }

  constructor(editor) {
    super(editor);
  }
}
