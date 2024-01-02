

$(document).ready(function() {
  // Asociativní pole s atributama
  // let filter = [
  //   {
  //     key: '139861',
  //     value: 'Nazev1'
  //   },
  //   {
  //     key: '139838',
  //     value: 'Nazev2'
  //   }
  // ];


  // RADIO BUTTON (Rychle)
  $("input[name='radio_detailni_sazby'][value='Rychlé']").click(() => {
    console.log("CLICK_kratke_sazby");
    try {
      $("input[name='radio_detailni_sazby'][value='Detailní']").click();
      module.activeView.saveAllTemplates().then((data) => {
        setTimeout(() => {
          $("input[name='radio_detailni_sazby'][value='Rychlé']").prop("checked", true);;
          $("input[name='radio_detailni_sazby']").trigger("change");
          ApiMyclaim.updateShortRateForm(1);

          if ( module.activeView.data.claim.vehicle ) {
            ApiMyclaim.getGarageRules().then((rules) => {
              ApiMyclaim.populateVyberSazeb(rules);    
            }).catch((error) => {
              console.log(error);
            });
          }
        }, 100);
      })
    } catch (error) {
      console.log(error);
    }
  })

  // SAZBY CLICK
  $("a[href='#tab-activityRelatedSelection']").click(() => {
  
      try {
        if ($("input[name='radio_detailni_sazby']").val() == "Rychlé"){
          ApiMyclaim.updateShortRateForm(1);

          if ( module.activeView.data.claim.vehicle ) {
            ApiMyclaim.getGarageRules().then((rules) => {
              ApiMyclaim.populateVyberSazeb(rules);    
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      } catch (error) {
        console.log(error);
      }

  })

  // Hlaska o tom, ze druh laku byl vybran podle VIN identifikace
  $("#customField-input-sazby_druh_laku").change(() => {
    console.log("CHANGE_DRUH_LAKOVANI");

    $select = $("#customField-input-sazby_druh_laku");
    $option = $("#customField-input-sazby_druh_laku option:selected");
    try {
      
      if ( $option.attr("id") == "hastypevin" ) {
        if ( !$("#hintTypeFromVin").length ) {
          $select.after("<label id='hintTypeFromVin' style='position: absolute;'><i class='fas fa-check' style='color:#348feb'></i> Druh laku byl přednastaven na základě informací výrobce získaných prostřednictvím VIN dotazu.<br>Zkontrolujte prosím druh laku.</label>")
        }
      } else {
        $("#hintTypeFromVin").remove();
      }
    } catch (error) {
      console.log(error);
    }
  })

  // Mechanik
  $("#customField-input-sazba_mechanik").change(() => {
    ApiMyclaim.setRateAttributes({ LabourCostFactor_mechanicWage1: parseFloat($("#customField-input-sazba_mechanik").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })

  // Karosář
  $("#customField-input-sazba_karosar").change(() => {
    ApiMyclaim.setRateAttributes({ LabourCostFactor_bodyWage1: parseFloat($("#customField-input-sazba_karosar").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })

  // Elektrikář
  $("#customField-input-sazba_elektrikar").change(() => {
    ApiMyclaim.setRateAttributes({ LabourCostFactor_electricWage1: parseFloat($("#customField-input-sazba_elektrikar").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })

  // Lakýrník
  $("#customField-input-sazba_lakyrnik").change(() => {
    const lf = $("#customField-input-sazby_metoda_lakovani").val();

    if ( lf == "AZT" ) {
      ApiMyclaim.setRateAttributes({ AztLacquerFactor_wage: parseFloat($("#customField-input-sazba_lakyrnik").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Lakování dle výrobce" ) {
      ApiMyclaim.setRateAttributes({ ManufacturerLacquerFactor_wage: parseFloat($("#customField-input-sazba_lakyrnik").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Eurolack" ) {
      ApiMyclaim.setRateAttributes({ EuroLacquerFactor_wage: parseFloat($("#customField-input-sazba_lakyrnik").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    }

  })

  // Metoda lakování
  $("#customField-input-sazby_metoda_lakovani").change(() => {
    const lf = $("#customField-input-sazby_metoda_lakovani").val();

    if ( lf == "AZT" ) {
      ApiMyclaim.setRateAttributes({
        CalculationFactor_selectedLacquerMethod: 5,
        AztLacquerFactor_wage: parseFloat($("#customField-input-sazba_lakyrnik").val().replace(/\s/g, "").replace(",", ".")),
        AztLacquerFactor_discountWage: parseFloat($("#customField-input-sazba_sleva_lakovani").val().replace(/\s/g, "").replace(",", "."))
      }).then((data) => {
        setTimeout(() => {
          ApiMyclaim.updateShortRateForm(1);
        }, 150);
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Lakování dle výrobce" ) {
      ApiMyclaim.setRateAttributes({
        CalculationFactor_selectedLacquerMethod: 2,
        ManufacturerLacquerFactor_wage: parseFloat($("#customField-input-sazba_lakyrnik").val().replace(/\s/g, "").replace(",", ".")),
        ManufacturerLacquerFactor_discountWage: parseFloat($("#customField-input-sazba_sleva_lakovani").val().replace(/\s/g, "").replace(",", "."))
      }).then((data) => {
        setTimeout(() => {
          ApiMyclaim.updateShortRateForm(1);
        }, 150);
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Eurolack" ) {
      ApiMyclaim.setRateAttributes({
        CalculationFactor_selectedLacquerMethod: 1,
        EuroLacquerFactor_wage: parseFloat($("#customField-input-sazba_lakyrnik").val().replace(/\s/g, "").replace(",", ".")),
        EuroLacquerFactor_discountWage: parseFloat($("#customField-input-sazba_sleva_lakovani").val().replace(/\s/g, "").replace(",", "."))
      }).then((data) => {
        setTimeout(() => {
          ApiMyclaim.updateShortRateForm(1);
        }, 150);
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);

      })
    }

  })

  // Druh laku
  $("#customField-input-sazby_druh_laku").change(() => {
    const lf = $("#customField-input-sazby_metoda_lakovani").val();

    if ( lf == "AZT" ) {
      ApiMyclaim.setRateAttributes({ AztLacquerFactor_type: $("#customField-input-sazby_druh_laku").val() }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Lakování dle výrobce" ) {
      ApiMyclaim.setRateAttributes({ ManufacturerLacquerFactor_type: $("#customField-input-sazby_druh_laku").val() }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Eurolack" ) {

      if ( $("#customField-input-sazby_eurolak_material").val() ) { // jestli je vybrana cenova katerorie

        // Dostat cenu pro vybranou cen. kat.
        ApiMyclaim.getMaterialCategoryPrice(
          $("#customField-input-sazby_druh_laku").val(),
          $("#customField-input-sazby_eurolak_material").val(),
          $("#customField-input-sazby_eurolak_material option:selected").text()
        ).then((price) => {
          ApiMyclaim.setRateAttributes({
            EuroLacquerFactor_type: $("#customField-input-sazby_druh_laku").val(),
            EuroLacquerFactor_materialPriceCategory: parseInt($("#customField-input-sazby_eurolak_material").val()),
            EuroLacquerFactor_materialPerPointCost: parseFloat(price.replace(/\s/g, "").replace(",", "."))
          }).then((data) => {
            // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
          })
        })

      } else { // jestli cenova kategorie neni vybrana

        ApiMyclaim.setRateAttributes({ EuroLacquerFactor_type: $("#customField-input-sazby_druh_laku").val() }).then((data) => {
          // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
        })

      }

    }

  })

  // Materiálový index
  $("#customField-input-sazby_azt_materialovy_index").change(() => {
    ApiMyclaim.setRateAttributes({ AztLacquerFactor_materialIndex: parseFloat($("#customField-input-sazby_azt_materialovy_index").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })
  
  // Cenová kategorie materiálu
  $("#customField-input-sazby_eurolak_material").change(() => {

    // Jestli neni vybran druh laku anebo cenova kategorie
    if ( !( $("#customField-input-sazby_druh_laku").val() && $("#customField-input-sazby_eurolak_material").val() ) )
      return;

    ApiMyclaim.getMaterialCategoryPrice(
      $("#customField-input-sazby_druh_laku").val(),
      $("#customField-input-sazby_eurolak_material").val(),
      $("#customField-input-sazby_eurolak_material option:selected").text()
    ).then((price) => {
      ApiMyclaim.setRateAttributes({
        EuroLacquerFactor_materialPriceCategory: parseInt($("#customField-input-sazby_eurolak_material").val()),
        EuroLacquerFactor_materialPerPointCost: parseFloat(price.replace(/\s/g, "").replace(",", "."))
      }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    })

  })

  // Drobný materiál
  $("#customField-input-sazba_prirazka_srazka_djm").change(() => {
    ApiMyclaim.setRateAttributes({ SparePartFactor_smallSparePartPercentOfPart: parseFloat($("#customField-input-sazba_prirazka_srazka_djm").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })

  // Přirážka / srážka na ND (+/- %)
  $("#customField-input-sazba_prirazka_srazka").change(() => {
    ApiMyclaim.setRateAttributes({ SparePartFactor_increaseDecrease: parseFloat($("#customField-input-sazba_prirazka_srazka").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })

  // Sleva na ND (%)
  $("#customField-input-sazba_sleva_nd").change(() => {
    ApiMyclaim.setRateAttributes({ SparePartFactor_discount: parseFloat($("#customField-input-sazba_sleva_nd").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })

  // Sleva na práci (%)
  $("#customField-input-sazba_sleva_prace").change(() => {
    ApiMyclaim.setRateAttributes({ LabourCostFactor_discount: parseFloat($("#customField-input-sazba_sleva_prace").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })

  // Sleva na lakování (%)
  $("#customField-input-sazba_sleva_lakovani").change(() => {
    const lf = $("#customField-input-sazby_metoda_lakovani").val();

    if ( lf == "AZT" ) {
      ApiMyclaim.setRateAttributes({ AztLacquerFactor_discountWage: parseFloat($("#customField-input-sazba_sleva_lakovani").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Lakování dle výrobce" ) {
      ApiMyclaim.setRateAttributes({ ManufacturerLacquerFactor_discountWage: parseFloat($("#customField-input-sazba_sleva_lakovani").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    } else if ( lf == "Eurolack" ) {
      ApiMyclaim.setRateAttributes({ EuroLacquerFactor_discountWage: parseFloat($("#customField-input-sazba_sleva_lakovani").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
        // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
      })
    }

  })

  // Sleva celkem (%)
  $("#customField-input-sazba_sleva_celkem").change(() => {
    ApiMyclaim.setRateAttributes({ CalculationFactor_discount: parseFloat($("#customField-input-sazba_sleva_celkem").val().replace(/\s/g, "").replace(",", ".")) }).then((data) => {
      // $('#activityRelatedSelection iframe').contents()[0].location.reload(true);
    })
  })



})
