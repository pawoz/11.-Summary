function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card'),
			$cardDeleteBtn = $('<button>').addClass('btn-delete-card').text('x'),
			$cardDescription = $('<p>').addClass('card-description').text(self.name);
		
		$cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		$card.append($cardDeleteBtn).append($cardDescription);
		return $card;
	}
};
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.$element.remove();
			}
		});
	}
};