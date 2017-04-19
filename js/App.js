var baseUrl = 'https://kodilla.com/pl/bootcamp-api',
	myHeaders = {
		'X-Client-Id': 1674,
		'X-Auth-Token': '08c1a086ced5b8ef07b662800f25af4b'
	};

//dodawanieNagłówków	
$.ajaxSetup({
	headers: myHeaders
});

//dopytywanieOZasóbTablicy
$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

//tworzenieColumn
function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
    });
};

//kartyWKolumnie
function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(card);
	});
};

/*

// TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
var todoColumn = new Column('Do zrobienia'),
	doingColumn = new Column('W trakcie'),
	doneColumn = new Column('Skończone');

// DODAWANIE KOLUMN DO TABLICY
board.createColumn(todoColumn);
board.createColumn(doingColumn);
board.createColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('Nowe zadanie'),
	card2 = new Card('stworzyć tablice kanban');

// DODAWANIE KART DO KOLUMN
todoColumn.createCard(card1);
doingColumn.createCard(card2);

//OGÓLNA FUNKCJA
function randomString()	{
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split(),
	str = '', i;
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
};

*/