import React from 'react';
import Button from '../Button/Button';

const baseClassName = 'rich-text-editor';

const buttons = [
	{
		icon: 'format_bold'
	},
	{
		icon: 'format_italic'
	}
];

class RichTextEditor extends React.Component {
	render() {
		return (
			<div
				className={baseClassName}
				style={{
					width: 300,
					height: 300,
					margin: 300,
					border: '1px solid black'
				}}
			>
				{buttons.map(button => (
					<Button icon={button.icon} />
				))}
				<div
					style={{
						width: '100%',
						height: '100%',
						overflow: 'auto'
					}}
				>
					<div contentEditable={true} />
				</div>
			</div>
		);
	}
}

export default RichTextEditor;
