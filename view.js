var view = {
		display: function (data) {
			// create new data view to be displayed
			var elem, text;
			this.clear();
			elem = document.createElement("h3");
			text = document.createTextNode(data);
			elem.appendChild(text);
			document.getElementById('resultsView').appendChild(elem);
			
		},
		clear: function () {
			// remove old data
			var dataView = document.getElementById('resultsView');
			while (dataView.firstChild) {
				dataView.removeChild(dataView.firstChild);
			}
		},
		find: function (data) {
			controller.updateView(data);
		}
	};