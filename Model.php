
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
		<button onclick="saveData()">Zapisz dane</button>

		<!--Parsing one xml file to json-->
		<?php
			$fileContents= file_get_contents("http://planzajec.uek.krakow.pl/index.php?typ=G&id=116071&okres=1&xml");
	        $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
	        $fileContents = trim(str_replace('"', "'", $fileContents));
	        $simpleXml = simplexml_load_string($fileContents);
	        $json = json_encode($simpleXml);
	        //$json = str_replace(array(","), ",\n", $json);
	        echo $json;


			/*$xml = simplexml_load_string("plan.xml");
			$json = json_encode($xml);
			$array = json_decode($json,TRUE);
			echo array;*/
		?>
		
		
		
		<script>
			// SAVING DATA IN DATABASE
			// var containing json file
			var data =<?php echo $json; ?>;
			// initializing database
			var ref = new Firebase("https://projekt1-4d649.firebaseio.com/web/saving-data/fireblog");
			// saving data to database
			function saveData(){
				var usersRef = ref.child("scheduler5");
				usersRef.set(data);
			}


			// PRINTING DATA
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
						
		</script>
	</body>
</html>



