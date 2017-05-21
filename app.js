"Access-Control-Allow-Origin", "*"

"Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"

"Access-Control-Allow-Headers", "Content-Type, Accept"

var app = angular
	.module("myModule", [])
	.controller("myController", function($scope){

        var scheduleData;
        var myList;
        var scheduleName;
        $scope.text = 'KrDZIs3012Io';
        // counter of rows (schedules' IDs) in database
        var countRows = 0;
        // array with schedules' IDs
        var tblId = [];

        $scope.showSchedule = function() {
            console.log(scheduleData + "FROM \"Pokaż\"");
            var obj = JSON.parse(scheduleData);
            console.log(obj.zajecia[1].nauczyciel + " " + obj.zajecia[1].przedmiot);
            myList = obj.zajecia;
            //$scope.scheduleTable = scheduleData;
            //$scope.myVar=1;
            $scope.myList = myList;

        }


        getSchedule = function (scheduleName) {
            
            if (localStorage.getItem(scheduleName) == null) {
                    window.alert("Searching in database...\nIt may take few seconds");
                    console.log("Searching in database...");
                    ref.child('schedules').orderByChild('@attributes/nazwa').equalTo(scheduleName).on('child_added',  function(snapshot) {
                    scheduleData = JSON.stringify(snapshot.val());
                    console.log(scheduleData);
                    window.alert("Now you can click \"Pokaż\"");
                    var obj = JSON.parse(scheduleData);
                    console.log(obj.zajecia[1].nauczyciel + " " + obj.zajecia[1].przedmiot);
                    myList = obj.zajecia;
                    return JSON.stringify(scheduleData);
                });
            } else {
                scheduleData = localStorage.getItem(scheduleName);
                console.log("LOCAL: " + scheduleData);
                window.alert("Now you can click \"Pokaż\"");
                return JSON.stringify(scheduleData);
            }
            //$scope.scheduleData = JSON.stringify(scheduleData);
            //return JSON.stringify(scheduleData);    
        }


        
        $scope.submit = function() {
            if ($scope.text) {
                getSchedule(this.text);
                $scope.scheduleName = this.text;
                scheduleName = this.text;
                $scope.text = '';
            }
      }

      

        $scope.addScheduleToFavourite = function (){
            var scheduleToAdded = scheduleName;
            ref.child('schedules').orderByChild('@attributes/nazwa').equalTo(scheduleToAdded).on('child_added',  function(snapshot) {
                console.log(JSON.stringify(snapshot.val()));
                localStorage.setItem(scheduleToAdded, JSON.stringify(snapshot.val()));
            });
        }


        $scope.search = function(item) {
            if ($scope.searchText == undefined){
                return true; //if anything is written in the text box, then it will show every row
            } else if (item.nauczyciel == undefined){
                if (item.przedmiot.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                    return true;
                }
            } else if (item.przedmiot == undefined){
                if (item.nauczyciel.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                    return true;
                }
            } else {
                if (item.nauczyciel.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 || item.przedmiot.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                    return true;
                }
            }
            return false;
        }


        // RUNNING PROCESS OF SAVING ALL DATA TO DATABASE USING CALLBACK FUNCTIONS TO KEEP ADEQUATE SEQUENCE
    $scope.runActualization = function(){
        readAllIDs(saveFirstData);
    }


    // READING ALL DATA WITH IDS OF SCHEDULES WHICH IS TO BE SAVED
    readAllIDs = function(callback){
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
    saveFirstData = function(dataFromPHP, callback){
        var basicRef = ref.child("all");
        basicRef.set(dataFromPHP);
        callback(getIDs);
    }

    // SAVING DATA IN DATABASE (SCHEDULES)
    saveData = function (i, dataFromPHP){
        var multiRef = ref.child("schedules/" + i);
        multiRef.set(dataFromPHP);
    }

    // SAVING ADDITIONAL DATA ABOUT ACTUALIZATION
    saveAdditionalInfo = function(){
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
    countSchedules = function(callback) {
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
    getIDs = function(callback){
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
    runParserAll = function(){
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

    // RETRIVING DATE OF LAST ACTUAZLIZATION FROM DATABASE
    $scope.getDateOfActualization = function(){
        
        ref.child("dateOfActualization").on("value", function(snapshot) {
            //localStorage.setItem(i, snapshot.val());
            var datum = snapshot.val();
            $scope.dateOfActualization = datum; 
            $scope.$apply();
            window.alert("Ostatnia aktualizcja była " + datum);
            //console.log(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    
        
    }
    //getDateOfActualization();


});