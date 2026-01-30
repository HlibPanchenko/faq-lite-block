<?php
// This file is generated. Do not modify it manually.
return array(
	'faq-lite-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/faq-lite-block',
		'version' => '0.1.0',
		'title' => 'FAQ',
		'category' => 'widgets',
		'icon' => 'editor-help',
		'description' => 'A simple FAQ block with accordion and list display modes, including Schema.org markup.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true
			)
		),
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'question' => '',
						'answer' => ''
					)
				)
			),
			'displayMode' => array(
				'type' => 'string',
				'default' => 'accordion'
			),
			'firstOpenByDefault' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'textdomain' => 'faq-lite-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
