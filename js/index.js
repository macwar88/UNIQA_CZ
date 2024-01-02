$(document).ready(function () {
  setTimeout(function () {
    // Pridavani elementu <form> pro umozneni autofill-u v sekci Klient
    $(".client-container").before("<form id='client-form'></form>");
    $(".client-container").appendTo("#client-form");

    // logo DAT
    ApiMyclaim.logoDat();

    // přejmenuje tlačítko storno na Zpět
		$("#claim-back").html('Zpět');

    // kliknutí na SPO tlačítko
    ApiMyclaim.SPO();

    // Kliknutí na tlačítko print manager
    ApiMyclaim.printManagerBtn();

    // Zobrazit číslo případu v názvu záložky
    document.title = $("#customField-input-referenceNumber").val();

    // #############################################################################
    // ######### Tady nastavuju co se má dít po kliknutí na jednotlivé elementy šablony ########
    // #############################################################################
    // Pokud nebude pro tyto funkce nastaven timeout mohou se spusti v nesprávný čas.
    setTimeout(() => {}, 500);

    // -- stickyItem remove

    var removeStickyItem = setInterval(() => {
      if ($(".stickyItem").length == 1) {
        $(".stickyItem").removeClass("stickyItem");
        clearInterval(removeStickyItem);
      }
    }, 250);

    // nahraj zalozku kde naposledy skoncil uzivatel
    tabs = [
      "contractOpening",
      "klient",
      "identifikace",
      "vybava",
      "vozidlo",
      "thv",
      "activityRelatedSelection",
      "activityRelatedSelection2",
      "calculationPreview2",
      "zapis",
    ];

    // ApiMyclaim.tabMemory(tabs);

		// nahraje historii
	ApiMyclaim.listHistory();
	
	// Zobrazit help
	var vin = "Neznámý";

	if (module.activeView.data.claim.vehicle != null) {
		vin = module.activeView.data.claim.vehicle.vin;
	}
	
	if ($('#core-language').val()  == "sk_SK") {
		window.HELP_ITEMS = [
			{
				"name": "Zoznam podporovaných modelov",
				"process": "https://www.dat.de/sphinx/help/vehicleFiles/pdf/sk/FI_VehicleFiles.pdf",
				"type": "url"
			},
			{
				"name": "Manuál na obsluhu systému myClaim",
				"process": "https://www.dat.de/sphinx/help/pdf/cs/SilverDAT_myClaim_-_navod_k_obsluze_CZ.pdf",
				"type": "url"
			},
			{
				"name": "Manuál na obsluhu systému myClaim v síti UNIQA",
				"process": "https://www.myclaim.cz/UNIQA_CZ/UNIQA_CZ_pracovní_postup.pdf",
				"type": "url"
			},
			{
				"name": "Vzdialená podpora TeamViewer",
				"process": "https://www.dat.de/fileadmin/de/support/downloads/TeamViewerQS.exe",
				"type": "url"
			},
			{
				"name": "Poslať dotaz na zákaznícku podporu",
				"process": "https://www.dat-czech.eu/helpdesk/index.php?a=add&name=" + user.firstName + "+" + user.surname + "&email=" + user.email + "&custom1=" + vin + "&custom2=" + user.customerNumber,
				"type": "url"
			}
			]	
	} else {
		window.HELP_ITEMS = [
			{
				"name": "Seznam podporovaných modelů",
				"process": "https://www.dat.de/sphinx/help/vehicleFiles/pdf/cz/FI_VehicleFiles.pdf",
				"type": "url"
			},
			{
				"name": "Manuál k obsluze systému myClaim",
				"process": "https://www.dat.de/sphinx/help/pdf/cs/SilverDAT_myClaim_-_navod_k_obsluze_CZ.pdf",
				"type": "url"
			},
			{
				"name": "Manuál na obsluhu systému myClaim v síti UNIQA",
				"process": "https://www.myclaim.cz/UNIQA_CZ/UNIQA_CZ_pracovní_postup.pdf",
				"type": "url"
			},
			{
				"name": "Vzdálená podpora TeamViewer",
				"process": "https://www.dat.de/fileadmin/de/support/downloads/TeamViewerQS.exe",
				"type": "url"
			},
			{
				"name": "Poslat dotaz na zákaznickou podporu",
				"process": "https://www.dat-czech.eu/helpdesk/index.php?a=add&name=" + user.firstName + "+" + user.surname + "&email=" + user.email + "&custom1=" + vin + "&custom2=" + user.customerNumber,
				"type": "url"
			}
			]
	}

	// Klik na sazby - Logika výběru sazeb
	$( "a[href='#tab-activityRelatedSelection2']" ).click( function (event) {
		

		if (window.sazbyInterval) clearInterval(window.sazbyInterval);

		// udělat kontrolu aby se nenačítalo vícekrát
		window.sazbyInterval = setInterval(function() {
			console.log('Iterace');	

			if (module.activeView.data.claim.vehicle != null){
				if(module.activeView.data.claim.vehicle.productionDate !== null){
					// aktualizuju krátké sazby
					module.waitingOverlay(true);
					ApiMyclaim.getRateHtml().then(() => {
						// je to jako bych volal getRateData
						// -- Opravuje bug když provedu identifikaci přes VIN a nenačte se mi lakování do kalkulace VIN: VSSZZZ5FZER094863
						ApiMyclaim.setRateAttributes({"LabourCostFactor_dentsCountInProtocol": true}).then(() => {
							module.waitingOverlay(true);
							ApiMyclaim.updateShortRateForm(1).then(() => {
								module.waitingOverlay(false);
							});							
						});		
						module.waitingOverlay(false);		
					})
					clearInterval(window.sazbyInterval);
					return;								
				}			
			}
								
		}, 1000)

	});
	
	ApiMyclaim.showHelpDialogBtn();

  }, 250);
});

