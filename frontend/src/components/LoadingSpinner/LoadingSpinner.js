//@flow
import React from 'react';

import './style/LoadingSpinner.scss';

const baseClassName = 'loading-spinner';

const rotationRadius = 20;
const circleRadius = 10;

type LoadingSpinnerProps = {
	color: string
};

type LoadingSpinnerStateProps = {
	rotationAngle: number
};

class LoadingSpinner extends React.Component<
	LoadingSpinnerProps,
	LoadingSpinnerStateProps
> {
	static defaultProps = {
		color: '#0074D9',
		text: null
	};

	constructor(props: LoadingSpinnerProps) {
		super(props);
		this.state = {
			rotationAngle: 0
		};
	}

	componentDidMount() {
		this.frame = requestAnimationFrame(this.animate);
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.frame);
	}

	animate = () => {
		this.setState({ rotationAngle: this.state.rotationAngle + 0.1 });

		const canvas = this.canvas;
		const ctx = canvas.getContext('2d');

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.strokeStyle = this.props.color;
		ctx.lineWidth = 3;

		const drawCircle = initialAngleOffset => {
			const circleX =
				Math.cos(this.state.rotationAngle + initialAngleOffset) *
				rotationRadius;
			const circleY =
				Math.sin(this.state.rotationAngle + initialAngleOffset) *
				rotationRadius;

			ctx.beginPath();
			ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
			ctx.stroke();
		};

		drawCircle(0);
		drawCircle((1 / 3) * 2 * Math.PI);
		drawCircle((2 / 3) * 2 * Math.PI);

		this.frame = requestAnimationFrame(this.animate);
	};

	render() {
		return (
			<div className={baseClassName} style={this.props.style}>
				<canvas
					width={100}
					height={100}
					ref={canvas => (this.canvas = canvas)}
				/>
				{this.props.text && <span>{this.props.text}</span>}
			</div>
		);
	}
}

export default LoadingSpinner;
