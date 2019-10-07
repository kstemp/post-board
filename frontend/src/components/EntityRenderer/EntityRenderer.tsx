import React from 'react';

import { prettyPrintDateDifference } from '../../util/date';
import Button from '../../controls/Button/Button';
import { displayErrorNotification } from '../../util/notification';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import {
	createReactionForEntityID,
	deleteReactionForEntityID
} from '../../entities/reactions';
import { TEntity } from '../../entities/types';
import {
	fetchEntitiesByParentID,
	createCommentForParentID
} from '../../entities/fetchers';
import Input from '../../controls/Input/Input';
import { BACKEND_URL } from '../../Config';

import './EntityRenderer.scss';

interface OwnProps {
	baseClassName: string;
	entity: TEntity;
}

interface StateProps {
	isLoggedIn: boolean;
}

type Props = OwnProps & StateProps;

interface State {
	entity: TEntity;
	childEntities?: TEntity[];
	displayChildEntities: boolean;
}

class EntityRenderer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			entity: this.props.entity,
			displayChildEntities: false
		};
	}

	createChildEntity = async (text: string) => {
		try {
			const entity = await createCommentForParentID(
				this.state.entity.entity_id,
				text
			);
			this.setState({
				childEntities: [...(this.state.childEntities || []), entity] // this || [] is to make TypeScript happy, since this.state.coomments can be undefined... TODO fix
			});
		} catch (error) {
			displayErrorNotification('Failed to create comment', error);
		}
	};

	openInputFieldAndLoadChildEntities = async () => {
		this.toggleShowChildren();
		try {
			const childEntities = await fetchEntitiesByParentID(
				this.state.entity.entity_id
			);
			this.setState({ childEntities: childEntities });
		} catch (error) {
			displayErrorNotification('Failed to fetch child comments', error);
		}
	};

	toggleLiked = async () => {
		if (this.state.entity) {
			try {
				if (this.state.entity.reacted) {
					await deleteReactionForEntityID(
						this.state.entity.entity_id
					);
					this.setState({
						entity: {
							...this.state.entity,
							reaction_count:
								this.state.entity.reaction_count - 1,
							reacted: false
						}
					});
				} else {
					await createReactionForEntityID(
						this.state.entity.entity_id
					);
					this.setState({
						entity: {
							...this.state.entity,
							reaction_count:
								this.state.entity.reaction_count + 1,
							reacted: true
						}
					});
				}
			} catch (error) {
				displayErrorNotification('Failed to react', error);
			}
		}
	};

	toggleShowChildren = () =>
		this.setState({
			displayChildEntities: !this.state.displayChildEntities
		});

	render() {
		return (
			<div className={this.props.baseClassName}>
				<div className={`${this.props.baseClassName}__header`}>
					<span
						className={`${this.props.baseClassName}__header-user`}
					>
						{this.state.entity.user_id || 'Anonymous'}
					</span>
					<span
						className={`${this.props.baseClassName}__header-created-on`}
					>
						{prettyPrintDateDifference(
							new Date(this.state.entity.created_on),
							new Date()
						)}
					</span>
				</div>
				{this.props.baseClassName === 'comment' && (
					<div
						className={`${this.props.baseClassName}__thread-line`}
						onClick={this.toggleShowChildren}
						title={'Collapse thread to parent comment'}
					/>
				)}
				{this.state.entity.content_type === 'html' ? (
					<div
						className={`${this.props.baseClassName}__body`}
						dangerouslySetInnerHTML={{
							__html: this.state.entity.content
						}}
					/>
				) : (
					<img
						className={`${this.props.baseClassName}__body`}
						src={`${BACKEND_URL}/img/${this.state.entity.content}`}
						alt={'TODO'}
					></img>
				)}
				<div className={`${this.props.baseClassName}__buttons`}>
					<Button
						label={(
							this.state.entity.reaction_count || 0
						).toString()}
						icon={`favorite${
							this.state.entity.reacted ? '' : '_border'
						}`}
						onClick={this.toggleLiked}
						disabled={!this.props.isLoggedIn}
						toolTipEnabled={'Like'}
						toolTipDisabled={
							'You must be logged in to react to comments'
						}
					/>
					<Button
						icon={'chat_bubble_outline'}
						label={this.state.entity.child_count.toString()}
						onClick={this.openInputFieldAndLoadChildEntities}
					/>
					<Button icon={'report'} label={'Report'} />
				</div>
				{this.state.displayChildEntities && (
					<div
						className={`${this.props.baseClassName}__input-wrapper`}
					>
						<Input
							autoFocus
							className={'pb-input'}
							placeholder={'Comment text goes here'}
							required
							onInputSubmit={this.createChildEntity}
						/>
					</div>
				)}
				{this.state.displayChildEntities &&
					this.state.childEntities &&
					this.state.childEntities.map(entity => (
						<EntityRenderer
							baseClassName={'comment'}
							isLoggedIn={this.props.isLoggedIn}
							entity={entity}
						/> // TODO figure out a better workaround around Redux not liking recursive components
					))}
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps)(EntityRenderer);
