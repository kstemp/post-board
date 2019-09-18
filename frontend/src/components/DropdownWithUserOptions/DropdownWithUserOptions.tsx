import Dropdown from '../../controls/Dropdown/Dropdown';
import { IDType } from '../../entities/types';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';

/*
				{
					onClick: () => console.log('1'),
					buttonProps: {
						icon: 'edit',
						label: 'Edit'
					}
				},
				{
					onClick: () => console.log('2'),
					buttonProps: {
						icon: 'delete',
						label: 'Delete'
					}
				}, */

interface OwnProps {
	entityType: 'post' | 'comment';
	entityID: IDType;
}

class DropdownWithUserOptions extends Dropdown<OwnProps> {
	populateDropdownOptions = () => {
		//	let options = getEdirOrDeletePermissionForPostID(this.props.entityID);
		//let options = [];
		/*
		switch (this.props.entityType) {
			case 'comment':
				options.push({
					onClick: () => console.log('1'),
					buttonProps: {
						icon: 'report',
						label: 'comment here'
					}
				});
				break;
			case 'post':
				options.push({
					onClick: () => console.log('2'),
					buttonProps: {
						icon: 'report',
						label: 'post here'
					}
				});
				break;
			default:
		}

		options.push();
*/
		this.setState({
			options: [
				{
					onClick: () => console.log('3'),
					buttonProps: {
						icon: 'report',
						label: 'Report'
					}
				}
			]
		});
	};
}

const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps)(DropdownWithUserOptions);
