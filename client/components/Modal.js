import React from "react";
import axios from "axios";

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "",
			text: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addTagAndCategory = this.addTagAndCategory.bind(this);
	}

	addTagAndCategory(event) {
		event.preventDefault();
		axios.post("/api/tags", this.state).then(res => {
			this.props.handleClose(res.data);
		});
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		const showHideClassName = this.props.show
			? "modal display-block"
			: "modal display-none";

		return (
			<div className={showHideClassName}>
				<section className="modal-main">
					<form className="form-new-category" onSubmit={this.addTagAndCategory}>
						<label htmlFor="newCategory">Choose Category</label>
						<select
							id="category"
							name="category"
							value={this.state.category}
							onChange={this.handleInputChange}
						>
							<option value="year">year</option>
							<option value="team">team</option>
							<option value="league">league</option>
							<option value="other">other</option>
						</select>

						<label htmlFor="newTag">New Tag</label>
						<input
							type="text"
							name="text"
							className="form-control category-input"
							id="text"
							placeholder="New Tag"
							required=""
							value={this.state.text}
							onChange={this.handleInputChange}
						/>
						<button type="submit" onClick={this.props.addTagAndCategory}>
							Add
						</button>
					</form>
				</section>
			</div>
		);
	}
}