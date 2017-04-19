$(function() {
	//generowanieID	
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	};	
//podstawoweKlasyIObiektyTablic
//klasaColumn
	function Column(name) {
		var self = this; //żebyNieZgubićntekstu
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();
		function createColumn() {
//tworzenieElementówKolumny
			var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name);
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete').text('x'),
				$columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
//podpinanieZdarzeń
//kasowanieKolumnyPoKlinięuWPrzycisk
			$columnDelete.click(function() {
				self.removeColumn();
			});
//dodawanieKarteczkiPoKliknięuWPrzycisk
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Wpisz nazwę karty")));
			});
//konstruowanieKolumny
			$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);
//zwracanieKolumny
			return $column;
		};
	};
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
			},
		removeColumn: function() {
			this.$element.remove();
		}
	};
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();
		function createCard() {
//tworzenieKarty
			var $card = $('<li>').addClass('card'),
				$cardDescription = $('<p>').addClass('card-description').text(self.description),
				$cardDelete = $('<button>').addClass('btn-delete-card').text('x');
//podpinanieZdarzeń
			$cardDelete.click(function(){
				self.removeCard();
			});
//składanieIPodpinanieZdarzeń
			$card.append($cardDelete)
			.append($cardDescription);
			return $card;
		}
	};
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};
//obiektTablicy
	var board = {
		name: 'Tablica Kanban',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
			},
		$element: $('#board .column-container')
	};
//jQueryUI drag'N'Drop
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	};
	$('.create-column').click(function(){
		var name = prompt('Wpisz nazwę kolumny'),
			column = new Column(name);
    	board.addColumn(column);
	});
//tworzenieKolumn
	var todoColumn = new Column('Do zrobienia'),
		doingColumn = new Column('W trakcie'),
		doneColumn = new Column('Skończone');
//dodawanieKolumnDoTablicy
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);
//tworzenieNowychEgzemplarzyKart
//	var card1 = new Card('Nowe zadanie'),
//		card2 = new Card('Stworzyc tablice kanban');
//dodawanieKartDoKolumn
//	todoColumn.addCard(card1);
//	doingColumn.addCard(card2);
});
