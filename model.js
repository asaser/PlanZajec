
<!DOCTYPE html>
<html>
	<head>
		<title>Scheduler UEK</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/javascript" href="Biblioteka Jquery"> 
		<script src="jquery-3.1.1.min.js"></script>
		<script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
	</head>
	<body>
		<h1>Mój plan zajęć</h1>
		<p id="paragraf"></p>

		<button onclick="runActualization()">Uruchom aktualizację bazy danych</button>
		<button onclick="getSchedule('KrDZIs3011Io')">Pokaż plan</button>
		<button onclick="addScheduleToFavourite('KrDZIs3012Io')">Dodaj do ulubionych</button>
		

		<script>


			// counter of rows (schedules' IDs) in database
			var countRows = 0;
			//var countFav = 0;
			// array with schedules' IDs
			var tblId = [];
			// initializing database
			var ref = new Firebase("https://projekt1-4d649.firebaseio.com/PlanZajec");
			var usersRef = ref.child("all");

			function getSchedule(scheduleName) {
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
			}


			function addScheduleToFavourite(scheduleName) {
				ref.child('schedules').orderByChild('@attributes/nazwa').equalTo(scheduleName).on('child_added',  function(snapshot) {
					console.log(JSON.stringify(snapshot.val()));
					localStorage.setItem(scheduleName, JSON.stringify(snapshot.val()));
					//countFaw++;
				});
			}

			function updateFavouriteSchedule(scheduleName) {
				ref.child('schedules').orderByChild('@attributes/nazwa').equalTo(scheduleName).on('child_added',  function(snapshot) {
					console.log(JSON.stringify(snapshot.val()));
					localStorage.setItem(scheduleName, JSON.stringify(snapshot.val()));
				});
			}


			// RUNNING PROCESS OF SAVING ALL DATA TO DATABASE USING CALLBACK FUNCTIONS TO KEEP ADEQUATE SEQUENCE
			function runActualization(){
				readAllIDs(saveFirstData);
			}

			// READING ALL DATA WITH IDS OF SCHEDULES WHICH IS TO BE SAVED
			function readAllIDs(callback){
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
			}
			
			// SAVING BASIC DATA IN DATABASE (IDS OF SCHEDULES)
			function saveFirstData(dataFromPHP, callback){
				usersRef.set(dataFromPHP);
				callback(getIDs);
			}

		    // SAVING DATA IN DATABASE (SCHEDULES)
			function saveData(i, dataFromPHP){
				var multiRef = ref.child("schedules/" + i);
				multiRef.set(dataFromPHP);
			}

			// SAVING ADDITIONAL DATA ABOUT ACTUALIZATION
			function saveAdditionalInfo(){
				// variables containing date of actualization and number of schedules stored
				var dateRef = ref.child("dateOfActualization");
				var schedulesNumRef = ref.child("numberOfRows");
				var date = new Date();
				var dateInString = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear() + "r.";
				//saving to database
				dateRef.set(dateInString);
				schedulesNumRef.set(countRows);
			}

			// COUNTING SCHEDULES IN DATABASE
			//counting rows in order to know how many schedules and ids are stored (id numbers are needed to access all schedules)
			function countSchedules(callback) {
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
			}
			
			// RETRIVING DATA (IDs) FROM DATABASE
			function getIDs(callback){
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
			}

			// RUNNING PHP PARSER
			function runParserAll(){
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



		</script>
	</body>
</html>



