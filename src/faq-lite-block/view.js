( function () {
	const accordions = document.querySelectorAll( '.faq-block--accordion' );

	accordions.forEach( function ( accordion, blockIndex ) {
		const prefix = 'faq-b' + blockIndex + '-';
		const items = accordion.querySelectorAll( '.faq-item' );

		items.forEach( function ( item, itemIndex ) {
			const button = item.querySelector( '.faq-question button' );
			const answer = item.querySelector( '.faq-answer' );

			if ( ! button || ! answer ) return;

			const questionId = prefix + 'question-' + itemIndex;
			const answerId = prefix + 'answer-' + itemIndex;

			button.setAttribute( 'id', questionId );
			button.setAttribute( 'aria-controls', answerId );
			answer.setAttribute( 'id', answerId );
			answer.setAttribute( 'aria-labelledby', questionId );

			button.addEventListener( 'click', function () {
				const isExpanded = button.getAttribute( 'aria-expanded' ) === 'true';

				// Close all other items in this accordion
				items.forEach( function ( otherItem ) {
					const otherButton = otherItem.querySelector( '.faq-question button' );
					const otherAnswer = otherItem.querySelector( '.faq-answer' );
					if ( otherButton && otherAnswer && otherButton !== button ) {
						otherButton.setAttribute( 'aria-expanded', 'false' );
						otherAnswer.setAttribute( 'hidden', '' );
					}
				} );

				// Toggle current
				if ( isExpanded ) {
					button.setAttribute( 'aria-expanded', 'false' );
					answer.setAttribute( 'hidden', '' );
				} else {
					button.setAttribute( 'aria-expanded', 'true' );
					answer.removeAttribute( 'hidden' );
				}
			} );
		} );
	} );
} )();
