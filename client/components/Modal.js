import React from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "год",
			text: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addTagAndCategory = this.addTagAndCategory.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
	}

	addTagAndCategory(event) {
		event.preventDefault();
		axios.post("/api/tags", this.state).then(res => {
			this.props.handleClose(res.data);
		});
	}

	handleModalClose() {
		this.props.handleClose();
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
						<label htmlFor="newCategory">Выберите категорию</label>
						<select
							id="category"
							name="category"
							value={this.state.category}
							onChange={this.handleInputChange}
						>
							<option value="год">год</option>
							<option value="команда">команда</option>
							<option value="дивизион">дивизион</option>
							<option value="другие">другие</option>
						</select>

						<label htmlFor="newTag">Новый тэг</label>
						<input
							type="text"
							name="text"
							className="form-control category-input"
							id="text"
							placeholder="Введите новый тэг"
							required=""
							value={this.state.text}
							onChange={this.handleInputChange}
						/>
						<Button
							className="add-close"
							variant="outline-primary"
							type="submit"
						>
							Добавить
						</Button>
						<Button
							className="add-close"
							variant="outline-primary"
							type="button"
							onClick={this.handleModalClose}
						>
							Close
						</Button>
					</form>
				</section>
			</div>
		);
	}
}
