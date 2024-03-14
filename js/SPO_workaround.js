// Create a callback
const spo_observe_callback = (mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
      if (mutation.addedNodes[0].id == "sparePartsTable") {
        console.log("Bylo kliknuto na díl a otevřel se dialog");

        setTimeout(function () {
          let button = '<button type="button" class="ui-button ui-corner-all ui-widget" id="spo-btn-loadHistory">Nahraj poslední výběr</burron>';
          $('div[aria-describedby="dialogSPOParts"] .ui-dialog-buttonset').prepend(button);

          setTimeout(() => {
            $('#spo-btn-loadHistory').click(function() {
              loadHistory();
            })
          }, 250);

        }, 250);
      }
    }
  });
}


// Get SPO DIALOG
var spodialog = $("#dialogSPOParts").contents();

// Watch SPO dialog
var spo_observe = new MutationObserver(spo_observe_callback);

spodialog.each(function () {
  spo_observe.observe(this, { childList: true });
});

// HELPER
// @discount = percent or discount (surcharge / deduction); Integer
const changeOemPrice = async (discount) => {
  $("#sparePartsTable tr.spoOE").each(function () {
    var this_row = $(this);

    // Load OEM price with discount to column Quality
    this_row
      .find(".field-quality")
      .html(this_row.find(".field-price.Currency").html());

    // parse to float
    oem_price = getCleanPrice(this_row);
    oldOem_price = oem_price;

    // increas about discount
    oem_price = ((oem_price / (100 - discount)) * 100).toFixed(2);

    this_row
      .find(".field-price.Currency")
      .html(parseFloat(oem_price).toLocaleString("cz"));
    console.log(
      parseFloat(oldOem_price).toLocaleString("cz") +
        " => " +
        parseFloat(oem_price).toLocaleString("cz")
    );
  });
}

// LOGIC
// upLimit = compare OEM and AFT price minimum difference in %
// downLimit = compare OEM and AFT price maximum difference in %
// již není třeba protože od 05.2023 DAT PL srovnalo chování automatického SPO a SPO přes tlačítko
// základ pravidla se počítá z OEM - <přirážka srážka>
const spoRules = (upLimit, downLimit) => {
  var OEM_price = 0;
  var clicked = 0;
  var srazka = $("#customField-input-sazba_prirazka_srazka").val();
  // change header description for column Quality
  $("#sparePartsTable thead th.field-quality .title").html(srazka + "%");

  // umožní nakliknout tento díl
  $("#sparePartsTable tbody tr").removeClass("suppressed");

  $("#sparePartsTable tbody tr").each(function () {
    var this_row = $(this);
    // Zkontroluju jestli je OEM / AFT
    // pokud oem nahraju do OEM_PRICE
    if (this_row[0].classList.contains("spoOE")) {
      OEM_price = getCleanPrice(this_row);
      clicked = 0;
      this_row.click();
      console.log("Měním OEM price " + OEM_price);
    } else {
      // Pokud ne spustím logiku porovnání ceny OEM a AFTERMARKETU
      let AFT_price = getCleanPrice(this_row);

      var OEM_30prc = (OEM_price / 100) * upLimit;
      var OEM_80prc = ((OEM_price - OEM_30prc) / 100) * 80;
      console.log("Základ pro výpočet 80%: " + (OEM_price - OEM_30prc));
      var diff = OEM_price - AFT_price;
      var diff2 = OEM_price - OEM_30prc - AFT_price;

      var status = "";

      if (diff <= 0) {
        status = "Nelze vybrat - AFT musí být levnější jak OEM";
        this_row.addClass("suppressed");
      } else if (diff2 >= OEM_80prc) {
        status =
          "Nelze vybrat - Neodpovídá podmínce 80%: " + diff2 + ">=" + OEM_80prc;
        this_row.addClass("suppressed");
      } else if (diff > OEM_30prc && diff2 < OEM_80prc) {
        status = "Lze vybrat - Odpovídá podmínce 30%";
        this_row.find(".suppressed.iconNG.far").remove(); // remove the limit icon

        if (clicked == 0) {
          this_row.click(); // select AFT spare part
          clicked = 1;
        }
      } else {
        status = "Nelze vybrat neodpovídá žádné podmínce";
        this_row.addClass("suppressed");
      }

      console.log(OEM_price + " / " + AFT_price + " : " + status);
    }
  });
};

// HELPER
// @price = clean string to number;
const getCleanPrice = (element) => {
  return parseFloat(
    $.trim(
      element
        .find(".field-price.Currency")
        .html()
        .replace(/\&nbsp;/g, "") // replace ampersand
        .replace(/\./g, "") // replace all separators
        .replace(/,/, ".") // replace comma with dot
    )
  ).toFixed(2);
}

// @elementId = id of memo where JSON data of history are placed
const loadHistory = (elementId = "#customField-input-SPO_last_selection") => {
  try {
    var jsondData = JSON.parse($(elementId).val());
  } catch (error) {
    console.log("Vstupní data jsou NULL nebo nejsou ve formátu JSON")
    return;
  }


  jsondData.forEach(el => {

    if(el.spNumber !== null) {
        //let row = $('.field-partNo:contains("' + el.spNumber + '")').parent();

        let row = $('.field-partNo').filter(function() {
          return $(this).text() === el.spNumber;
        });

        row = row.parent();
        let rowChecked = row.find('input[type=radio]').is(':checked');

        // row.children('.field-radio').is(':checked')

        let rowSpNum = row.find('.field-partNo').html();
        let rowPrice = row.find('.field-price').html().replace(/&nbsp;/g, ''); //change string to valid format
        rowPrice = parseFloat(rowPrice.replace(',','.')); //change string to valid format

        // Diagnostic output
        console.log('Hledaný výraz: ' + el.spNumber + ' --------------------' );
        console.log('byl nalezena stejná cena? ' + rowPrice + ' / ' + el.unitPrice);
        console.log('byl nalezena stejné č.dílu? ' + rowSpNum + ' / ' + el.spNumber);

        if( !rowChecked && rowPrice == el.unitPrice && rowSpNum == el.spNumber) {
          row.click();
          row.attr('style','background-color: yellow!important');
        }
    }

    
    //$('.field-partNo:contains("QP SA-FAB-14-2952L")').click()
  });
}


//HELPER

