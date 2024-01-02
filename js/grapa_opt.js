var winCalc;
$("a[href*=tab-graphicalPartSelection]").click(function () {
  console.log("Uživatel kliknul na založku GRAFIKA!");
  setTimeout(function () {
    console.log("Spouštím interval na hledání iFramu");
    var intervalGrapa = setInterval(function () {
      console.log(
        "Hledám iframe " +
          $("#graphicalPartSelection > iframe")
            .contents()
            .find("#graPaTitleAddPosBtn").length
      );

      if (
        $("#graphicalPartSelection > iframe")
          .contents()
          .find("#graPaTitleAddPosBtn").length
      ) {
        console.log(
          "Našel jsem objekt #graPaTitleAddPosBtn a nahrávám JS a CSS do iframe"
        );
        clearInterval(intervalGrapa);

        setTimeout(function () {
          const IF = $("#graphicalPartSelection > iframe").contents();

          IF.find("head").append(
            styleConstruct(
              "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            )
          );
          IF.find("head").append(
            styleConstruct(
              "https://myclaim.cz/UNIQA_CZ/gold/css/grapa_new_look.css"
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

                // RC dialog  has been opened
                if (
                  mutation.addedNodes[0].classList.contains(
                    "grapaMobileDialog"
                  ) &&
                  IF.find("#graPaExtSelRcPopup").length > 0
                ) {
                  // add eye button for display hidden inputs
                  console.log("RC Dialog has been opened");
                  if (
                    IF.find(".grapaMobileDialog .showHiddenInputs").length == 0
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

                      IF.find("button.graPaExtSelRc").click(function () {
                        console.log("Kliknul si na button RC kódu na Levo");
                      });
                      $("#graphicalPartSelection > iframe")
                        .contents()
                        .find("button.graPaExtSelRc")
                        .html();
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

                    IF.find(".graPaExtSelRc").click(function () {
                      setTimeout(() => {
                        //$('.custom-logo').click();
                        IF.find(".showHiddenInputs").focus();
                      }, 5);

                      console.log("Fokus na oko");
                    });
                  }, 250);
                }

                // Add additional position dialog has been opened
                if (
                  mutation.addedNodes[0].classList.contains(
                    ".graPaPosAddDialog"
                  )
                ) {
                  // add eye button for display hidden inputs
                  console.log("Dialog graPaPosAddDialog has been opened");
                }

                // Repair position scope has been opened
                if (
                  mutation.addedNodes[0].classList.contains(
                    "#graPaDamageScope"
                  ) &&
                  IF.find("#graPaDSSearch").length > 0
                ) {
                  // add eye button for display hidden inputs
                  console.log("Repair position scope has been opened");
                }
              }
            });
          };

          // Watch the iframe for changes
          let observer = new MutationObserver(callback);

          IFBODY.each(function () {
            observer.observe(this, { childList: true, subtree: true });
          });

          // Pinch zoom in / out
          var lastScrollTop = null;
          var elSvg = IF.find("#graPaMainSvg")[0];

          // SVGheight max = 1200

          // Override with touchmove, which is triggered only on move
          elSvg.addEventListener("touchstart", function (event) {
            let elSvg = IF.find("#graPaMainSvg > svg:first-child")[0];
            elSvg.style.shapeRendering = "optimizeSpeed";
          });
          // Override with touchmove, which is triggered only on move
          elSvg.addEventListener("touchmove", function (event) {
            let el = IF.find("#graPaMainSvg")[0];
            let elSvg = IF.find("#graPaMainSvg > svg:first-child")[0];
            let elSnap = IF.find("#graPaMainSvg #graPaSvgSnapshot")[0];
            lastScrollTop = el.scrollTop;

            console.log("elSnap.width: " + roundSize(elSnap.style.width));
            console.log("elSnap.height: " + roundSize(elSnap.style.height));
            // elSvg.style.shapeRendering = "cripsEdges";

            elSvg.style.width = roundSize(elSnap.style.width);
            elSvg.style.height = roundSize(elSnap.style.height);
          });

          // Override with touchmove, which is triggered only on move
          elSvg.addEventListener("touchend", function (event) {
            let el = IF.find("#graPaMainSvg")[0];
            let elSvg = IF.find("#graPaMainSvg > svg:first-child")[0];
            setTimeout(function () {
              el.scrollTop = lastScrollTop;
              elSvg.style.shapeRendering = "auto";
            }, 5);
          });

          // close images view
          IF.find("#graPaImgClose").click();

          // Show calculation
          showCalculation();
        }, 1000);
      }
    }, 600);
  }, 2000);
});

// helpers
function styleConstruct(url) {
  var cssLink = document.createElement("link");
  cssLink.href = url;
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";
  return cssLink;
}

function roundSize(size) {
  size = size.replace("px", "");
  size = Math.round(size);
  return size + "px";
}

function showCalculation() {
  let IF = $("#graphicalPartSelection > iframe").contents();
  let calcBtn =
    '<button id="showPdfCalculation" class="btnFlat32"><svg pointer-events="none" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 64 64" id="svg3272" sodipodi:version="0.32" inkscape:version="0.91 r13725" sodipodi:docname="btnGrapaManualListBlack.svg" inkscape:output_extension="org.inkscape.output.svg.inkscape" inkscape:export-filename="C:SphinxWorkspacemasterCommonSphinxWebContentglobalimgsquaretnGrapaGroup.png" inkscape:export-xdpi="45" inkscape:export-ydpi="45" version="1.1" width="100%" height="100%"> <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="5.9609375" inkscape:cx="-47.643512" inkscape:cy="35.846307" inkscape:current-layer="layer3" showgrid="true" inkscape:document-units="px" inkscape:grid-bbox="true" inkscape:window-width="1920" inkscape:window-height="1018" inkscape:window-x="1272" inkscape:window-y="-8" inkscape:window-maximized="1"></sodipodi:namedview> <defs id="defs3274"> <marker inkscape:stockid="Arrow1Lstart" orient="auto" refY="0.0" refX="0.0" id="Arrow1Lstart" style="overflow:visible"> <path id="path92159" d="M 0.0,0.0 L 5.0,-5.0 L -12.5,0.0 L 5.0,5.0 L 0.0,0.0 z " style="fill-rule:evenodd;stroke-width:1.0pt;marker-start:none" transform="scale(0.8) translate(12.5,0)"></path> </marker> <linearGradient inkscape:collect="always" id="linearGradient3266"> <stop style="stop-color:#5952ac;stop-opacity:1;" offset="0" id="stop3268"></stop> <stop style="stop-color:#5952ac;stop-opacity:0;" offset="1" id="stop3270"></stop> </linearGradient> <inkscape:perspective id="perspective2427" inkscape:persp3d-origin="32 : 21.333333 : 1" inkscape:vp_z="64 : 32 : 1" inkscape:vp_y="0 : 1000 : 0" inkscape:vp_x="0 : 32 : 1" sodipodi:type="inkscape:persp3d"></inkscape:perspective> <linearGradient id="linearGradient3210"> <stop id="stop3212" offset="0" style="stop-color:#909090;stop-opacity:1;"></stop> <stop id="stop3214" offset="1" style="stop-color:#404040;stop-opacity:1;"></stop> </linearGradient> <linearGradient id="linearGradient3200" inkscape:collect="always"> <stop id="stop3202" offset="0" style="stop-color:#ffffff;stop-opacity:1;"></stop> <stop id="stop3204" offset="1" style="stop-color:#ffffff;stop-opacity:0;"></stop> </linearGradient> <linearGradient id="linearGradient3170"> <stop id="stop3172" offset="0" style="stop-color:#ffffff;stop-opacity:0.23529412;"></stop> <stop id="stop3174" offset="1" style="stop-color:#ffffff;stop-opacity:0.01357466"></stop> </linearGradient> <linearGradient y2="246" x2="390" y1="6" x1="390" gradientTransform="translate(-305.59091,-57.247727)" gradientUnits="userSpaceOnUse" id="linearGradient3320" xlink:href="#linearGradient3210" inkscape:collect="always"></linearGradient> <linearGradient y2="1" x2="365" y1="156" x1="365" gradientTransform="translate(-305.59091,-57.247727)" gradientUnits="userSpaceOnUse" id="linearGradient3322" xlink:href="#linearGradient3170" inkscape:collect="always"></linearGradient> <linearGradient y2="91" x2="385" y1="6" x1="385" gradientTransform="translate(-305.59091,-57.247727)" gradientUnits="userSpaceOnUse" id="linearGradient3324" xlink:href="#linearGradient3200" inkscape:collect="always"></linearGradient> <linearGradient gradientUnits="userSpaceOnUse" y2="72.715858" x2="129.70897" y1="72.715858" x1="-8.8173733" id="linearGradient3211" xlink:href="#linearGradient3200" inkscape:collect="always"></linearGradient> <linearGradient id="linearGradient1944" xlink:href="#linearGradient841"></linearGradient> <radialGradient cx="0.50000000" cy="0.89285713" fx="0.54117650" fy="3.5200000" id="radialGradient856" r="0.54606670" xlink:href="#linearGradient841"></radialGradient> <linearGradient id="linearGradient1556" x1="0.31111112" x2="0.62222224" xlink:href="#linearGradient1507" y1="-0.56250000" y2="0.79687500"></linearGradient> <linearGradient id="linearGradient1506" x1="0.052173913" x2="0.78260869" xlink:href="#linearGradient1507" y1="0.97656250" y2="0.0078125000"></linearGradient> <linearGradient id="linearGradient1499" x1="0.85826772" x2="0.062992126" xlink:href="#linearGradient1501" y1="0.14062500" y2="0.54687500"></linearGradient> <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="scale(0.9552926,1.0467997)" id="linearGradient1497" x1="741.63899" x2="622.33327" xlink:href="#linearGradient1492" y1="169.44361" y2="287.73826"></linearGradient> <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="scale(0.955425,1.0466546)" id="linearGradient1495" x1="728.96644" x2="351.7063" xlink:href="#linearGradient1492" y1="230.07422" y2="689.86002"></linearGradient> <linearGradient id="linearGradient1492"> <stop id="stop1493" offset="0.0000000" style="stop-color:#dadada;stop-opacity:1.0000000;"></stop> <stop id="stop1496" offset="0.34923077" style="stop-color:#f1f1f1;stop-opacity:1.0000000;"></stop> <stop id="stop1494" offset="1.0000000" style="stop-color:#f0f0f0;stop-opacity:1.0000000;"></stop> </linearGradient> <linearGradient id="linearGradient1501"> <stop id="stop1502" offset="0.0000000" style="stop-color:#ffffff;stop-opacity:1.0000000;"></stop> <stop id="stop1504" offset="1.0000000" style="stop-color:#ffffff;stop-opacity:0.0000000;"></stop> </linearGradient> <linearGradient id="linearGradient1507"> <stop id="stop1508" offset="0.0000000" style="stop-color:#767676;stop-opacity:0.095505618;"></stop> <stop id="stop1510" offset="1.0000000" style="stop-color:#767676;stop-opacity:0.0000000;"></stop> </linearGradient> <radialGradient cx="0.50000000" cy="0.50000000" fx="0.50704223" fy="0.29885057" id="radialGradient861" r="0.50000000" xlink:href="#linearGradient853"></radialGradient> <linearGradient id="linearGradient853"> <stop id="stop854" offset="0.00000000" style="stop-color:#767676;stop-opacity:0.29752067;"></stop> <stop id="stop855" offset="1.0000000" style="stop-color:#767676;stop-opacity:0.00000000;"></stop> </linearGradient> <linearGradient id="linearGradient859" x1="1.4647887" x2="0.26408452" xlink:href="#linearGradient853" y1="-1.1486486" y2="1.2905406"></linearGradient> <linearGradient id="linearGradient850" xlink:href="#linearGradient846"></linearGradient> <linearGradient id="linearGradient846"> <stop id="stop847" offset="0.00000000" style="stop-color:#e7e7e7;stop-opacity:1.0000000;"></stop> <stop id="stop848" offset="1.0000000" style="stop-color:#a5a5a5;stop-opacity:1.0000000;"></stop> </linearGradient> <linearGradient id="linearGradient858" x1="0.64285713" x2="0.57142860" xlink:href="#linearGradient846" y1="1.2647059" y2="0.049019609"></linearGradient> <linearGradient id="linearGradient851" x1="0.39788732" x2="0.80985916" xlink:href="#linearGradient846" y1="0.32222223" y2="0.35555556"></linearGradient> <linearGradient id="linearGradient860" x1="0.47535211" x2="0.50000000" xlink:href="#linearGradient1290" y1="0.81081080" y2="-0.74324322"></linearGradient> <linearGradient id="linearGradient1290"> <stop id="stop1291" offset="0.0000000" style="stop-color:#a0a0a0;stop-opacity:1.0000000;"></stop> <stop id="stop1292" offset="1.0000000" style="stop-color:#595959;stop-opacity:1.0000000;"></stop> </linearGradient> <linearGradient id="linearGradient841"> <stop id="stop842" offset="0.00000000" style="stop-color:#ffffff;stop-opacity:1.0000000;"></stop> <stop id="stop843" offset="1.0000000" style="stop-color:#ffffff;stop-opacity:0.00000000;"></stop> </linearGradient> <radialGradient cx="0.50000000" cy="0.50000000" fx="0.50000000" fy="0.14942528" id="radialGradient864" r="0.50000000" xlink:href="#linearGradient853"></radialGradient> <linearGradient id="linearGradient849" x1="0.010563380" x2="1.2288733" xlink:href="#linearGradient846" y1="0.43229166" y2="0.46354166"></linearGradient> <linearGradient id="linearGradient840" x1="-0.22348484" x2="0.59469700" xlink:href="#linearGradient853" y1="0.38235295" y2="0.46568626"></linearGradient> <linearGradient id="linearGradient845" x1="1.3833333" x2="0.10833333" xlink:href="#linearGradient841" y1="0.49019608" y2="0.50490195"></linearGradient> <linearGradient id="linearGradient844" xlink:href="#linearGradient841"></linearGradient> <linearGradient id="linearGradient852" x1="0.56179774" x2="0.63483149" xlink:href="#linearGradient841" y1="-1.0294118" y2="0.50735295"></linearGradient> <inkscape:perspective sodipodi:type="inkscape:persp3d" inkscape:vp_x="0 : 80 : 1" inkscape:vp_y="0 : 1000 : 0" inkscape:vp_z="160 : 80 : 1" inkscape:persp3d-origin="80 : 53.333333 : 1" id="perspective67"></inkscape:perspective> <linearGradient id="linearGradient3210-349"> <stop id="stop4584" offset="0" style="stop-color:#6194ff;stop-opacity:1;"></stop> <stop id="stop4586" offset="1" style="stop-color:#002c86;stop-opacity:1;"></stop> </linearGradient> <linearGradient id="linearGradient3170-41"> <stop id="stop4590" offset="0" style="stop-color:#ffffff;stop-opacity:0.23529412;"></stop> <stop id="stop4592" offset="1" style="stop-color:#ffffff;stop-opacity:0.01357466"></stop> </linearGradient> <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="scale(0.955425,1.0466546)" id="linearGradient1495-285" x1="728.96644" x2="351.7063" xlink:href="#linearGradient1492-546" y1="230.07422" y2="689.86002"></linearGradient> <linearGradient id="linearGradient1492-546"> <stop id="stop4602" offset="0.0000000" style="stop-color:#dadada;stop-opacity:1.0000000;"></stop> <stop id="stop4604" offset="0.34923077" style="stop-color:#f1f1f1;stop-opacity:1.0000000;"></stop> <stop id="stop4606" offset="1.0000000" style="stop-color:#f0f0f0;stop-opacity:1.0000000;"></stop> </linearGradient> <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="scale(0.9552926,1.0467997)" id="linearGradient1497-232" x1="741.63899" x2="622.33327" xlink:href="#linearGradient1492-922" y1="169.44361" y2="287.73826"></linearGradient> <linearGradient id="linearGradient1492-922"> <stop id="stop4610" offset="0.0000000" style="stop-color:#dadada;stop-opacity:1.0000000;"></stop> <stop id="stop4612" offset="0.34923077" style="stop-color:#f1f1f1;stop-opacity:1.0000000;"></stop> <stop id="stop4614" offset="1.0000000" style="stop-color:#f0f0f0;stop-opacity:1.0000000;"></stop> </linearGradient> <linearGradient inkscape:collect="always" xlink:href="#linearGradient3266" id="linearGradient3272" x1="43.199091" y1="70.727272" x2="90.619087" y2="70.727272" gradientUnits="userSpaceOnUse"></linearGradient> <linearGradient id="linearGradient7132"> <stop id="stop7134" offset="0" style="stop-color:#ffffff;stop-opacity:1;"></stop> <stop id="stop7136" offset="1" style="stop-color:#ffffff;stop-opacity:0;"></stop> </linearGradient> <linearGradient inkscape:collect="always" xlink:href="#linearGradient7571" id="linearGradient7591" gradientUnits="userSpaceOnUse" x1="27.790375" y1="14.01647" x2="57.326038" y2="14.01647"></linearGradient> <linearGradient inkscape:collect="always" id="linearGradient7571"> <stop style="stop-color:#ffffff;stop-opacity:1;" offset="0" id="stop7573"></stop> <stop style="stop-color:#ffffff;stop-opacity:0;" offset="1" id="stop7575"></stop> </linearGradient> <linearGradient id="linearGradient15218"> <stop style="stop-color:#f8f8f7;stop-opacity:1;" offset="0" id="stop15220"></stop> <stop id="stop2269" offset="0.59928656" style="stop-color:#e8e8e8;stop-opacity:1;"></stop> <stop style="stop-color:#e2e2de;stop-opacity:1;" offset="1" id="stop15222"></stop> </linearGradient> <linearGradient id="linearGradient5048"> <stop style="stop-color:black;stop-opacity:0;" offset="0" id="stop5050"></stop> <stop id="stop5056" offset="0.5" style="stop-color:black;stop-opacity:1;"></stop> <stop style="stop-color:black;stop-opacity:0;" offset="1" id="stop5052"></stop> </linearGradient> </defs> <metadata id="metadata3277"> <rdf:rdf> <cc:work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> </cc:work> </rdf:rdf> </metadata> <g inkscape:groupmode="layer" inkscape:label="Layer 1" id="layer1" style="display:inline"> <g inkscape:groupmode="layer" id="layer3" inkscape:label="Layer 3" style="display:inline"> <rect style="opacity:1;fill:none;fill-opacity:1;fill-rule:evenodd;stroke-width:1.0802021;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" id="rect4238" width="42.124424" height="48.612453" x="10.937788" y="7.6937733" rx="0.61194313" ry="0.61194354"></rect> <rect style="color:#767676;display:inline;overflow:visible;visibility:visible;opacity:1;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;marker:none;marker-start:none;marker-mid:none;marker-end:none" id="rect4248" width="32.406071" height="2.1604047" x="-48.203037" y="16.878843" transform="scale(-1,1)"></rect> <rect y="23.360058" x="-48.203037" height="2.1604047" width="32.406071" id="rect4250" style="color:#767676;display:inline;overflow:visible;visibility:visible;opacity:1;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;marker:none;marker-start:none;marker-mid:none;marker-end:none" transform="scale(-1,1)"></rect> <rect style="color:#767676;display:inline;overflow:visible;visibility:visible;opacity:1;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;marker:none;marker-start:none;marker-mid:none;marker-end:none" id="rect4252" width="32.406071" height="2.1604047" x="-48.203037" y="29.841272" transform="scale(-1,1)"></rect> <rect y="36.322487" x="-48.203037" height="2.1604047" width="32.406071" id="rect4254" style="color:#767676;display:inline;overflow:visible;visibility:visible;opacity:1;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;marker:none;marker-start:none;marker-mid:none;marker-end:none" transform="scale(-1,1)"></rect> <rect style="color:#767676;display:inline;overflow:visible;visibility:visible;opacity:1;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;marker:none;marker-start:none;marker-mid:none;marker-end:none" id="rect4256" width="32.406071" height="2.1604047" x="-48.203037" y="42.803699" transform="scale(-1,1)"></rect> </g> <g inkscape:groupmode="layer" id="layer2" inkscape:label="Layer 2" style="display:inline"></g> </g></svg></button>';
  IF.find('#graPaTitleZoomScreen').before(calcBtn);
  
  setTimeout(function(){
    
    // IF.find("#showPdfCalculation").on("click", (event) => {
    //   IF.find("#btnGrapaTitleMainMenu").click();
    //   IF.find("#btnGrapaMainMenu").click();
    //   console.log("Spustim interval");

    //   var printInterval = setInterval(function () {
    //     if (IF.find("#graPaMainMenuPrint").length == 1) {
    //       clearInterval(printInterval);

    //       setTimeout(function () {
    //         console.log("Spustim interval 2");
    //         IF.find("#graPaMainMenuPrint").click();

    //         var checkInterval = setInterval(function () {
    //           if (IF.find("#CalculationInvoiceCommonReportPPBtn").length == 1) {
    //             console.log("CalculationInvoiceCommonReportPPBtn click");
    //             clearInterval(checkInterval);
    //             IF.find("#CalculationInvoiceCommonReportPPBtn").click();

    //             setTimeout(function () {
    //               IF.find("#printOK").click();
    //             }, 100);
    //           }
    //         }, 100);
    //       }, 100);
    //     }
    //   }, 100);
    // });

    IF.find("#showPdfCalculation").on("click", (event) => {

      let page = "https://" + window.location.hostname + "/myClaim/vehicleRepair/calculationResultPage.tmpl";
      
      winCalc = window.open(page , 'Výsledek kalkulace', 'fullscreen=1');
     
      var intervalCalcResult = setInterval(function () {
        if( $(winCalc.document).find('#footer').length == 1){
          clearInterval(intervalCalcResult);
          console.log($(winCalc.document).find('#footer'));
          $(winCalc.document).find('#footer').hide();
        }
        

      }, 500);
      


    })
  }, 100);
}
