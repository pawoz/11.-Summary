function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column'),
			$columnTitle = $('<h2>').addClass('column-title').text(self.name),
			$columnCardList = $('<ul>').addClass('card-list'),
			$columnDelete = $('<button>').addClass('btn-delete').text('x'),
			$columnAddCard = $('<button>').addClass('column-add-card').text('Dodaj kartę');
		
// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		$columnDelete.click(function() {
			self.removeColumn();
		});
		
		$columnAddCard.click(function(event) {
			var cardName = prompt('Wpisz nazwę karty');
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});
			
// KONSTRUOWANIE ELEMENTU KOLUMNY
		$column.append($columnTitle);
		$column.append($columnDelete);
		$column.append($columnAddCard);
		$column.append($columnCardList);
		return $column;
	}
};

Column.prototype = {
	createCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response){
				self.$element.remove();
			}
		});
	}
};
