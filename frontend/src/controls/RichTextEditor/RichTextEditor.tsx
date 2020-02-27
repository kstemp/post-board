import React from 'react';
import Button from '../Button/Button';

import './RichTextEditor.scss';

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
	refContent: React.RefObject<HTMLDivElement>;

	constructor(props: any) {
		super(props);

		this.refContent = React.createRef();
	}

	getInnerHTML = (): string =>
		this.refContent.current ? this.refContent.current.innerHTML : '';

	render() {
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__buttons`}>
					{buttons.map(button => (
						<Button icon={button.icon} />
					))}
				</div>

				<div
					style={{
						width: '100%',
						height: '100%',
						overflow: 'auto'
					}}
				>
					<div contentEditable ref={this.refContent} />
				</div>
			</div>
		);
	}
}

export default RichTextEditor;
