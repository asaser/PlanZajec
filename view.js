var view = {
		display: function (data) {
			// create new data view to be displayed
			var elem, text, i;
			this.clear();
			for (i = 0; i < data.length; i++) {
				elem = document.createElement("h3");
				text = document.createTextNode(
						data[i].code + "/" + data[i].name + " " + data[i].rate
						);
				elem.appendChild(text);
				document.getElementById('dataview').appendChild(elem);
			}
		},
		clear: function () {
			// remove old data
			var dataView = document.getElementById('dataview');
			while (dataView.firstChild) {
				dataView.removeChild(dataView.firstChild);
			}
		},
		addCurrency: function () {
			var currency = {
					code: document.getElementById('code').value,
					rate: document.getElementById('rate').value,
					name: document.getElementById('name').value
			}
			controller.storeCurrency(currency);
		}
	};
