
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
		<button onclick="countSchedules()">Zlicz dane w bazie</button>
		<button onclick="getIDs()">Zapisz id w pamięci lokalnej</button>
		<button onclick="runParserAll()">Uruchom parser wszystkich planów</button>
		<button onclick="saveData()">Zapisz dane do bazy</button>
		<button onclick="printData()">Odtwórz numery id w konsoli</button>
		<!--<button id="przycisk">Wyswietl dane</button>-->
		<!--<button onclick="xmlToJson()">Parsuj</button>-->
		
		

<!--Parsing one xml file with all schedules' IDs to json //not needed now
		<?php
			$fileContents= file_get_contents("http://planzajec.uek.krakow.pl/index.php?typ=G&id=&okres=1&xml");
	        $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
	        $fileContents = trim(str_replace('"', "'", $fileContents));
	        $simpleXml = simplexml_load_string($fileContents);
	        $json = json_encode($simpleXml);
	        echo $json;
		?>
-->
		
		<script>
			var dataFromPHP;
			var countRows = 0;
			// initializing database
			var ref = new Firebase("https://projekt1-4d649.firebaseio.com/web/saving-data/fireblog");
			var usersRef = ref.child("all2");

		    // SAVING DATA IN DATABASE
			function saveData(){
				usersRef.set(dataFromPHP);
			}

			// COUNTING SCHEDULES IN DATABASE
			//counting rows in order to know how many schedules and ids are stored (id numbers are needed to access all schedules)
			function countSchedules() {
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
			}
			

			// RETRIVING DATA (IDs) FROM DATABASE
			function getIDs(){
				//var tblId = [];
				//countSchedules();
				for (i = 0; i < countRows; i++) {
					ref.child("all/zasob/" + i + "/@attributes/id").on("value", function(snapshot) {
					  localStorage.setItem(i, snapshot.val());
					  //tblId[i] = snapshot.val();
					  //console.log(snapshot.val());
					}, function (errorObject) {
					  console.log("The read failed: " + errorObject.code);
					});
				}
				//return tblId;
			}

			// RUNNING PHP PARSER
			function runParserAll(){
				//countSchedules();
				//getIDs();
				$.post(
				    'parser.php',
				    { iterations: localStorage.getItem("21")},
				    function(dataPHP) {
				    	console.log("PHP running " + dataPHP);
				    	dataFromPHP = dataPHP;
				    },
				    'json'
				);
			}
/*
			// SAVING IN LOCAL STORAGE AND PRINTING ON SCRREEN //not needed now
			// var containing json file
			var data =<?php echo $json; ?>;
			// compresing string before storing in localStorage    
			localStorage.setItem('dataString', JSON.stringify(data));
			// decompresing item in localStorage
			var string = localStorage.getItem('dataString');
			// running function onclick (jquery)
			$(document).ready(function() {
				$("#przycisk").click(function(event){
					$("#paragraf").text(data);
				});
			});
*/		

/*
			// PRINTING DATA FROM DATABASE IN CONSOLE //not needed now
			function printData() {
				countSchedules();
				// Attach an asynchronous callback to read the data at our posts reference
				for (i = 0; i < countRows; i++) {
					ref.child("all/zasob/" + i + "/@attributes/id").on("value", function(snapshot) {
					  console.log(snapshot.val());
					}, function (errorObject) {
					  console.log("The read failed: " + errorObject.code);
					});
				}
			}
*/

/*
		//GETTING CONTENT FROM PAGE //not allowed access!!!
		function httpGet(theUrl){
		    if (window.XMLHttpRequest)
		    {// code for IE7+, Firefox, Chrome, Opera, Safari
		        xmlhttp=new XMLHttpRequest();
		    }
		    else
		    {// code for IE6, IE5
		        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		    }
		    xmlhttp.onreadystatechange=function()
		    {
		        if (xmlhttp.readyState==4 && xmlhttp.status==200)
		        {
		            return xmlhttp.responseText;
		        }
		    }
		    xmlhttp.open("GET", theUrl, false );
		    xmlhttp.send();
		    return xmlHttp.responseText;  
		}
*/
/*			//PARSING XML TO JSON //cannot attach xml file to variable
			function xmlToJson() {
	
				// Create the return object
				var obj = {};    
				var xml = httpGet("http://planzajec.uek.krakow.pl/index.php?typ=G&id=&okres=1&xml");

				if (xml.nodeType == 1) { // element
					// do attributes
					if (xml.attributes.length > 0) {
					obj["@attributes"] = {};
						for (var j = 0; j < xml.attributes.length; j++) {
							var attribute = xml.attributes.item(j);
							obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
						}
					}
				} else if (xml.nodeType == 3) { // text
					obj = xml.nodeValue;
				}

				// do children
				if (xml.hasChildNodes()) {
					for(var i = 0; i < xml.childNodes.length; i++) {
						var item = xml.childNodes.item(i);
						var nodeName = item.nodeName;
						if (typeof(obj[nodeName]) == "undefined") {
							obj[nodeName] = xmlToJson(item);
						} else {
							if (typeof(obj[nodeName].push) == "undefined") {
								var old = obj[nodeName];
								obj[nodeName] = [];
								obj[nodeName].push(old);
							}
							obj[nodeName].push(xmlToJson(item));
						}
					}
				}
				return obj;
			};
*/



		</script>
	</body>
</html>



