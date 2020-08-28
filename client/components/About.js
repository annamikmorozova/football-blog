import React, {Component} from "react";
import {Col} from "reactstrap";

export default class About extends Component {
	render() {
		return (
			<div>
				<h1 className="about-title">Mikhail Morozov</h1>
				<Col size={8}>
					<div>
						Советский футболист, Мастер Спорта СССР. Выступал за ФК Шинник
						1981-1991гг. На этой странице пишу коротко об истории любимого клуба
						:)
					</div>
				</Col>
				<Col size={4}>
					<img
						className="home-page-image-size"
						scr="/front-page.jpg"
						alt="MikhailMorozov"
					/>
				</Col>
			</div>
		);
	}
}
