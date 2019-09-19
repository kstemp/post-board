import React from 'react';
import './CommunityBanner.scss';
const baseClassName = 'community-banner';

class CommunityBanner extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<span className={`${baseClassName}__name`}>
					{`#ERROR: Failed to parse community name. `}
				</span>
			</div>
		);
	}
}

export default CommunityBanner;
