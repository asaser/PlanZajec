var model = {
	// counter of rows (schedules' IDs) in database
	countRows: 0,
	// array with schedules' IDs
	tblId: [],
/*
	//ref: new Firebase("https://projekt1-4d649.firebaseio.com/PlanZajec"),
	//usersRef:  ref.child("all"),
*/
	getSchedule: function (scheduleName) {
	var scheduleData;
		if (localStorage.getItem(scheduleName) == null) {
				console.log("Searching in database...");
				ref.child('schedules').orderByChild('@attributes/nazwa').equalTo(scheduleName).on('child_added',  function(snapshot) {
				scheduleData = JSON.stringify(snapshot.val());
				console.log(scheduleData);
			});
		} else {
			scheduleData = localStorage.getItem(scheduleName);
			console.log("LOCAL: " + scheduleData);
		}
		return scheduleData;	
	},

	addScheduleToFavourite: function (scheduleName) {
		ref.child('schedules').orderByChild('@attributes/nazwa').equalTo(scheduleName).on('child_added',  function(snapshot) {
			console.log(JSON.stringify(snapshot.val()));
			localStorage.setItem(scheduleName, JSON.stringify(snapshot.val()));
			//countFaw++;
		});
	},

	updateFavouriteSchedule: function(scheduleName) {
		ref.child('schedules').orderByChild('@attributes/nazwa').equalTo(scheduleName).on('child_added',  function(snapshot) {
			console.log(JSON.stringify(snapshot.val()));
			localStorage.setItem(scheduleName, JSON.stringify(snapshot.val()));
		});
	},

	// RUNNING PROCESS OF SAVING ALL DATA TO DATABASE USING CALLBACK FUNCTIONS TO KEEP ADEQUATE SEQUENCE
	runActualization: function(){
		readAllIDs(saveFirstData);
	},


	// READING ALL DATA WITH IDS OF SCHEDULES WHICH IS TO BE SAVED
	readAllIDs: function(callback){
		$.post(
		    'parser.php',
		    { iterations: ""},
		    function(dataPHP) {
		    	//console.log("PHP RUNNING!!!!!!!!!  " + JSON.stringify(dataPHP));
		    	dataFromPHP = dataPHP;
		    	callback(dataFromPHP, countSchedules); //saving data in directories counted from 0 to 3000
		    	//saveData(localStorage.getItem(i), dataFromPHP); //saving data in directories named by ID of schedule
		    },
		    'json'
		);
	},
		
	// SAVING BASIC DATA IN DATABASE (IDS OF SCHEDULES)
	saveFirstData: function(dataFromPHP, callback){
		var basicRef = ref.child("all");
		basicRef.set(dataFromPHP);
		callback(getIDs);
	},

    // SAVING DATA IN DATABASE (SCHEDULES)
	saveData: function (i, dataFromPHP){
		var multiRef = ref.child("schedules/" + i);
		multiRef.set(dataFromPHP);
	},

	// SAVING ADDITIONAL DATA ABOUT ACTUALIZATION
	saveAdditionalInfo: function(){
		// variables containing date of actualization and number of schedules stored
		var dateRef = ref.child("dateOfActualization");
		var schedulesNumRef = ref.child("numberOfRows");
		var date = new Date();
		var dateInString = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear() + "r.";
		//saving to database
		dateRef.set(dateInString);
		schedulesNumRef.set(countRows);
	},

	// COUNTING SCHEDULES IN DATABASE
	//counting rows in order to know how many schedules and ids are stored (id numbers are needed to access all schedules)
	countSchedules: function(callback) {
		ref.child("all/zasob/").on("child_added", function(snap) {
		  	countRows++;
		  	console.log("added", snap.key());
		});
		// length will always equal count, since snap.val() will include every child_added event
		ref.child("all/zasob/").once("value", function(snap) {
		  	console.log("initial data loaded!", Object.keys(snap.val()).length === countRows);
		  	console.log("rows number", countRows);
		  	console.log("Snap length", Object.keys(snap.val()).length);
		});
		callback(runParserAll);
	},
	
	// RETRIVING DATA (IDs) FROM DATABASE
	getIDs: function(callback){
		for (i = 0; i < countRows; i++) {
			ref.child("all/zasob/" + i + "/@attributes/id").on("value", function(snapshot) {
			  	//localStorage.setItem(i, snapshot.val());
			  	tblId[i] = snapshot.val();
			  	//console.log(snapshot.val());
			}, function (errorObject) {
			  	console.log("The read failed: " + errorObject.code);
			});
		}
		runParserAll();
	},

	// RUNNING PHP PARSER
	runParserAll: function(){
		var i = 0;
		$.each(tblId,function(i){
      		
	        console.log("FOR RUNNING!!!!!!!!!  " + i);
	        var dataFromPHP;
			$.post(
			    'parser.php',
			    { iterations: tblId[i]},
			    function(dataPHP) {
			    	//console.log("PHP RUNNING!!!!!!!!!  " + i + "    " + JSON.stringify(dataPHP));
			    	dataFromPHP = dataPHP;
			    	//saveData(i, dataFromPHP); //saving data in directories counted from 0 to 3000
			    	saveData(tblId[i], dataFromPHP); //saving data in directories named by ID of schedule
			    },
			    'json'
			);
			//console.log("PHP data from " + JSON.stringify(dataFromPHP));
			saveAdditionalInfo();

		});	
	}


}