import React from 'react';
import Input from '../../controls/Input/Input';
import Button from '../../controls/Button/Button';

import './FormPage.scss';
import { isEmpty } from '../../util/string';

const baseClassName = 'form-page';

interface IFormField {
	id: string;
	placeholder?: string;
	password?: boolean;
	required?: boolean;
}

interface OwnProps {
	title: string;
	fields: IFormField[];
	buttonLabel: string;
	onFormSubmit: () => void;
}

class FormPage extends React.Component<OwnProps> {
	public valuesByID: { [id: string]: string };

	constructor(props: OwnProps) {
		super(props);

		this.valuesByID = {};
		props.fields.forEach(field => (this.valuesByID[field.id] = ''));
	}

	render() {
		return (
			<div className={baseClassName}>
				<p>{this.props.title}</p>
				{this.props.fields.map(field => (
					<Input
						placeholder={field.placeholder}
						type={field.password ? 'password' : 'text'}
						onChange={
							(event: React.ChangeEvent<HTMLInputElement>) =>
								(this.valuesByID[field.id] = event.target.value)
							//console.log(this.valuesByID);
						}
					/>
				))}
				<Button
					fill
					label={this.props.buttonLabel}
					onClick={this.props.onFormSubmit}
				/>
			</div>
		);
	}
}

export default FormPage;
