$(document).ready(function () {
  setTimeout(() => {
    $('a[href="#tab-graphicalPartSelection"]').click(function () {
      var intervalGrapa = setInterval(function () {
        console.log(
          "Hledám iframe " +
            $("iframe").contents().find("#graPaTitleAddPosBtn").length
        );

        if ($("iframe").contents().find("#graPaTitleAddPosBtn").length) {
          console.log("Otevřela se grapa načítám styly a JS");
          clearInterval(intervalGrapa);

          setTimeout(function () {
            const IF = $("iframe").contents();

            IF.find("head").append(
              styleConstruct(
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              )
            );
            IF.find("head").append(
              styleConstruct(
                "https://myclaim.cz/grapa_poj/gold/css/grapa_new_look.css"
              )
            );

            // Get the iframe body
            var IFBODY = IF.find("body");

            IF.find("#footer").remove();

            // Create a callback
            let callback = function (mutationsList) {
              mutationsList.forEach((mutation) => {
                //console.log('Mutation!', mutation);
                if (
                  mutation.type == "childList" &&
                  mutation.addedNodes.length > 0 &&
                  mutation.addedNodes[0].classList
                ) {
                  /* One or more children have been added to and/or removed
							 from the tree.
							 (See mutation.addedNodes and mutation.removedNodes.) */
                  if (
                    mutation.addedNodes[0].classList.contains(
                      "grapaMobileDialog"
                    ) &&
                    IF.find("#graPaExtSelRcPopup").length > 0
                  ) {
                    // add eye button for display hidden inputs
                    console.log("Dialog has been opened");
                    if (
                      IF.find(".grapaMobileDialog .showHiddenInputs").length ==
                      0
                    ) {
                      IF.find("[role=dialog] .ui-dialog-buttonpane").append(
                        '<button class="btnFlatDlg btnFlat48 showHiddenInputs"></button>'
                      );
                      IF.find(".showHiddenInputs").click(function () {
                        IF.find(
                          `#extSelworkExternalLacquerInfoRow,
					  #extSelUndercoatworkTypeRow,
					  #extSelUndercoatworkLevelRow,
					  #extSelUndercoatworkTimeTypeRow,
					  #extSelUndercoatdefaultWorkNumberRow,
					  #extSelUndercoatworkNumberRow,
					  #extSelUndercoatisManualNameRow,
					  #extSelCavitydefaultWorkNumberRow,
					  #extSelCavityworkNumberRow,
					  #extSelCavityisManualNameRow,
					  #extSelCavityworkTimeTypeRow,
					  #extSelCavityworkLevelRow,
					  #extSelCavityworkTypeRow,
					  #extSellacquerTimeTypeRow,
					  #extSellocationRow,
					  #extSelisExtensionPosRow,
					  #extSelisManualNameRow,
					  #extSelusedPartRow,
					  #extSelnewForOldRow,
					  #extSelworkExternalRow,
					  #extSelworkNumberRow,
					  #graPaExtSelOther,
					  #extSelworkLevelRow,
					  #extSelextensionTimeRow,
					  #extSelworkTypeRow,
					  #extSelworkTimeTypeRow,
					  #extSelpartialLacqueringRow,
					  #extSellacquerFinishRow`
                        ).show();

                        IF.find(
                          `#extSelworkExternalLacquerInfoRow,
					  #extSelUndercoatworkTypeRow,
					  #extSelUndercoatworkLevelRow,
					  #extSelUndercoatworkTimeTypeRow,
					  #extSelUndercoatdefaultWorkNumberRow,
					  #extSelUndercoatworkNumberRow,
					  #extSelUndercoatisManualNameRow,
					  #extSelCavitydefaultWorkNumberRow,
					  #extSelCavityworkNumberRow,
					  #extSelCavityisManualNameRow,
					  #extSelCavityworkTimeTypeRow,
					  #extSelCavityworkLevelRow,
					  #extSelCavityworkTypeRow,
					  #extSellacquerTimeTypeRow,
					  #extSellocationRow,
					  #extSelisExtensionPosRow,
					  #extSelisManualNameRow,
					  #extSelusedPartRow,
					  #extSelnewForOldRow,
					  #extSelworkExternalRow,
					  #extSelworkNumberRow,
					  #extSelworkLevelRow,
					  #extSelextensionTimeRow,
					  #extSelworkTypeRow,
					  #extSelworkTimeTypeRow,
					  #extSelpartialLacqueringRow,
					  #extSellacquerFinishRow`
                        ).css("display", "flex");
                      });
                    }

                    setTimeout(() => {
                      // add onClick event for RC codes price / OEM number placeholder

                      let price = "";
                      try {
                        price = IF.find("#extSeldefaultPrice")
                          .html()
                          .replace("&nbsp;", "");
                        IF.find("#extSelprice").attr("placeholder");

                        IF.find("#extSelpartNumber").attr(
                          "placeholder",
                          IF.find("#extSeldefaultPartNumber").html()
                        );
                        IF.find("#extSelprice").attr("placeholder", price);
                      } catch (error) {}

                      IF.find('[id^="graPa"][id$="E"]').click(function () {
                        try {
                          IF.find("#extSelpartNumber").attr(
                            "placeholder",
                            IF.find("#extSeldefaultPartNumber").html()
                          );
                          IF.find("#extSelprice").attr(
                            "placeholder",
                            IF.find("#extSeldefaultPrice")
                              .html()
                              .replace("&nbsp;", "")
                          );
                        } catch (error) {}

                        IF.find("#btnExtSelOKOri").focus();
                      });

                      // IF.find(".graPaExtSelRc").click(function () {
                      //   IF.find("#btnExtSelOKOri").focus();
                      // });
                    }, 250);
                  }
                }
              });
            };

            // Watch the iframe for changes
            let observer = new MutationObserver(callback);

            IFBODY.each(function () {
              observer.observe(this, { childList: true, subtree: true });
            });
          }, 750);
        }
      }, 250);
    });
  }, 750);

  function styleConstruct(url) {
    var cssLink = document.createElement("link");
    cssLink.href = url;
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    return cssLink;
  }
});
