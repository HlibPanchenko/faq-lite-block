import { useBlockProps, RichText } from '@wordpress/block-editor';

function stripTags( html ) {
	const doc = new DOMParser().parseFromString( html, 'text/html' );
	return doc.body.textContent || '';
}

export default function save( { attributes } ) {
	const { items, displayMode, firstOpenByDefault } = attributes;

	const filteredItems = items.filter(
		( item ) => item.question || item.answer
	);

	if ( filteredItems.length === 0 ) {
		return null;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: filteredItems.map( ( item ) => ( {
			'@type': 'Question',
			name: stripTags( item.question ),
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		} ) ),
	};

	const jsonLdString = JSON.stringify( jsonLd ).replace( /<\//g, '<\\/' );

	const blockProps = useBlockProps.save();

	if ( displayMode === 'list' ) {
		return (
			<div { ...blockProps } className={ `${ blockProps.className || '' } faq-block faq-block--list`.trim() }>
				<dl className="faq-list">
					{ filteredItems.map( ( item, index ) => (
						<div className="faq-item" key={ index }>
							<dt className="faq-question">
								<RichText.Content value={ item.question } />
							</dt>
							<dd className="faq-answer">
								<RichText.Content value={ item.answer } />
							</dd>
						</div>
					) ) }
				</dl>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={ { __html: jsonLdString } }
				/>
			</div>
		);
	}

	return (
		<div { ...blockProps } className={ `${ blockProps.className || '' } faq-block faq-block--accordion`.trim() }>
			{ filteredItems.map( ( item, index ) => {
				const isFirstOpen = firstOpenByDefault && index === 0;
				return (
					<div className="faq-item" key={ index }>
						<h3 className="faq-question">
							<button
								aria-expanded={ isFirstOpen ? 'true' : 'false' }
								aria-controls={ `faq-answer-${ index }` }
								id={ `faq-question-${ index }` }
							>
								<span className="faq-question-text">
									<RichText.Content value={ item.question } />
								</span>
								<span className="faq-icon" aria-hidden="true"></span>
							</button>
						</h3>
						<div
							className="faq-answer"
							id={ `faq-answer-${ index }` }
							role="region"
							aria-labelledby={ `faq-question-${ index }` }
							hidden={ ! isFirstOpen ? true : undefined }
						>
							<div className="faq-answer-inner">
								<RichText.Content value={ item.answer } />
							</div>
						</div>
					</div>
				);
			} ) }
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={ { __html: jsonLdString } }
			/>
		</div>
	);
}
