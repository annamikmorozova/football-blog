const posts = [
	{
		title: "Воротилин Станислав Петрович",
		description:
			"Команда Ярославской области - участник первого розыгрыша турнира «Переправа»(возраст игроков до 20 лет). 1978 год.Азов, первенство РСФСР, полуфинал. 5 - место. Стоят(слева направо): Чистяков В.Л.(ст.тренер), Жарков О., Коровкин С., Шутов В., Кузнецов Е., Михеев В., Смирнов В., Власов В., Губарев С., Шишкин А., Гольцев И.В., сидят: Васильев Д., Лебедев С., Павлов А., Шильников С., Сазонов В., Дубов М., Морозов М.",
		shortcut:
			"Команда Ярославской области - участник первого розыгрыша турнира «Переправа»(возраст игроков до 20 лет). 1978 год.Азов, первенство РСФСР, полуфинал. 5 - место. Стоят(слева направо): Чистяков В.Л.(ст.тренер), Жарков О., Коровкин С., Шутов В., Кузнецов Е., Михеев В., Смирнов В., Власов В., Губарев С., Шишкин А., Гольцев И.В., сидят: Васильев Д., Лебедев С., Павлов А., Шильников С., Сазонов В., Дубов М., Морозов М.",
		imageTitle: "7 августа 1979 года ",
		imageName: "test.jpg",
		credits: "Google",
		pictureDescription: "this is a test"
	},
	{
		title: "Воротилин Станислав Петрович",
		description:
			"18 июля 1998 года. Валенсия. Главный тренер  ФК «Шинник» Давид Кипиани со своим помощником Борисом Гавриловым перед матчем с ФК «Валенсия».",
		shortcut:
			"18 июля 1998 года. Валенсия. Главный тренер  ФК «Шинник» Давид Кипиани со своим помощником Борисом Гавриловым перед матчем с ФК «Валенсия».",
		imageTitle: "7 августа 1979 года ",
		imageName: "test.jpg",
		credits: "Google",
		pictureDescription: "this is a test"
	},
	{
		title: "Воротилин Станислав Петрович",
		description:
			"4 июля 2001 год. Чемпионат России, первый дивизион.Стадион «Шинник». 16 000 зрителей. «Шинник» - «Локомотив» Чита 4:0(1:0). Голы: Кульчий, Лосев, Скоков, Верещак. На фотографии - Верещак забивает мяч. #Шинник Спасибо Андрею Комиссарову за предоставленную фотографию.",
		imageTitle: "7 августа 1979 года ",
		imageName: "test.jpg",
		credits: "Google",
		pictureDescription: "this is a test"
	},
	{
		title: "Воротилин Станислав Петрович",
		description:
			"ФК Шинник на сборах, 1971 год, слева направо: Замятин Иван Иванович - администратор команды, Рейнгольд Валерий, Растегаев Николай, Вихарев Николай, Панков Владимир, Клещев Валерий.",
		shortcut:
			"ФК Шинник на сборах, 1971 год, слева направо: Замятин Иван Иванович - администратор команды, Рейнгольд Валерий, Растегаев Николай, Вихарев Николай, Панков Владимир, Клещев Валерий.",
		imageTitle: "7 августа 1979 года",
		imageName: "test.jpg",
		credits: "Google",
		pictureDescription: "this is a test"
	},
	{
		title: "Воротилин Станислав Петрович",
		description:
			"7 августа 1979 года  Воротилину Станиславу  Петровичу  было присвоено  звание  “Заслуженный тренер РСФСР”.",
		shortcut: "EEEEEE",
		imageTitle: "7 августа 1979 года ",
		imageName: "test.jpg",
		credits: "Google",
		pictureDescription: "this is a test"
	}
];

// 0th post from above will get the 0th set of tags from this array
// and so on.  These are lined up with the id of the tags which comes
// from the order of the tags array
const postTags = [[1, 4], [2, 5], [1, 4], [1, 4], [1, 4]];

const tags = [
	{
		text: "1990",
		category: "year"
	},
	{
		text: "1980",
		category: "year"
	},
	{
		text: "1970",
		category: "year"
	},
	{
		text: "National Team",
		category: "team"
	},
	{
		text: "Shinnik",
		category: "team"
	},
	{
		text: "2000",
		category: "year"
	},
	{
		text: "Barcelona",
		category: "team"
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
	users,
	tags,
	postTags
};
