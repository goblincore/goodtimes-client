import React from 'react';

import Trash2 from 'react-feather/dist/icons/trash-2';

export default class DeleteWarning extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: false
		}
	}

	deleteprompt = () => {
		this.setState({
			message: !this.state.message
		})
	}

	deleteEvent = () => {
		this.props.deleteEvent();
	}

	render() {
		if (this.state.message) {
			return (
				<div>
					<p>Are you sure you want to delete this event?</p>
					<button onClick={this.deleteEvent}>yes</button> <button onClick={this.deleteprompt}>no</button>
				</div>
			)
		}
		else {
			return (
				<a onClick={this.deleteprompt}> <Trash2 size="18"/> Delete</a>
			)
		}
	}
}