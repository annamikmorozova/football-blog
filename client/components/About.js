import React, {Component} from "react";

export default class About extends Component {
	render() {
		return (
			<div>
				<h1 className="about-title">Михаил Морозов</h1>
				<div className="about-row">
					<div className="all-body-text">
						<p className="p-margin">
							Советский футболист, Мастер Спорта СССР. Выступал за ФК Шинник
							1981-1991гг. На этой странице пишу о футболе, о людях, связанных с
							историей футбольного клуба «Шинник».
						</p>

						<p className="p-margin">
							Родился 16 апреля 1960 в г.Единцы Молдавской ССР. С 8 лет начал
							заниматься футболом. В 1971, 1972 годах становился победителем
							Молдавской ССР на призы "Кожаный мяч" в составе команды "Орленок"
							г.Единцы и участвовал во Всесоюзных финалах "Кожаный мяч".
						</p>

						<p className="p-margin">
							В 1974 году переехал в г.Ярославль. В 1977 году закончил школу
							№36. С 1977-1982гг. учился в Ярославском государственном
							университете им.П.Г.Демидова по специальности прикладная
							математика. Одновременно играл, сначала, за дублирующий состав
							"Шинника", а с 1981-1991 гг. - игрок основного состава ФК
							"Шинник", выступающего в 1 лиге СССР. Был капитаном команды. Также
							закончил университет им К.Д. Ушинского в педагогическом
							направлении в 1989 году.
						</p>

						<p className="p-margin">
							С 1992 года занимался коммерческой деятельностью. Прошел путь от
							экспедитора до коммерческого директора и генерального директора. В
							октябре 1999 года перешел работать Вице-Президентом в ФК "Шинник".
							В котором работал, с перерывами, до 2017 года на различных
							должностях, таких как начальник селекционного отдела, спортивный
							директор, генеральный менеджер, зам.генерального директора.
						</p>
					</div>

					<img
						className="home-page-image-size"
						src="/front-page.jpg"
						alt="MikhailMorozov"
					/>
				</div>
			</div>
		);
	}
}
