import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

const linkKeystroke = 'Ctrl+I';

export default class InfoBlockUI extends Plugin {
  static get pluginName() {
    return 'InfoBlockUI';
  }

  get _isFormInPanel() {
    return this._balloon.hasView(this.formView);
  }

  get _isUIInPanel() {
    return this._isFormInPanel
  }

  get _isUIVisible() {
    const visibleView = this._balloon.visibleView;
    return visibleView == this.formView;
  }

  constructor(editor) {
    super(editor);
  }

  init() {
    const editor = this.editor;

    editor.editing.view.addObserver(ClickObserver);
    this._createToolbarLinkButton();
  }

  destroy() {
    super.destroy();

    this.formView.destroy();
  }

  _createToolbarLinkButton() {
    const editor = this.editor;
    const linkCommand = editor.commands.get('info-block');
    const t = editor.t;

    editor.keystrokes.set(linkKeystroke, (keyEvtData, cancel) => {
      cancel();
      editor.execute('info-block');
    });

    editor.ui.componentFactory.add('info-block', locale => {
      const button = new ButtonView(locale);

      button.isEnabled = true;
      button.label = t('Блок-уведомление');
      button.class = 'info-block-icon'
      button.keystroke = linkKeystroke;
      button.tooltip = true;

      // Bind button to the command.
      button.bind('isOn', 'isEnabled').to(linkCommand, 'value', 'isEnabled');

      // Show the panel on button click.
      this.listenTo(button, 'execute', () => {
        editor.execute('info-block');
      });

      return button;
    });
  }
}