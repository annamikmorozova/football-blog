const faker = require("faker");

const posts = [
	{
		title: "Воротилин Станислав Петрович",
		// date: 100,
		description:
			"7 августа 1979 года  Воротилину Станиславу  Петровичу  было присвоено  звание  “Заслуженный тренер РСФСР”."
		// imageUrl:
	},
	{
		title: "Валенсия, 1998 год",
		// date: 100,
		description:
			"18 июля 1998 года. Валенсия. Главный тренер  ФК «Шинник» Давид Кипиани со своим помощником Борисом Гавриловым перед матчем с ФК «Валенсия»."
		// imageUrl:
	},
	{
		title: "Воротилин Станислав Петрович",
		// date: 100,
		description:
			"17 июля 1963 года звание «Мастер спорта СССР» присвоено Воротилину Станиславу  Петровичу - первому в истории ФУ «Шинник»."
		// imageUrl:
	},
	{
		title: "Чемпионат России",
		// date: 100,
		description:
			"4 июля 2001 год. Чемпионат России, первый дивизион. Стадион «Шинник». 16 000 зрителей. «Шинник» - «Локомотив» Чита 4:0(1:0). Голы: Кульчий, Лосев, Скоков, Верещак. На фотографии - Верещак забивает мяч. #Шинник Спасибо Андрею Комиссарову за предоставленную фотографию."
		// imageUrl:
	},
	{
		title: "Сейшельскиe острова",
		// date: 100,
		description:
			"ФК Шинник на Сейшельских островах, 1978 год, слева направо - Гаврилов Борис, Миронов Фёдор, Вихарев Николай."
		// imageUrl:
	}
];

const admins = [
	{
		firstName: "admin",
		lastName: "admin",
		email: "admin@gmail.com",
		password: "admin",
		role: "admin"
	}
];

function getUserSeed() {
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: "customer"
	};
}

module.exports = {
	posts,
	getUserSeed,
	admins
};
