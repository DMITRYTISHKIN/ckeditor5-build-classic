import View from '@ckeditor/ckeditor5-ui/src/view';
import './checkbox.css';

export default class CheckBoxView extends View {
	constructor( locale ) {
		super( locale );

    this.set( 'value' );
    this.set( 'label' );
    this.set( 'id' );
    this.set( 'checked' );
		this.set( 'isReadOnly', false );

		const bind = this.bindTemplate;

		this.setTemplate( {
			tag: 'label',
			attributes: {
				type: 'text',
				class: [
					'ck',
					'ck-checkbox-container',
					bind.if( 'isReadOnly', 'ck-checkbox-readonly' )
				],
      },
      children: [
        {
          tag: 'input',
          attributes: {
            type: 'checkbox',
            class: [
              'ck-checkbox'
            ],
            id: bind.to( 'id' ),
            value: bind.to( 'value' ),
            checked: bind.to( 'checked' ),
				    readonly: bind.to( 'isReadOnly' ),
          },
          on: {
            change: bind.to( 'checked' )
          }
        },
        {
          tag: 'label',
          class: [
            'ck-checkbox-label'
          ],
          attributes: {
            for: bind.to( 'id' ),
          },
          children: [
            {
              text: bind.to( 'label' )
            }
          ]
        }
      ]

		} );
	}

	render() {
		super.render();

		const setValue = value => {
			this.element.value = ( !value && value !== 0 ) ? '' : value;
		};

		setValue( this.value );

		this.on( 'change:value', ( evt, name, value ) => {
			setValue( value );
    } );
    
    
	}

	select() {
		this.element.select();
	}

	focus() {
		this.element.focus();
	}
}
