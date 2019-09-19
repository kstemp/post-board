import React from 'react';

import './ModalDialogContainer.scss';

const baseClassName = 'modal-dialog-container';

interface OwnProps {
	//	dialog: ModalDialog | null;
}

class ModalDialogContainer extends React.Component<OwnProps> {
	render() {
		return <div className={baseClassName}></div>;
	}
}

export default ModalDialogContainer;
