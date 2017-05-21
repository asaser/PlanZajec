var app = angular
	.module("myModule", [])
	.controller("myController", function($scope){

		var myList = [
        {
            "do-godz": "14:45",
            "dzien": "Pn",
            "nauczyciel": {
                "content": "mgr Paweł Prysak",
                "moodle": -525
            },
            "od-godz": "13:05",
            "przedmiot": "Analiza matematyczna i algebra liniowa",
            "sala": "Paw.F 415",
            "termin": "2017-05-22",
            "typ": "ćwiczenia",
            "uwagi": "powtarzanie przedmiotu 40 g"
        },
        {
            "do-godz": "20:35",
            "dzien": "Pn",
            "nauczyciel": {
                "content": "prof. UEK Paweł Wołoszyn",
                "moodle": -1045
            },
            "od-godz": "18:10",
            "przedmiot": "Pracownia programowanie",
            "sala": "Paw.A 115 lab. Win8, Office03",
            "termin": "2017-05-22",
            "typ": "Wstępna rezerwacja",
            "uwagi": "powtarzanie przedmiotu"
        },
        {
            "do-godz": "09:30",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Alicja Szczygieł",
                "moodle": -490
            },
            "od-godz": "08:45",
            "przedmiot": "Psychologia",
            "sala": "Paw.S sala 2",
            "termin": "2017-05-23",
            "typ": "wykład"
        },
        {
            "do-godz": "11:15",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Alicja Szczygieł",
                "moodle": -490
            },
            "od-godz": "09:35",
            "przedmiot": "Psychologia",
            "sala": "Paw.S sala 2",
            "termin": "2017-05-23",
            "typ": "wykład"
        },
        {
            "do-godz": "13:00",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Anna Pietruszka-Ortyl",
                "moodle": -1077
            },
            "od-godz": "11:20",
            "przedmiot": "Etykieta menedżera",
            "sala": "Paw.E sala H",
            "termin": "2017-05-23",
            "typ": "wykład do wyboru"
        },
        {
            "do-godz": "18:05",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Janusz Stal",
                "moodle": -218
            },
            "od-godz": "16:30",
            "przedmiot": "Programowanie aplikacji webowych SPA",
            "sala": "Paw.A 116 lab. Win8, Office03",
            "termin": "2017-05-23",
            "typ": "wykład do wyboru"
        },
        {
            "do-godz": "19:45",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Janusz Stal",
                "moodle": -218
            },
            "od-godz": "18:10",
            "przedmiot": "Usługi cloud computing dla przedsiębiorstw",
            "sala": "Paw.A 116 lab. Win8, Office03",
            "termin": "2017-05-23",
            "typ": "wykład do wyboru"
        },
        {
            "do-godz": "13:00",
            "dzien": "Śr",
            "nauczyciel": {
                "content": "prof. UEK Paweł Wołoszyn",
                "moodle": -1045
            },
            "od-godz": "09:35",
            "przedmiot": "Pracownia programowanie",
            "sala": "Paw.A 07 lab. Vista,Office07",
            "termin": "2017-05-24",
            "typ": "Wstępna rezerwacja",
            "uwagi": "powtarzanie przedmiotu"
        },
        {
            "do-godz": "11:15",
            "dzien": "Cz",
            "nauczyciel": {
                "content": "dr Bernard Bińczycki",
                "moodle": -928
            },
            "od-godz": "09:35",
            "przedmiot": "BHP i ergonomia",
            "sala": "30 koło kortów",
            "termin": "2017-05-25",
            "typ": "wykład"
        },
        {
            "do-godz": "11:15",
            "dzien": "Pt",
            "nauczyciel": {
                "content": "dr inż. Tadeusz Wilusz",
                "moodle": -1041
            },
            "od-godz": "09:35",
            "przedmiot": "Sieci komputerowe",
            "sala": "Paw.A 115 lab. Win8, Office03",
            "termin": "2017-05-26",
            "typ": "ćwiczenia",
            "uwagi": "powtarzanie przedmiotu 1 gr."
        },
        {
            "do-godz": "14:45",
            "dzien": "Pn",
            "nauczyciel": {
                "content": "mgr Paweł Prysak",
                "moodle": -525
            },
            "od-godz": "13:05",
            "przedmiot": "Analiza matematyczna i algebra liniowa",
            "sala": "Paw.F 415",
            "termin": "2017-05-29",
            "typ": "ćwiczenia",
            "uwagi": "powtarzanie przedmiotu 40 g"
        },
        {
            "do-godz": "18:05",
            "dzien": "Pn",
            "nauczyciel": {
                "content": "dr inż. Tadeusz Wilusz",
                "moodle": -1041
            },
            "od-godz": "16:30",
            "przedmiot": "Sieci komputerowe",
            "sala": "Paw.A 115 lab. Win8, Office03",
            "termin": "2017-05-29",
            "typ": "ćwiczenia",
            "uwagi": "powtarzanie przedmiotu 1 gr."
        },
        {
            "do-godz": "20:35",
            "dzien": "Pn",
            "nauczyciel": {
                "content": "prof. UEK Paweł Wołoszyn",
                "moodle": -1045
            },
            "od-godz": "18:10",
            "przedmiot": "Pracownia programowanie",
            "sala": "Paw.A 115 lab. Win8, Office03",
            "termin": "2017-05-29",
            "typ": "Wstępna rezerwacja",
            "uwagi": "powtarzanie przedmiotu"
        },
        {
            "do-godz": "12:05",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Anna Pietruszka-Ortyl",
                "moodle": -1077
            },
            "od-godz": "11:20",
            "przedmiot": "Etykieta menedżera",
            "sala": "Paw.E sala H",
            "termin": "2017-05-30",
            "typ": "wykład do wyboru"
        },
        {
            "do-godz": "16:25",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Janusz Stal",
                "moodle": -218
            },
            "od-godz": "14:50",
            "przedmiot": "Programowanie systemów mobilnych",
            "sala": "Bud.gł. Stara Aula",
            "termin": "2017-05-30",
            "typ": "wykład"
        },
        {
            "do-godz": "17:15",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Janusz Stal",
                "moodle": -218
            },
            "od-godz": "16:30",
            "przedmiot": "Programowanie aplikacji webowych SPA",
            "sala": "Paw.A 116 lab. Win8, Office03",
            "termin": "2017-05-30",
            "typ": "wykład do wyboru"
        },
        {
            "do-godz": "18:55",
            "dzien": "Wt",
            "nauczyciel": {
                "content": "dr Janusz Stal",
                "moodle": -218
            },
            "od-godz": "18:10",
            "przedmiot": "Usługi cloud computing dla przedsiębiorstw",
            "sala": "Paw.A 116 lab. Win8, Office03",
            "termin": "2017-05-30",
            "typ": "wykład do wyboru"
        },
        {
            "do-godz": "13:00",
            "dzien": "Śr",
            "nauczyciel": {
                "content": "dr inż. Tadeusz Wilusz",
                "moodle": -1041
            },
            "od-godz": "11:20",
            "przedmiot": "Programowanie systemów rozproszonych",
            "sala": "Bibl. 443",
            "termin": "2017-05-31",
            "typ": "wykład"
        },
        {
            "do-godz": "20:35",
            "dzien": "Śr",
            "nauczyciel": {
                "content": "dr Marek Rawski",
                "moodle": -910
            },
            "od-godz": "18:10",
            "przedmiot": "",
            "sala": "Paw.C sala F",
            "termin": "2017-05-31",
            "typ": "egzamin"
        },
        {
            "do-godz": "10:20",
            "dzien": "Cz",
            "nauczyciel": {
                "content": "dr Bernard Bińczycki",
                "moodle": -928
            },
            "od-godz": "09:35",
            "przedmiot": "BHP i ergonomia",
            "sala": "Bibl. 441",
            "termin": "2017-06-01",
            "typ": "wykład"
        },
        {
            "do-godz": "14:45",
            "dzien": "Pt",
            "nauczyciel": {
                "content": "prof. UEK dr hab. Piotr Soja",
                "moodle": -893
            },
            "od-godz": "11:20",
            "przedmiot": "",
            "sala": "Paw.A 115 lab. Win8, Office03",
            "termin": "2017-06-02",
            "typ": "egzamin"
        }
    ];

		$scope.myList = myList;
        

		$scope.search = function(item) {
			if ($scope.searchText == undefined){
				return true; //if anything is written in the text box, then it will show every row
			} else {
				if (item.nauczyciel.content.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 || item.przedmiot.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
					return true;
				}
			}
			return false;
		}
	});