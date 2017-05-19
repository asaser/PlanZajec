<?php
	$iterations = $_POST['iterations'];
	$fileContents= file_get_contents("http://planzajec.uek.krakow.pl/index.php?typ=G&id=$iterations&okres=1&xml");
    $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
    //$fileContents = trim(str_replace('"', "'", $fileContents));
    $simpleXml = simplexml_load_string($fileContents);
    $json = json_encode($simpleXml);
    echo $json;
?>