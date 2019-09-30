import React from 'react';
import { getClassNames } from '../../../util/class-names';
import Button from '../../../controls/Button/Button';

import './FormPage.scss';
const baseClassName = 'form-page';

interface IFormField {
	id: string;
	validation?: (arg0: string) => boolean;
	messageIfInvalid?: string;
	placeholder: string;
	label: string;
	type?: string;
}

export type TFormData = {
	[id: string]: string;
};

interface OwnProps {
	buttonLabel: string;
	fields: IFormField[];
	onSubmit: (arg0: TFormData) => void;
}

interface State {
	formData: TFormData;
	validity: {
		[id: string]: boolean;
	};
}

class FormPage extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		const validityInitial: { [id: string]: boolean } = {};

		this.state = {
			formData: {},
			validity: this.props.fields.reduce((validity, field) => {
				validity[field.id] = field.validation
					? field.validation('')
					: true; // TODO awful...
				return validity;
			}, validityInitial)
		};
	}

	setFormData = (id: string) => (
		event: React.ChangeEvent<HTMLInputElement>
	) =>
		this.setState({
			formData: { ...this.state.formData, [id]: event.target.value }
		});

	render() {
		return (
			<div className={baseClassName}>
				{this.props.fields.map(field => (
					<div className={baseClassName}>
						<span className={`${baseClassName}__label`}>
							{field.label}
						</span>
						<input
							className={getClassNames({
								[`${baseClassName}__input`]: true,
								[`${baseClassName}__input--${
									this.state.validity[field.id] ? '' : 'in'
								}valid`]: true
							})}
							type={field.type}
							placeholder={field.placeholder}
							onChange={e => {
								if (field.validation) {
									this.setState({
										validity: {
											...this.state.validity,
											[field.id]: field.validation(
												e.target.value
											)
										}
									});
								}

								this.setFormData(field.id)(e);
							}}
						/>
						{!this.state.validity[field.id] && (
							<span
								className={`${baseClassName}__label-validity`}
							>
								{field.messageIfInvalid}
							</span>
						)}
					</div>
				))}
				<Button
					fill
					label={this.props.buttonLabel}
					onClick={() => this.props.onSubmit(this.state.formData)}
					disabled={Object.values(this.state.validity).includes(
						false
					)}
				/>
			</div>
		);
	}
}

export default FormPage;
