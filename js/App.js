var baseUrl = 'https://kodilla.com/pl/bootcamp-api',
	myHeaders = {
		'X-Client-Id': 1674,
		'X-Auth-Token': '08c1a086ced5b8ef07b662800f25af4b'
	};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
    });
};

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(card);
	});
};