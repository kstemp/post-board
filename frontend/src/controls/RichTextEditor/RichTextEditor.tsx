import React from 'react';
import Button from '../Button/Button';
import ColorPicker from '../ColorPicker/ColorPicker';

const baseClassName = 'rich-text-editor';

const buttons = [
	{
		icon: 'format_bold'
	},
	{
		icon: 'format_italic'
	},
	{
		icon: 'strikethrough_s'
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
				<ColorPicker />
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
