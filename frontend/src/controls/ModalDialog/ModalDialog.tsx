import React from 'react';

const baseClassName = 'modal-dialog';

interface OwnProps {
	content: React.Component;
}

class ModalDialog extends React.Component<OwnProps> {
	render() {
		return <div className={baseClassName}>{this.props.content}</div>;
	}
}

export default ModalDialog;
