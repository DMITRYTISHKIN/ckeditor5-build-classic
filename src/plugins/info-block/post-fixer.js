export default function tableCellPostFixer( writer, model, mapper, view ) {
	let wasFixed = false;

	const elementsToCheck = getElementsToCheck( view );

	for ( const element of elementsToCheck ) {
		wasFixed = ensureProperElementName( element, mapper, writer ) || wasFixed;
	}

	if ( wasFixed ) {
		updateRangesInViewSelection( model.document.selection, mapper, writer );
	}

	return wasFixed;
}

function getElementsToCheck( view ) {
  let elementsWithChangedAttributes = [];
  if (Array.from( view._renderer.markedAttributes )[0]) {
    elementsWithChangedAttributes = (Array.from( view._renderer.markedAttributes )[0])._children
      .filter( (el) => !!el.parent )
      .filter( isSpanOrP )
      .filter( (el) => isTdOrTh( el.parent ) );
  }

	return [ ...elementsWithChangedAttributes ];
}

function ensureProperElementName( currentViewElement, mapper, writer ) {
	const modelParagraph = mapper.toModelElement( currentViewElement );
	const expectedViewElementName = getExpectedElementName( modelParagraph.parent, modelParagraph );

	if ( currentViewElement.name !== expectedViewElementName ) {
		// Unbind current view element as it should be cleared from mapper.
		mapper.unbindViewElement( currentViewElement );

		const renamedViewElement = writer.rename( expectedViewElementName, currentViewElement );

		// Bind paragraph inside table cell to the renamed view element.
		mapper.bindElements( modelParagraph, renamedViewElement );

		return true;
	}

	return false;
}

function getExpectedElementName( tableCell, paragraph ) {
	const isOnlyChild = tableCell.childCount > 1;
	const hasAttributes = !![ ...paragraph.getAttributes() ].length;

	return ( isOnlyChild || hasAttributes ) ? 'p' : 'span';
}

function isSpanOrP( element ) {
	return element.is( 'p' ) || element.is( 'span' );
}

function isTdOrTh( element ) {
	return element.is( "figcaption" );
}

// Resets view selections based on model selection.
function updateRangesInViewSelection( selection, mapper, writer ) {
	const fixedRanges = Array.from( selection.getRanges() )
		.map( range => mapper.toViewRange( range ) );

	writer.setSelection( fixedRanges, { backward: selection.isBackward } );
}