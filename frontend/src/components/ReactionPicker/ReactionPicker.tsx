import React from 'react';

import './ReactionPicker.scss';

const baseClassName = 'reaction-picker';

class ReactionPicker extends React.Component {
	reactionEmojis = ['Upvote', 'Downvote', 'Heart'];

	render() {
		return (
			<div className={baseClassName}>
				{this.reactionEmojis.map(emoji => (
					<button>{emoji}</button>
				))}
			</div>
		);
	}
}

export default ReactionPicker;
