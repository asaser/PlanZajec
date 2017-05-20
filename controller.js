var controller = {
		updateView: function (scheduleName) {
			this.data = this.getFromDatabase(scheduleName);
			this.view.display(this.data);
		},
		getFromDatabase: function (scheduleName) {
			return this.model.getSchedule(scheduleName);
		},
		addToFavourite: function (scheduleName) { //scheduleID??
			this.model.addScheduleToFavourite(scheduleName);
		},
		updateFavourite: function (scheduleName) {
			this.model.updateFavouriteSchedule(scheduleName);
		},
		
		
		model: model,
		view: view,
		data: null
	};