const posts = [
	{
		title: "Воротилин Станислав Петрович",
		// date: 100,
		description:
			"7 августа 1979 года  Воротилину Станиславу  Петровичу  было присвоено  звание  “Заслуженный тренер РСФСР”.",
		imageName: "image_1598996840874.jpg"
	},
	{
		title: "Валенсия, 1998 год",
		// date: 100,
		description:
			"18 июля 1998 года. Валенсия. Главный тренер  ФК «Шинник» Давид Кипиани со своим помощником Борисом Гавриловым перед матчем с ФК «Валенсия».",
		imageUrl: "image_1598999229335.jpg"
	},
	{
		title: "Воротилин Станислав Петрович",
		// date: 100,
		description:
			"17 июля 1963 года звание «Мастер спорта СССР» присвоено Воротилину Станиславу  Петровичу - первому в истории ФУ «Шинник».",
		imageName: "image_1599009611804.jpg"
	},
	{
		title: "Чемпионат России",
		// date: 100,
		description:
			"4 июля 2001 год. Чемпионат России, первый дивизион. Стадион «Шинник». 16 000 зрителей. «Шинник» - «Локомотив» Чита 4:0(1:0). Голы: Кульчий, Лосев, Скоков, Верещак. На фотографии - Верещак забивает мяч. #Шинник Спасибо Андрею Комиссарову за предоставленную фотографию.",
		imageName: "d"
	},
	{
		title: "Сейшельскиe острова",
		// date: 100,
		description:
			"ФК Шинник на Сейшельских островах, 1978 год, слева направо - Гаврилов Борис, Миронов Фёдор, Вихарев Николай.",
		imageName: "e"
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

const users = [
	{
		firstName: "Erik",
		lastName: "Y",
		email: "erik@gmail.com",
		password: "12345",
		role: "guest"
	},
	{
		firstName: "Anna",
		lastName: "M",
		email: "anna@gmail.com",
		password: "12345",
		role: "guest"
	},
	{
		firstName: "Alisa",
		lastName: "M",
		email: "alisa@gmail.com",
		password: "12345",
		role: "guest"
	}
];

module.exports = {
	posts,
	admins,
	users
};
