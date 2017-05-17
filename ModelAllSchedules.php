
<!DOCTYPE html>
<html>
	<head>
		<title>Scheduler UEK</title>
		<meta charset="UTF-8">
		<script src="jquery-3.1.1.min.js"></script>
		<script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
	</head>
	<body>
		<h1>Mój plan zajęć</h1>
		<p id="paragraf"></p>
		<button id="przycisk">Wyswietl dane</button>
		<button onclick="saveData()">Zapisz dane do bazy</button>
		<button onclick="countSchedules()">Zlicz dane w bazie</button>
		<button onclick="printData()">Odtwórz numery id w konsoli</button>
		

		<!--Parsing one xml file to json-->
		<?php
			$fileContents= file_get_contents("http://planzajec.uek.krakow.pl/index.php?typ=G&id=&okres=1&xml");
	        $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
	        $fileContents = trim(str_replace('"', "'", $fileContents));
	        $simpleXml = simplexml_load_string($fileContents);
	        $json = json_encode($simpleXml);
	        echo $json;
		?>
		
		
		
		<script>
			// SAVING DATA IN DATABASE
			// var containing json file
			var data =<?php echo $json; ?>;
			// initializing database
			var ref = new Firebase("https://projekt1-4d649.firebaseio.com/web/saving-data/fireblog");
			var usersRef = ref.child("all");
			// saving data to database
			function saveData(){
				usersRef.set(data);
			}

			// SAVING IN LOCAL STORAGE AND PRINTING ON SCRREEN
			// compresing string before storing in localStorage    
			localStorage.setItem('dataString', JSON.stringify(data));
			// decompresing item in localStorage
			var string = localStorage.getItem('dataString');
			// running function onclick (jquery)
			$(document).ready(function() {
				$("#przycisk").click(function(event){
					$("#paragraf").text(string);
				});
			});

			// COUNTING DATA IN DATABASE
			//counting rows in order to know how many schedules and ids are stored (id numbers are needed to access all schedules)
			var countRows = 0;
			function countSchedules() {
				ref.child("all/zasob/").on("child_added", function(snap) {
				  countRows++;
				  console.log("added", snap.key());
				});
				// length will always equal count, since snap.val() will include every child_added event
				ref.child("all/zasob/").once("value", function(snap) {
				  console.log("initial data loaded!", Object.keys(snap.val()).length === countRows);
				  console.log("rows number", countRows);
				  console.log("Snap length", Object.keys(snap.val()).length)
				});
			}
			
			// PRINTING DATA FROM DATABASE
			function printData() {
				// Attach an asynchronous callback to read the data at our posts reference
				for (i = 0; i < countRows; i++) {
					ref.child("all/zasob/" + i + "/@attributes/id").on("value", function(snapshot) {
					  console.log(snapshot.val());
					}, function (errorObject) {
					  console.log("The read failed: " + errorObject.code);
					});
				}
			}
			
		</script>
	</body>
</html>



