import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, Button } from '@wordpress/components';
import { useEffect, useCallback } from '@wordpress/element';
import './editor.scss';

let counter = 0;
function uid() {
	return 'faq-' + Date.now().toString( 36 ) + '-' + ( ++counter );
}

function FaqItem( { item, index, total, onUpdate, onDelete, onMove } ) {
	return (
		<div className="faq-editor__item">
			<div className="faq-editor__toolbar">
				<span className="faq-editor__item-number">{ index + 1 }</span>
				<Button
					icon="arrow-up-alt2"
					label={ __( 'Move up', 'faq-lite-block' ) }
					onClick={ () => onMove( index, index - 1 ) }
					disabled={ index === 0 }
					size="small"
				/>
				<Button
					icon="arrow-down-alt2"
					label={ __( 'Move down', 'faq-lite-block' ) }
					onClick={ () => onMove( index, index + 1 ) }
					disabled={ index === total - 1 }
					size="small"
				/>
				<Button
					icon="trash"
					label={ __( 'Delete item', 'faq-lite-block' ) }
					onClick={ () => onDelete( index ) }
					isDestructive
					size="small"
				/>
			</div>
			<RichText
				tagName="h3"
				className="faq-editor__question"
				identifier={ 'question-' + item.id }
				placeholder={ __( 'Question…', 'faq-lite-block' ) }
				value={ item.question }
				onChange={ ( value ) => onUpdate( index, 'question', value ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
			/>
			<RichText
				tagName="div"
				className="faq-editor__answer"
				identifier={ 'answer-' + item.id }
				placeholder={ __( 'Answer…', 'faq-lite-block' ) }
				value={ item.answer }
				onChange={ ( value ) => onUpdate( index, 'answer', value ) }
				allowedFormats={ [
					'core/bold',
					'core/italic',
					'core/link',
				] }
			/>
		</div>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { items, displayMode, firstOpenByDefault } = attributes;

	// Assign stable IDs to items that lack them (once, on mount / after migration).
	useEffect( () => {
		const needsIds = items.some( ( item ) => ! item.id );
		if ( needsIds ) {
			setAttributes( {
				items: items.map( ( item ) =>
					item.id ? item : { ...item, id: uid() }
				),
			} );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	const updateItem = useCallback(
		( index, field, value ) => {
			setAttributes( {
				items: items.map( ( item, i ) =>
					i === index ? { ...item, [ field ]: value } : item
				),
			} );
		},
		[ items, setAttributes ]
	);

	const addItem = useCallback( () => {
		setAttributes( {
			items: [ ...items, { id: uid(), question: '', answer: '' } ],
		} );
	}, [ items, setAttributes ] );

	const deleteItem = useCallback(
		( index ) => {
			const newItems = items.filter( ( _, i ) => i !== index );
			if ( newItems.length === 0 ) {
				newItems.push( { id: uid(), question: '', answer: '' } );
			}
			setAttributes( { items: newItems } );
		},
		[ items, setAttributes ]
	);

	const moveItem = useCallback(
		( from, to ) => {
			if ( to < 0 || to >= items.length ) return;
			const newItems = [ ...items ];
			const [ moved ] = newItems.splice( from, 1 );
			newItems.splice( to, 0, moved );
			setAttributes( { items: newItems } );
		},
		[ items, setAttributes ]
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'FAQ Settings', 'faq-lite-block' ) }>
					<SelectControl
						label={ __( 'Display Mode', 'faq-lite-block' ) }
						value={ displayMode }
						options={ [
							{ label: __( 'Accordion', 'faq-lite-block' ), value: 'accordion' },
							{ label: __( 'List', 'faq-lite-block' ), value: 'list' },
						] }
						onChange={ ( value ) => setAttributes( { displayMode: value } ) }
					/>
					{ displayMode === 'accordion' && (
						<ToggleControl
							label={ __( 'First item open by default', 'faq-lite-block' ) }
							checked={ firstOpenByDefault }
							onChange={ ( value ) => setAttributes( { firstOpenByDefault: value } ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'faq-editor' } ) }>
				{ items.map( ( item, index ) => (
					<FaqItem
						key={ item.id || index }
						item={ item }
						index={ index }
						total={ items.length }
						onUpdate={ updateItem }
						onDelete={ deleteItem }
						onMove={ moveItem }
					/>
				) ) }
				<Button
					variant="secondary"
					onClick={ addItem }
					className="faq-editor__add-button"
				>
					{ __( 'Add FAQ Item', 'faq-lite-block' ) }
				</Button>
			</div>
		</>
	);
}
